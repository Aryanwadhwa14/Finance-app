'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Wallet, Calculator, Target, PieChart } from 'lucide-react';
import { getTotalExpenses, getTotalIncome, getTransactions, getCategoryExpenses, getBudgets } from '@/lib/transactions';

interface DashboardStatsProps {
  refreshTrigger: number;
}

export default function DashboardStats({ refreshTrigger }: DashboardStatsProps) {
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    transactionCount: 0,
    topCategory: '',
    topCategoryAmount: 0,
    budgetCount: 0,
  });

  useEffect(() => {
    loadStats();
  }, [refreshTrigger]);

  const loadStats = () => {
    const totalIncome = getTotalIncome();
    const totalExpenses = getTotalExpenses();
    const balance = totalIncome - totalExpenses;
    const transactionCount = getTransactions().length;
    const budgetCount = getBudgets().length;
    
    const categoryExpenses = getCategoryExpenses();
    const topCategory = categoryExpenses[0];

    setStats({
      totalIncome,
      totalExpenses,
      balance,
      transactionCount,
      topCategory: topCategory?.category || 'None',
      topCategoryAmount: topCategory?.amount || 0,
      budgetCount,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const statCards = [
    {
      title: 'Total Income',
      value: formatCurrency(stats.totalIncome),
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-l-green-500',
      description: 'Total earnings recorded',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(stats.totalExpenses),
      icon: TrendingDown,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-l-red-500',
      description: 'Total spending tracked',
    },
    {
      title: 'Net Balance',
      value: formatCurrency(stats.balance),
      icon: Wallet,
      color: stats.balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400',
      bgColor: stats.balance >= 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20',
      borderColor: stats.balance >= 0 ? 'border-l-green-500' : 'border-l-red-500',
      description: 'Current financial position',
    },
    {
      title: 'Top Category',
      value: stats.topCategory,
      subValue: formatCurrency(stats.topCategoryAmount),
      icon: PieChart,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-l-blue-500',
      description: 'Highest spending category',
    },
    {
      title: 'Transactions',
      value: stats.transactionCount.toString(),
      icon: Calculator,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-l-purple-500',
      description: 'Total records maintained',
    },
    {
      title: 'Active Budgets',
      value: stats.budgetCount.toString(),
      icon: Target,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-l-orange-500',
      description: 'Budget plans configured',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {statCards.map((stat, index) => (
        <Card key={index} className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 ${stat.borderColor} border-l-4 hover-lift shadow-lg`}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200 font-walkway">
                {stat.title}
              </CardTitle>
              <div className={`p-3 rounded-xl hover-bounce ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className={`text-3xl font-bold ${stat.color} font-walkway`}>
                {stat.value}
              </div>
              {stat.subValue && (
                <div className="text-lg font-semibold text-gray-600 dark:text-gray-400 font-walkway">
                  {stat.subValue}
                </div>
              )}
              {stat.title === 'Net Balance' && (
                <Badge 
                  variant={stats.balance >= 0 ? 'default' : 'destructive'}
                  className={`text-sm font-semibold px-3 py-1 font-walkway hover-scale ${
                    stats.balance >= 0 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800' 
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800'
                  }`}
                >
                  {stats.balance >= 0 ? 'Positive' : 'Negative'}
                </Badge>
              )}
              <CardDescription className="text-sm text-gray-500 dark:text-gray-400 font-medium font-walkway">
                {stat.description}
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}