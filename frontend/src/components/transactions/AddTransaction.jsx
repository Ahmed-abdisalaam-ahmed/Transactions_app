import { Button } from '@/components/ui/button'
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader, ArrowLeft } from 'lucide-react'
import api from '@/lib/api/apiClient'
import { toast } from 'sonner'
import useAuthStore from '@/lib/store/authStore'
import { useNavigate, useLocation } from 'react-router-dom'

const TRANSACTION_TYPES = [
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' }
];

const CATEGORIES = {
    income: ['Salary', 'Freelance', 'Investment', 'Bonus', 'Other'],
    expense: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping', 'Health', 'Education', 'Other']
};

const CreateTransaction = () => {
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        amount: '',
        type: 'expense',
        category: '',
        date: new Date().toISOString().split('T')[0]
    });
    
    const [validationError, setValidationError] = useState(null);
    const queryClient = useQueryClient();
    const { token } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const editingTransaction = location.state?.transaction;

    useEffect(() => {
        if (editingTransaction) {
            setFormValues({
                title: editingTransaction.title || "",
                description: editingTransaction.description || "",
                amount: editingTransaction.amount || "",
                type: editingTransaction.type || "expense",
                category: editingTransaction.category || "",
                date: editingTransaction.date ? new Date(editingTransaction.date).toISOString().split('T')[0] : ""
            });
        }
        setValidationError(null);
    }, [editingTransaction]);

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
            category: ''
        });
    };

    const handleCategoryChange = (value) => {
        setFormValues({
            ...formValues,
            category: value
        });
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
            navigate('/dashboard/transactionList');
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
            const response = await api.put(`/transactions/update/${editingTransaction._id}`, transactionData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        },
        onSuccess: () => {
            toast.success('Transaction updated successfully');
            queryClient.invalidateQueries(['transactions']);
            navigate('/dashboard/transactionList');
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

        if (editingTransaction) {
            updateTransactionMutation.mutate(transactionData);
        } else {
            createTransactionMutation.mutate(transactionData);
        }
    };

    const isLoading = createTransactionMutation.isPending || updateTransactionMutation.isPending;
    const categories = CATEGORIES[formValues.type] || [];

    return (
        <div className='max-w-2xl items-center'>
            {/* Header */}
            <div className='mb-6 flex items-center gap-4'>
                <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => navigate('/dashboard/transactionList')}
                >
                    <ArrowLeft className='h-4 w-4' />
                </Button>
                <div>
                    <h1 className='text-2xl font-bold'>
                        {editingTransaction ? 'Update Transaction' : 'Create Transaction'}
                    </h1>
                    <p className='text-sm text-muted-foreground'>
                        {editingTransaction ? 'Update the transaction details below.' : 'Fill in the details to add a new transaction.'}
                    </p>
                </div>
            </div>

            {/* Form Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Transaction Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {validationError && (
                            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                                {validationError}
                            </div>
                        )}

                        {/* Title */}
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

                        {/* Amount */}
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

                        {/* Type and Category */}
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

                        {/* Date */}
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

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formValues.description}
                                onChange={handleInputChange}
                                placeholder="Add notes (optional)"
                                rows={4}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 justify-end pt-4 border-t">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => navigate('/dashboard/transactionList')}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader className="h-4 w-4 animate-spin" />
                                        {editingTransaction ? 'Updating...' : 'Creating...'}
                                    </span>
                                ) : (
                                    editingTransaction ? 'Update Transaction' : 'Create Transaction'
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateTransaction;