import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import api from '@/lib/api/apiClient'
import { toast } from 'sonner'
import useAuthStore from '@/lib/store/authStore'

const TRANSACTION_TYPES = [
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' }
];

const CATEGORIES = {
    income: ['Salary', 'Freelance', 'Investment', 'Bonus', 'Other'],
    expense: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping', 'Health', 'Education', 'Other']
};

const TransactionForm = ({ transaction, open = true, onOpenChange }) => {
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        amount: '',
        type: 'expense',
        category: '',
        date: ''
    });
    
    const [validationError, setValidationError] = useState(null);
    const queryClient = useQueryClient();
    const { token } = useAuthStore();

    useEffect(() => {
        if (transaction) {
            setFormValues({
                title: transaction.title || "",
                description: transaction.description || "",
                amount: transaction.amount || "",
                type: transaction.type || "expense",
                category: transaction.category || "",
                date: transaction.date ? new Date(transaction.date).toISOString().split('T')[0] : ""
            });
        } else {
            setFormValues({
                title: '',
                description: '',
                amount: '',
                type: 'expense',
                category: '',
                date: ''
            });
        }
        setValidationError(null);
    }, [transaction, open]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleTypeChange = (value) => {
        setFormValues({
            ...formValues,
            type: value,
            category: '' // Reset category when type changes
        });
    };

    const handleCategoryChange = (value) => {
        setFormValues({
            ...formValues,
            category: value
        });
    };

    const handleCancel = () => {
        onOpenChange?.(false);
    };

    // Create transaction mutation
    const createTransactionMutation = useMutation({
        mutationFn: async (transactionData) => {
            const response = await api.post('/transactions/create', transactionData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        },
        onSuccess: () => {
            toast.success('Transaction created successfully');
            queryClient.invalidateQueries(['transactions']);
            onOpenChange?.(false);
            setFormValues({
                title: '',
                description: '',
                amount: '',
                type: 'expense',
                category: '',
                date: ''
            });
        },
        onError: (error) => {
            const message = error.response?.data?.message || error.message;
            toast.error(`Error: ${message}`);
            setValidationError(message);
        }
    });

    // Update transaction mutation
    const updateTransactionMutation = useMutation({
        mutationFn: async (transactionData) => {
            const response = await api.put(`/transactions/update/${transaction._id}`, transactionData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        },
        onSuccess: () => {
            toast.success('Transaction updated successfully');
            queryClient.invalidateQueries(['transactions']);
            onOpenChange?.(false);
            setFormValues({
                title: '',
                description: '',
                amount: '',
                type: 'expense',
                category: '',
                date: ''
            });
        },
        onError: (error) => {
            const message = error.response?.data?.message || error.message;
            toast.error(`Error: ${message}`);
            setValidationError(message);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formValues.title.trim()) {
            setValidationError('Title is required');
            return;
        }

        if (!formValues.amount || parseFloat(formValues.amount) <= 0) {
            setValidationError('Amount must be greater than 0');
            return;
        }

        if (!formValues.category) {
            setValidationError('Category is required');
            return;
        }

        const transactionData = {
            title: formValues.title.trim(),
            description: formValues.description.trim(),
            amount: parseFloat(formValues.amount),
            type: formValues.type,
            category: formValues.category,
            date: formValues.date ? new Date(formValues.date).toISOString() : new Date().toISOString()
        };

        if (transaction) {
            updateTransactionMutation.mutate(transactionData);
        } else {
            createTransactionMutation.mutate(transactionData);
        }
    };

    const isLoading = createTransactionMutation.isPending || updateTransactionMutation.isPending;
    const categories = CATEGORIES[formValues.type] || [];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        {transaction ? 'Update Transaction' : 'Add Transaction'}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        {transaction ? 'Update the transaction details below.' : 'Fill in the details to add a new transaction.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {validationError && (
                        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                            {validationError}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            name="title"
                            type="text"
                            value={formValues.title}
                            onChange={handleInputChange}
                            placeholder="e.g., Monthly Salary"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount *</Label>
                        <Input
                            id="amount"
                            name="amount"
                            type="number"
                            step="0.01"
                            value={formValues.amount}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="type">Type *</Label>
                            <Select value={formValues.type} onValueChange={handleTypeChange}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {TRANSACTION_TYPES.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <Select value={formValues.category} onValueChange={handleCategoryChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat} value={cat}>
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            name="date"
                            type="date"
                            value={formValues.date}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formValues.description}
                            onChange={handleInputChange}
                            placeholder="Add notes (optional)"
                            rows={3}
                        />
                    </div>

                    <DialogFooter className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader className="h-4 w-4 animate-spin" />
                                    {transaction ? 'Updating...' : 'Adding...'}
                                </span>
                            ) : (
                                transaction ? 'Update Transaction' : 'Add Transaction'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default TransactionForm;