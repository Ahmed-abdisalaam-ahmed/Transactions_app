import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import TransactionStats from './TransactionStats';
import TransactionSearch from './TransactionSearch';
import TransactionTabs from './TransactionTabs';

const TransactionList = () => {
  const { transactions = [] } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter logic
  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (t.description && t.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  // Stats calculation
  const income = transactions.filter(t => t.type === 'income');
  const expenses = transactions.filter(t => t.type === 'expense');

  const categorized = {
    all: filteredTransactions,
    income: filteredTransactions.filter(t => t.type === 'income'),
    expense: filteredTransactions.filter(t => t.type === 'expense')
  };

  return (
    <div className='space-y-6'>
      <TransactionStats 
        total={transactions.length}
        incomeCount={income.length}
        expenseCount={expenses.length}
      />

      <TransactionSearch 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <TransactionTabs 
        categorized={categorized}
        total={transactions.length}
        incomeCount={income.length}
        expenseCount={expenses.length}
      />
    </div>
  );
};

export default TransactionList;