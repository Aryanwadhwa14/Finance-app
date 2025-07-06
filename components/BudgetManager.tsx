'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Target, Plus, Trash2, DollarSign, Calendar } from 'lucide-react';
import { Budget, EXPENSE_CATEGORIES } from '@/types/transaction';
import { getBudgets, addBudget, deleteBudget } from '@/lib/transactions';

interface BudgetManagerProps {
  refreshTrigger: number;
  onBudgetChange: () => void;
}

export default function BudgetManager({ refreshTrigger, onBudgetChange }: BudgetManagerProps) {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    month: new Date().toISOString().slice(0, 7),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadBudgets();
  }, [refreshTrigger]);

  const loadBudgets = () => {
    const data = getBudgets();
    const sortedData = data.sort((a, b) => new Date(b.month).getTime() - new Date(a.month).getTime());
    setBudgets(sortedData);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }

    if (!formData.month) {
      newErrors.month = 'Month is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    addBudget({
      category: formData.category,
      amount: parseFloat(formData.amount),
      month: formData.month,
    });

    setFormData({
      category: '',
      amount: '',
      month: new Date().toISOString().slice(0, 7),
    });
    setShowForm(false);
    loadBudgets();
    onBudgetChange();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      deleteBudget(id);
      loadBudgets();
      onBudgetChange();
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatMonth = (monthString: string) => {
    return new Date(monthString + '-01').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-2xl">
      <CardHeader className="pb-8 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <Target className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white font-walkway">
                Budget Manager
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 text-lg mt-1 font-walkway">
                Set and manage your monthly spending limits
              </CardDescription>
            </div>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold px-6 py-3 transition-all duration-200 font-walkway"
          >
            <Plus className="h-5 w-5 mr-2" />
            {showForm ? 'Cancel' : 'Add Budget'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-8">
        {showForm && (
          <Card className="mb-8 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-base font-semibold text-gray-800 dark:text-gray-200 font-walkway">
                      Category
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger className={`h-12 border-2 ${
                        errors.category 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:border-gray-900 dark:focus:border-white'
                      }`}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {EXPENSE_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            <span className="font-walkway">{category}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-red-600 font-walkway">{errors.category}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-base font-semibold text-gray-800 dark:text-gray-200 font-walkway">
                      Budget Amount
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                        className={`pl-10 h-12 border-2 ${
                          errors.amount 
                            ? 'border-red-500 focus:border-red-500' 
                            : 'border-gray-300 dark:border-gray-600 focus:border-gray-900 dark:focus:border-white'
                        } font-walkway`}
                      />
                    </div>
                    {errors.amount && (
                      <p className="text-sm text-red-600 font-walkway">{errors.amount}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="month" className="text-base font-semibold text-gray-800 dark:text-gray-200 font-walkway">
                      Month
                    </Label>
                    <Input
                      id="month"
                      type="month"
                      value={formData.month}
                      onChange={(e) => setFormData(prev => ({ ...prev, month: e.target.value }))}
                      className={`h-12 border-2 ${
                        errors.month 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:border-gray-900 dark:focus:border-white'
                      } font-walkway`}
                    />
                    {errors.month && (
                      <p className="text-sm text-red-600 font-walkway">{errors.month}</p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold text-lg transition-all duration-200 font-walkway"
                >
                  <Target className="h-5 w-5 mr-2" />
                  Create Budget
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {budgets.length === 0 ? (
          <div className="text-center py-16">
            <Target className="h-20 w-20 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-3 font-walkway">
              No budgets configured
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-walkway">
              Create your first budget to start tracking spending limits
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgets.map((budget) => (
              <Card key={budget.id} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 font-semibold px-3 py-1 font-walkway">
                      {budget.category}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(budget.id)}
                      className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white font-walkway">
                      {formatCurrency(budget.amount)}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium font-walkway">
                        {formatMonth(budget.month)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}