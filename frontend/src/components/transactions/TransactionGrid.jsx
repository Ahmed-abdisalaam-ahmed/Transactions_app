import { ListFilter } from 'lucide-react'
import TransactionCard from '@/components/transactions/TransactionCard';

const TransactionGrid = ({ list, emptyMessage, onEdit, onDelete }) => {
  if (list.length === 0) {
    return (
      <div className="text-center py-12">
        <ListFilter className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-sm font-medium">No transactions found</h3>
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {list.map(t => (
        <TransactionCard 
          key={t._id} 
          transaction={t} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default TransactionGrid;