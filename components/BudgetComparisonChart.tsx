'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { getBudgetComparison } from '@/lib/transactions';
import { BudgetComparison } from '@/types/transaction';

interface BudgetComparisonChartProps {
  refreshTrigger: number;
}

export default function BudgetComparisonChart({ refreshTrigger }: BudgetComparisonChartProps) {
  const [comparisonData, setComparisonData] = useState<BudgetComparison[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  useEffect(() => {
    loadData();
  }, [refreshTrigger, selectedMonth]);

  const loadData = () => {
    const data = getBudgetComparison(selectedMonth);
    setComparisonData(data);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const budgeted = payload.find((p: any) => p.dataKey === 'budgeted')?.value || 0;
      const actual = payload.find((p: any) => p.dataKey === 'actual')?.value || 0;
      const percentage = budgeted > 0 ? (actual / budgeted) * 100 : 0;
      
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-2xl">
          <p className="font-bold text-gray-900 dark:text-white text-lg mb-3 font-walkway">
            {label}
          </p>
          <div className="space-y-2">
            <p className="text-blue-600 dark:text-blue-400 font-semibold font-walkway">
              Budgeted: ${budgeted.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-red-600 dark:text-red-400 font-semibold font-walkway">
              Actual: ${actual.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-medium font-walkway">
              Usage: {percentage.toFixed(1)}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'over':
        return <AlertTriangle className="h-4 w-4" />;
      case 'on-track':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <TrendingDown className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'over':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800';
      case 'on-track':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 hover:bg-yellow-200 dark:hover:bg-yellow-800';
      default:
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800';
    }
  };

  const formatMonth = (monthString: string) => {
    return new Date(monthString + '-01').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return date.toISOString().slice(0, 7);
  });

  return (
    <Card className="w-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-2xl">
      <CardHeader className="pb-8 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white font-walkway">
                Budget vs Actual
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 text-lg mt-1 font-walkway">
                Compare your planned budget with actual spending
              </CardDescription>
            </div>
          </div>
          <div className="w-48">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="h-12 border-2 border-gray-300 dark:border-gray-600 focus:border-gray-900 dark:focus:border-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {monthOptions.map((month) => (
                  <SelectItem key={month} value={month}>
                    <span className="font-walkway">
                      {formatMonth(month)}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-8">
        {comparisonData.length === 0 ? (
          <div className="text-center py-16">
            <Target className="h-20 w-20 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-3 font-walkway">
              No budget data for {formatMonth(selectedMonth)}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-walkway">
              Create budgets for this month to see the comparison
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
                  <XAxis 
                    dataKey="category" 
                    tick={{ fontSize: 12, fontFamily: 'Walkway' }}
                    stroke="#6b7280"
                    className="dark:stroke-gray-400"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fontFamily: 'Walkway' }}
                    stroke="#6b7280"
                    className="dark:stroke-gray-400"
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="budgeted" fill="#3b82f6" name="Budgeted" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" fill="#ef4444" name="Actual" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comparisonData.map((item) => (
                <Card key={item.category} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg font-walkway">
                        {item.category}
                      </h4>
                      <Badge className={`font-semibold px-3 py-1 ${getStatusColor(item.status)} font-walkway`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(item.status)}
                          {item.status === 'over' ? 'Over Budget' : item.status === 'on-track' ? 'On Track' : 'Under Budget'}
                        </div>
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400 font-medium font-walkway">
                          Budgeted:
                        </span>
                        <span className="font-bold text-blue-600 dark:text-blue-400 font-walkway">
                          ${item.budgeted.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400 font-medium font-walkway">
                          Actual:
                        </span>
                        <span className="font-bold text-red-600 dark:text-red-400 font-walkway">
                          ${item.actual.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400 font-medium font-walkway">
                          Usage:
                        </span>
                        <span className={`font-bold ${
                          item.percentage > 100 ? 'text-red-600 dark:text-red-400' : 
                          item.percentage >= 80 ? 'text-yellow-600 dark:text-yellow-400' : 
                          'text-green-600 dark:text-green-400'
                        } font-walkway`}>
                          {item.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}