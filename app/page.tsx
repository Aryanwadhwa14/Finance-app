'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import MonthlyExpensesChart from '@/components/MonthlyExpensesChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import BudgetManager from '@/components/BudgetManager';
import BudgetComparisonChart from '@/components/BudgetComparisonChart';
import SpendingInsights from '@/components/SpendingInsights';
import DashboardStats from '@/components/DashboardStats';
import { PlusCircle, Wallet, BarChart3, Target, Brain, Github } from 'lucide-react';
import { Transaction } from '@/types/transaction';

export default function Home() {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTransactionSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
    setEditingTransaction(null);
    setShowForm(false);
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
    setActiveTab('transactions');
  };

  const handleAddNew = () => {
    setEditingTransaction(null);
    setShowForm(true);
    setActiveTab('transactions');
  };

  const handleCancel = () => {
    setEditingTransaction(null);
    setShowForm(false);
  };

  const handleBudgetChange = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'transactions', label: 'Transactions', icon: Wallet },
    { id: 'budgets', label: 'Budgets', icon: Target },
    { id: 'insights', label: 'Insights', icon: Brain },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gray-900 dark:bg-white rounded-2xl shadow-lg hover-rotate">
                <Wallet className="h-10 w-10 text-white dark:text-gray-900" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-2 font-walkway gradient-text">
                  Finance Visualizer
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-xl font-walkway">
                  Professional financial management and analytics platform
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button
                onClick={handleAddNew}
                className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold px-8 py-4 text-lg shadow-lg hover-lift font-walkway"
              >
                <PlusCircle className="h-6 w-6 mr-3" />
                New Transaction
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white dark:bg-gray-900 p-2 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 hover-glow">
              <div className="flex gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 font-walkway hover-scale ${
                      activeTab === tab.id
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg pulse-glow'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="space-y-12">
          {activeTab === 'dashboard' && (
            <>
              <DashboardStats refreshTrigger={refreshTrigger} />
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                <MonthlyExpensesChart refreshTrigger={refreshTrigger} />
                <CategoryPieChart refreshTrigger={refreshTrigger} />
              </div>
            </>
          )}

          {activeTab === 'transactions' && (
            <>
              {showForm && (
                <div className="mb-12">
                  <TransactionForm
                    editingTransaction={editingTransaction}
                    onSuccess={handleTransactionSuccess}
                    onCancel={handleCancel}
                  />
                </div>
              )}
              <TransactionList 
                onEdit={handleEdit} 
                refreshTrigger={refreshTrigger}
              />
            </>
          )}

          {activeTab === 'budgets' && (
            <>
              <BudgetManager 
                refreshTrigger={refreshTrigger} 
                onBudgetChange={handleBudgetChange}
              />
              <BudgetComparisonChart refreshTrigger={refreshTrigger} />
            </>
          )}

          {activeTab === 'insights' && (
            <>
              <SpendingInsights refreshTrigger={refreshTrigger} />
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                <MonthlyExpensesChart refreshTrigger={refreshTrigger} />
                <CategoryPieChart refreshTrigger={refreshTrigger} />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-20 py-12 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-center gap-3 text-gray-500 dark:text-gray-400 mb-4">
            <span className="text-lg font-semibold font-walkway">
              Website developed by 
              <a 
                href="https://github.com/Aryanwadhwa14" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors hover-scale"
              >
                Aryan Wadhwa
                <Github className="h-5 w-5" />
              </a>
            </span>
          </div>
          <p className="text-gray-400 dark:text-gray-500 font-medium font-walkway">
            Financial Management Platform © 2025
          </p>
        </div>
      </div>
    </div>
  );
}