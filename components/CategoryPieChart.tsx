'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';
import { getCategoryExpenses } from '@/lib/transactions';
import { CategoryExpense } from '@/types/transaction';

interface CategoryPieChartProps {
  refreshTrigger: number;
}

export default function CategoryPieChart({ refreshTrigger }: CategoryPieChartProps) {
  const [categoryData, setCategoryData] = useState<CategoryExpense[]>([]);

  useEffect(() => {
    loadData();
  }, [refreshTrigger]);

  const loadData = () => {
    const data = getCategoryExpenses();
    setCategoryData(data);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg">
          <p className="font-bold text-gray-900 dark:text-white text-lg mb-2 font-walkway">
            {data.category}
          </p>
          <p className="text-gray-700 dark:text-gray-300 font-semibold font-walkway">
            Amount: ${data.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-gray-600 dark:text-gray-400 font-medium font-walkway">
            {data.percentage.toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="grid grid-cols-2 gap-3 mt-6">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate font-walkway">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const colors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
    '#06b6d4', '#f97316', '#84cc16', '#ec4899', '#6366f1',
    '#14b8a6', '#f43f5e', '#8b5cf6', '#06b6d4', '#f59e0b'
  ];

  const enhancedData = categoryData.map((item, index) => ({
    ...item,
    color: colors[index % colors.length]
  }));

  return (
    <Card className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg">
      <CardHeader className="pb-8 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <PieChartIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white font-walkway">
              Category Breakdown
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 text-lg mt-1 font-walkway">
              Expense distribution by category
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-8">
        {categoryData.length === 0 ? (
          <div className="text-center py-16">
            <PieChartIcon className="h-20 w-20 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-3 font-walkway">
              No category data available
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-walkway">
              Add some categorized expenses to see the breakdown
            </p>
          </div>
        ) : (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={enhancedData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="amount"
                  stroke="#ffffff"
                  strokeWidth={2}
                >
                  {enhancedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}