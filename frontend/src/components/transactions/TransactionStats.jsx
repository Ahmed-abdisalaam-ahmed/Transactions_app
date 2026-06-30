import { ListFilter } from 'lucide-react'

const TransactionStats = ({ total, incomeCount, expenseCount }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      <div className="bg-card p-4 rounded-lg shadow-sm border">
        <p className='text-sm text-muted-foreground'>Total Transactions</p>
        <p className='text-2xl font-bold'>{total}</p>
      </div>
      <div className="bg-card p-4 rounded-lg border shadow-sm border-l-4 border-l-green-500">
        <p className="text-sm text-muted-foreground">Income</p>
        <p className="text-2xl font-bold text-green-600">{incomeCount}</p>
      </div>
      <div className="bg-card p-4 rounded-lg border shadow-sm border-l-4 border-l-red-500">
        <p className="text-sm text-muted-foreground">Expenses</p>
        <p className="text-2xl font-bold text-red-600">{expenseCount}</p>
      </div>
    </div>
  );
};

export default TransactionStats;