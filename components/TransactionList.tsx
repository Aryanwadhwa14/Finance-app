'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Search, Edit3, Trash2, Calendar, DollarSign, FileText, TrendingUp, TrendingDown, Filter, X, AlertTriangle } from 'lucide-react';
import { Transaction, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/types/transaction';
import { getTransactions, deleteTransaction } from '@/lib/transactions';

interface TransactionListProps {
  onEdit: (transaction: Transaction) => void;
  refreshTrigger: number;
}

export default function TransactionList({ onEdit, refreshTrigger }: TransactionListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadTransactions();
  }, [refreshTrigger]);

  useEffect(() => {
    let filtered = transactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.amount.toString().includes(searchTerm) ||
                           transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;
      const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
      
      return matchesSearch && matchesCategory && matchesType;
    });
    
    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, categoryFilter, typeFilter]);

  const loadTransactions = () => {
    const data = getTransactions();
    const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setTransactions(sortedData);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirm(id);
  };

  const handleDeleteConfirm = (id: string) => {
    deleteTransaction(id);
    loadTransactions();
    setDeleteConfirm(null);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const allCategories = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

  return (
    <>
      <Card className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg hover-lift">
        <CardHeader className="pb-8 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover-bounce">
                <FileText className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white font-walkway">
                  Transaction History
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 text-lg mt-1 font-walkway">
                  Comprehensive view of your financial activities
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 px-4 py-2 text-base font-semibold font-walkway hover-scale">
              {transactions.length} Records
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          {/* Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 text-base font-walkway hover-glow"
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-12 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 hover-glow">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <span className="font-walkway">All Types</span>
                </SelectItem>
                <SelectItem value="income">
                  <span className="font-walkway">Income Only</span>
                </SelectItem>
                <SelectItem value="expense">
                  <span className="font-walkway">Expenses Only</span>
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-12 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 hover-glow">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <span className="font-walkway">All Categories</span>
                </SelectItem>
                {allCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    <span className="font-walkway">{category}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="h-20 w-20 text-gray-300 dark:text-gray-600 mx-auto mb-6 animate-float" />
              <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-3 font-walkway">
                {searchTerm || categoryFilter !== 'all' || typeFilter !== 'all' ? 'No matching transactions' : 'No transactions recorded'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-walkway">
                {searchTerm || categoryFilter !== 'all' || typeFilter !== 'all' 
                  ? 'Try adjusting your search criteria' 
                  : 'Start by adding your first financial transaction'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTransactions.map((transaction, index) => (
                <div key={transaction.id}>
                  <div className="flex items-center justify-between p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200 dark:border-gray-600 hover-lift">
                    <div className="flex items-center gap-6">
                      <div className={`p-3 rounded-full hover-bounce ${
                        transaction.type === 'income' 
                          ? 'bg-green-100 dark:bg-green-900' 
                          : 'bg-red-100 dark:bg-red-900'
                      }`}>
                        {transaction.type === 'income' ? (
                          <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                        ) : (
                          <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h4 className="font-bold text-gray-900 dark:text-white text-lg font-walkway">
                            {transaction.description}
                          </h4>
                          <Badge
                            variant={transaction.type === 'income' ? 'default' : 'destructive'}
                            className={`text-sm font-semibold px-3 py-1 font-walkway hover-scale ${
                              transaction.type === 'income' 
                                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800' 
                                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800'
                            }`}
                          >
                            {transaction.type}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 font-semibold px-3 py-1 font-walkway hover-scale"
                          >
                            {transaction.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span className="font-medium font-walkway">
                              {formatDate(transaction.date)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            <span className={`font-bold text-lg font-walkway ${
                              transaction.type === 'income' 
                                ? 'text-green-600 dark:text-green-400' 
                                : 'text-red-600 dark:text-red-400'
                            }`}>
                              {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(transaction)}
                        className="h-10 w-10 p-0 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400 transition-all hover-scale"
                      >
                        <Edit3 className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(transaction.id)}
                        className="h-10 w-10 p-0 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 transition-all hover-scale"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  {index < filteredTransactions.length - 1 && <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-700 animate-slide-in-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-walkway">
                  Delete Transaction
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-walkway">
                  This action cannot be undone
                </p>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-8 font-walkway">
              Are you sure you want to delete this transaction? This will permanently remove it from your records.
            </p>
            
            <div className="flex gap-4">
              <Button
                onClick={() => handleDeleteConfirm(deleteConfirm)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 font-walkway hover-scale"
              >
                Delete
              </Button>
              <Button
                onClick={handleDeleteCancel}
                variant="outline"
                className="flex-1 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold py-3 font-walkway hover-scale"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}