'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingDown, Calendar } from 'lucide-react';
import { getMonthlyExpenses } from '@/lib/transactions';
import { MonthlyExpense } from '@/types/transaction';

interface MonthlyExpensesChartProps {
  refreshTrigger: number;
}

export default function MonthlyExpensesChart({ refreshTrigger }: MonthlyExpensesChartProps) {
  const [monthlyData, setMonthlyData] = useState<MonthlyExpense[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    loadData();
  }, [refreshTrigger]);

  const loadData = () => {
    const data = getMonthlyExpenses();
    setMonthlyData(data);
    setTotalExpenses(data.reduce((sum, item) => sum + item.amount, 0));
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg">
          <p className="font-bold text-gray-900 dark:text-white text-lg mb-2 font-walkway">
            {label}
          </p>
          <p className="text-red-600 dark:text-red-400 font-semibold text-base font-walkway">
            Expenses: ${payload[0].value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg">
      <CardHeader className="pb-8 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white font-walkway">
                Monthly Expenses
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 text-lg mt-1 font-walkway">
                Track your spending patterns over time
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 font-walkway">
              ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-base text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1 font-walkway">
              <Calendar className="h-4 w-4" />
              Last 12 months
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-8">
        {monthlyData.length === 0 ? (
          <div className="text-center py-16">
            <TrendingDown className="h-20 w-20 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-3 font-walkway">
              No expense data available
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-walkway">
              Add some expense transactions to see your monthly spending chart
            </p>
          </div>
        ) : (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 14, fontFamily: 'Walkway' }}
                  stroke="#6b7280"
                  className="dark:stroke-gray-400"
                />
                <YAxis 
                  tick={{ fontSize: 14, fontFamily: 'Walkway' }}
                  stroke="#6b7280"
                  className="dark:stroke-gray-400"
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="amount" 
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                  className="hover:opacity-80 transition-opacity"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}