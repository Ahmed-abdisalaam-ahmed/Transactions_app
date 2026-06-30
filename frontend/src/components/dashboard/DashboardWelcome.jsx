import React, { useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const DashboardWelcome = () => {
  const navigate = useNavigate()
  const { transactions = [] } = useOutletContext() || {}

  // Calculate stats
  const stats = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income')
    const expenses = transactions.filter(t => t.type === 'expense')

    const totalIncome = income.reduce((sum, t) => sum + (t.amount || 0), 0)
    const totalExpense = expenses.reduce((sum, t) => sum + (t.amount || 0), 0)

    return {
      totalIncome: totalIncome.toFixed(2),
      totalExpense: totalExpense.toFixed(2),
      balance: (totalIncome - totalExpense).toFixed(2),
      incomeCount: income.length,
      expenseCount: expenses.length
    }
  }, [transactions])

  // Data for pie chart
  const pieData = [
    { name: 'Income', value: parseFloat(stats.totalIncome) },
    { name: 'Expense', value: parseFloat(stats.totalExpense) }
  ]

  // Data for category breakdown
  const categoryData = useMemo(() => {
    const categories = {}
    transactions.forEach(t => {
      if (!categories[t.category]) {
        categories[t.category] = 0
      }
      categories[t.category] += t.amount || 0
    })
    return Object.entries(categories).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2))
    }))
  }, [transactions])

  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']

  return (
    <div className='space-y-6 '>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold'>Dashboard</h1>
          <p className='text-sm text-muted-foreground'>Welcome back! Here's your financial overview</p>
        </div>
        <Button 
          onClick={() => navigate('/dashboard/createTransaction')}
          className='gap-2 w-full sm:w-auto'
        >
          <Plus className='h-4 w-4' />
          Add Transaction
        </Button>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {/* Total Balance */}
        <Card>
          <CardHeader className='pb-2'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>Total Balance</CardTitle>
              <Wallet className='h-4 w-4 text-muted-foreground' />
            </div>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>${stats.balance}</p>
            <p className='text-xs text-muted-foreground mt-1'>Income minus expenses</p>
          </CardContent>
        </Card>

        {/* Total Income */}
        <Card className='border-l-4 border-l-green-500'>
          <CardHeader className='pb-2'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>Total Income</CardTitle>
              <TrendingUp className='h-4 w-4 text-green-600' />
            </div>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold text-green-600'>${stats.totalIncome}</p>
            <p className='text-xs text-muted-foreground mt-1'>{stats.incomeCount} transactions</p>
          </CardContent>
        </Card>

        {/* Total Expense */}
        <Card className='border-l-4 border-l-red-500'>
          <CardHeader className='pb-2'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>Total Expense</CardTitle>
              <TrendingDown className='h-4 w-4 text-red-600' />
            </div>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold text-red-600'>${stats.totalExpense}</p>
            <p className='text-xs text-muted-foreground mt-1'>{stats.expenseCount} transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Pie Chart - Income vs Expense */}
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expense</CardTitle>
            <CardDescription>Distribution of your transactions</CardDescription>
          </CardHeader>
          <CardContent className='flex justify-center'>
            {pieData[0].value > 0 || pieData[1].value > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className='text-center py-12'>
                <p className='text-muted-foreground'>No data yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bar Chart - Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>Top categories breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className='text-center py-12'>
                <p className='text-muted-foreground'>No category data yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions Summary */}
      {transactions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2 max-h-64 overflow-y-auto'>
              {transactions.slice(0, 5).map((t) => (
                <div key={t._id} className='flex items-center justify-between py-2 border-b last:border-0'>
                  <div>
                    <p className='font-medium text-sm'>{t.title}</p>
                    <p className='text-xs text-muted-foreground'>{t.category}</p>
                  </div>
                  <p className={`font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default DashboardWelcome