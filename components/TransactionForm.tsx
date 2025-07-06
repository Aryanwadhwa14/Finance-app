'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Edit3, X, DollarSign, Calendar, FileText, Tag } from 'lucide-react';
import { Transaction, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/types/transaction';
import { addTransaction, updateTransaction } from '@/lib/transactions';

interface TransactionFormProps {
  editingTransaction?: Transaction | null;
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function TransactionForm({ editingTransaction, onSuccess, onCancel }: TransactionFormProps) {
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    description: '',
    type: 'expense' as 'income' | 'expense',
    category: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        amount: editingTransaction.amount.toString(),
        date: editingTransaction.date,
        description: editingTransaction.description,
        type: editingTransaction.type,
        category: editingTransaction.category,
      });
    } else {
      setFormData({
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        type: 'expense',
        category: '',
      });
    }
  }, [editingTransaction]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const transactionData = {
        amount: parseFloat(formData.amount),
        date: formData.date,
        description: formData.description.trim(),
        type: formData.type,
        category: formData.category,
      };

      if (editingTransaction) {
        updateTransaction(editingTransaction.id, transactionData);
      } else {
        addTransaction(transactionData);
      }

      onSuccess();
      
      if (!editingTransaction) {
        setFormData({
          amount: '',
          date: new Date().toISOString().split('T')[0],
          description: '',
          type: 'expense',
          category: '',
        });
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const categories = formData.type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl">
      <CardHeader className="pb-8 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl">
              {editingTransaction ? (
                <Edit3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              ) : (
                <PlusCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              )}
            </div>
            <div>
              <CardTitle className="text-4xl font-bold text-gray-900 dark:text-white font-walkway">
                {editingTransaction ? 'Edit Transaction' : 'New Transaction'}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 text-xl mt-2 font-walkway">
                {editingTransaction ? 'Modify your transaction details' : 'Record your financial activity with precision'}
              </CardDescription>
            </div>
          </div>
          {onCancel && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="h-12 w-12 p-0 hover:bg-red-100 dark:hover:bg-red-900 transition-all duration-300"
            >
              <X className="h-6 w-6" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-8">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <Label htmlFor="amount" className="text-lg font-semibold text-gray-800 dark:text-gray-200 font-walkway flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Amount
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className={`pl-12 h-14 text-xl border-2 transition-all duration-300 font-walkway ${
                    errors.amount 
                      ? 'border-red-500 focus:border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'
                  }`}
                />
              </div>
              {errors.amount && (
                <p className="text-sm text-red-600 mt-2 font-walkway">{errors.amount}</p>
              )}
            </div>

            <div className="space-y-4">
              <Label htmlFor="type" className="text-lg font-semibold text-gray-800 dark:text-gray-200 font-walkway flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Type
              </Label>
              <Select value={formData.type} onValueChange={(value: 'income' | 'expense') => handleInputChange('type', value)}>
                <SelectTrigger className="h-14 border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 text-lg font-walkway">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
                      <span className="font-walkway text-lg">Expense</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="income">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                      <span className="font-walkway text-lg">Income</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <Label htmlFor="category" className="text-lg font-semibold text-gray-800 dark:text-gray-200 font-walkway flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Category
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger className={`h-14 border-2 transition-all duration-300 text-lg font-walkway ${
                  errors.category 
                    ? 'border-red-500 focus:border-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'
                }`}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      <span className="font-walkway text-lg">{category}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-600 mt-2 font-walkway">{errors.category}</p>
              )}
            </div>

            <div className="space-y-4">
              <Label htmlFor="date" className="text-lg font-semibold text-gray-800 dark:text-gray-200 font-walkway flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className={`h-14 border-2 transition-all duration-300 text-lg font-walkway ${
                  errors.date 
                    ? 'border-red-500 focus:border-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'
                }`}
              />
              {errors.date && (
                <p className="text-sm text-red-600 mt-2 font-walkway">{errors.date}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="description" className="text-lg font-semibold text-gray-800 dark:text-gray-200 font-walkway flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter transaction description..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`min-h-[140px] border-2 transition-all duration-300 text-lg font-walkway ${
                errors.description 
                  ? 'border-red-500 focus:border-red-500 bg-red-50 dark:bg-red-900/20' 
                  : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-2 font-walkway">{errors.description}</p>
            )}
          </div>

          <div className="flex gap-6 pt-8">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-16 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold text-xl transition-all duration-300 shadow-2xl font-walkway"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-3 border-white dark:border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  {editingTransaction ? <Edit3 className="h-6 w-6" /> : <PlusCircle className="h-6 w-6" />}
                  {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
                </div>
              )}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="px-10 h-16 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-xl font-semibold transition-all duration-300 font-walkway"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}