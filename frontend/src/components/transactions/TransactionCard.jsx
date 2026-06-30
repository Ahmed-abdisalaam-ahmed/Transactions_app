import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Calendar, Edit2, Loader2, MoreVertical, Trash, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api/apiClient';
import { toast } from 'sonner';

const TransactionCard = ({ transaction, onEdit }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const queryClient = useQueryClient();

    const formatDate = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };

    const isIncome = transaction?.type === 'income';
    const icon = isIncome ? <ArrowUpCircle className='h-5 w-5 text-green-600' /> : <ArrowDownCircle className='h-5 w-5 text-red-600' />;

    const deleteMutation = useMutation({
        mutationFn: async () => {
            const response = await api.delete(`/transactions/delete/${transaction._id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['transactions']);
            toast.success('Transaction deleted successfully');
            setShowDeleteDialog(false);
        },
        onError: (error) => {
            toast.error('Failed to delete transaction: ' + error.message);
        }
    });

    const handleDeleteConfirm = async () => {
        try {
            await deleteMutation.mutateAsync();
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };

    return (
        <>
            <Card className="w-full transition-shadow hover:shadow-md">
                <CardHeader className="pb-3">
                    <div className='flex items-start justify-between'>
                        <div className='flex items-center gap-3 flex-1'>
                            {icon}
                            <div>
                                <CardTitle className='text-lg'>{transaction?.title}</CardTitle>
                                <p className='text-sm text-muted-foreground'>{transaction?.category}</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-2'>
                            <Badge variant={isIncome ? 'default' : 'destructive'} className={isIncome ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                {isIncome ? '+' : '-'}${transaction?.amount}
                            </Badge>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreVertical className='h-4 w-4' />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end'>
                                    <DropdownMenuItem onClick={() => onEdit(transaction)}>
                                        <Edit2 className='mr-2 h-4 w-4' />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-red-600">
                                        <Trash className='mr-2 h-4 w-4' />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-3">
                    {transaction?.description && (
                        <p className='text-sm text-muted-foreground'>{transaction.description}</p>
                    )}

                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <Calendar className='h-4 w-4' />
                        <span>{formatDate(transaction?.date)}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t text-muted-foreground">
                        <span>Type: {transaction?.type}</span>
                        <span>Created: {formatDate(transaction?.createdAt)}</span>
                    </div>
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the transaction "{transaction?.title}".
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            className="bg-red-600 text-white hover:bg-red-700"
                        >
                            {deleteMutation.isPending ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Deleting...
                                </span>
                            ) : (
                                'Delete'
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default TransactionCard;