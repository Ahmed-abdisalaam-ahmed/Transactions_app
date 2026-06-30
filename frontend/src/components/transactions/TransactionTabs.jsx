import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TransactionGrid from '@/components/transactions/TransactionGrid';

const TransactionTabs = ({ 
  categorized, 
  total, 
  incomeCount, 
  expenseCount, 
  onEdit, 
  onDelete 
}) => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">All ({total})</TabsTrigger>
        <TabsTrigger value="income">Income ({incomeCount})</TabsTrigger>
        <TabsTrigger value="expense">Expenses ({expenseCount})</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <TransactionGrid 
          list={categorized.all} 
          emptyMessage="No transactions recorded." 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TabsContent>
      <TabsContent value="income">
        <TransactionGrid
          list={categorized.income} 
          emptyMessage="No income found." 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TabsContent>
      <TabsContent value="expense">
        <TransactionGrid 
          list={categorized.expense} 
          emptyMessage="No expenses found." 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TransactionTabs;