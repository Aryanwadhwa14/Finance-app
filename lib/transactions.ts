import { Transaction, MonthlyExpense, CategoryExpense, Budget, BudgetComparison } from '@/types/transaction';

const STORAGE_KEY = 'finance-visualizer-transactions';
const BUDGET_STORAGE_KEY = 'finance-visualizer-budgets';

// Safe ID generation for cross-platform compatibility
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

// Safe localStorage access with error handling
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('localStorage access failed:', error);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('localStorage write failed:', error);
    }
  }
};

// Transaction Management
export const getTransactions = (): Transaction[] => {
  try {
    const stored = safeLocalStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading transactions:', error);
    return [];
  }
};

export const saveTransactions = (transactions: Transaction[]): void => {
  try {
    safeLocalStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Error saving transactions:', error);
  }
};

export const addTransaction = (transaction: Omit<Transaction, 'id' | 'createdAt'>): Transaction => {
  const newTransaction: Transaction = {
    ...transaction,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  
  const transactions = getTransactions();
  transactions.push(newTransaction);
  saveTransactions(transactions);
  
  return newTransaction;
};

export const updateTransaction = (id: string, updates: Partial<Transaction>): Transaction | null => {
  const transactions = getTransactions();
  const index = transactions.findIndex(t => t.id === id);
  
  if (index === -1) return null;
  
  transactions[index] = { ...transactions[index], ...updates };
  saveTransactions(transactions);
  
  return transactions[index];
};

export const deleteTransaction = (id: string): boolean => {
  const transactions = getTransactions();
  const filtered = transactions.filter(t => t.id !== id);
  
  if (filtered.length === transactions.length) return false;
  
  saveTransactions(filtered);
  return true;
};

// Budget Management
export const getBudgets = (): Budget[] => {
  try {
    const stored = safeLocalStorage.getItem(BUDGET_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading budgets:', error);
    return [];
  }
};

export const saveBudgets = (budgets: Budget[]): void => {
  try {
    safeLocalStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(budgets));
  } catch (error) {
    console.error('Error saving budgets:', error);
  }
};

export const addBudget = (budget: Omit<Budget, 'id' | 'createdAt'>): Budget => {
  const newBudget: Budget = {
    ...budget,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  
  const budgets = getBudgets();
  // Remove existing budget for same category and month
  const filtered = budgets.filter(b => !(b.category === budget.category && b.month === budget.month));
  filtered.push(newBudget);
  saveBudgets(filtered);
  
  return newBudget;
};

export const deleteBudget = (id: string): boolean => {
  const budgets = getBudgets();
  const filtered = budgets.filter(b => b.id !== id);
  
  if (filtered.length === budgets.length) return false;
  
  saveBudgets(filtered);
  return true;
};

// Analytics Functions
export const getMonthlyExpenses = (): MonthlyExpense[] => {
  const transactions = getTransactions();
  const expensesByMonth = new Map<string, number>();
  
  transactions
    .filter(t => t.type === 'expense')
    .forEach(transaction => {
      try {
        const date = new Date(transaction.date);
        if (isNaN(date.getTime())) return; // Skip invalid dates
        
        const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        expensesByMonth.set(monthName, (expensesByMonth.get(monthName) || 0) + transaction.amount);
      } catch (error) {
        console.warn('Invalid date in transaction:', transaction.date);
      }
    });
  
  return Array.from(expensesByMonth.entries())
    .map(([month, amount]) => ({ month, amount }))
    .sort((a, b) => {
      try {
        return new Date(a.month).getTime() - new Date(b.month).getTime();
      } catch {
        return 0;
      }
    })
    .slice(-12);
};

export const getCategoryExpenses = (): CategoryExpense[] => {
  const transactions = getTransactions();
  const expensesByCategory = new Map<string, number>();
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + (typeof t.amount === 'number' ? t.amount : 0), 0);
  
  transactions
    .filter(t => t.type === 'expense')
    .forEach(transaction => {
      if (typeof transaction.amount === 'number' && transaction.category) {
        expensesByCategory.set(
          transaction.category, 
          (expensesByCategory.get(transaction.category) || 0) + transaction.amount
        );
      }
    });
  
  const colors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
    '#06b6d4', '#f97316', '#84cc16', '#ec4899', '#6366f1',
    '#14b8a6', '#f43f5e', '#8b5cf6', '#06b6d4', '#f59e0b'
  ];
  
  return Array.from(expensesByCategory.entries())
    .map(([category, amount], index) => ({
      category,
      amount,
      percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
      color: colors[index % colors.length]
    }))
    .sort((a, b) => b.amount - a.amount);
};

export const getBudgetComparison = (month?: string): BudgetComparison[] => {
  const currentMonth = month || new Date().toISOString().slice(0, 7);
  const budgets = getBudgets().filter(b => b.month === currentMonth);
  const transactions = getTransactions().filter(t => 
    t.type === 'expense' && t.date.startsWith(currentMonth)
  );
  
  const actualSpending = new Map<string, number>();
  transactions.forEach(t => {
    if (typeof t.amount === 'number' && t.category) {
      actualSpending.set(t.category, (actualSpending.get(t.category) || 0) + t.amount);
    }
  });
  
  return budgets.map(budget => {
    const actual = actualSpending.get(budget.category) || 0;
    const percentage = budget.amount > 0 ? (actual / budget.amount) * 100 : 0;
    
    let status: 'under' | 'over' | 'on-track' = 'under';
    if (percentage > 100) status = 'over';
    else if (percentage >= 80) status = 'on-track';
    
    return {
      category: budget.category,
      budgeted: budget.amount,
      actual,
      percentage,
      status
    };
  }).sort((a, b) => b.budgeted - a.budgeted);
};

export const getTotalExpenses = (): number => {
  const transactions = getTransactions();
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + (typeof t.amount === 'number' ? t.amount : 0), 0);
};

export const getTotalIncome = (): number => {
  const transactions = getTransactions();
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + (typeof t.amount === 'number' ? t.amount : 0), 0);
};

export const getSpendingInsights = () => {
  const transactions = getTransactions();
  const currentMonth = new Date().toISOString().slice(0, 7);
  const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 7);
  
  const currentMonthExpenses = transactions
    .filter(t => t.type === 'expense' && t.date.startsWith(currentMonth))
    .reduce((sum, t) => sum + (typeof t.amount === 'number' ? t.amount : 0), 0);
    
  const lastMonthExpenses = transactions
    .filter(t => t.type === 'expense' && t.date.startsWith(lastMonth))
    .reduce((sum, t) => sum + (typeof t.amount === 'number' ? t.amount : 0), 0);
  
  const categoryExpenses = getCategoryExpenses();
  const topCategory = categoryExpenses[0];
  
  const monthlyChange = lastMonthExpenses > 0 
    ? ((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100 
    : 0;
  
  const currentDate = new Date().getDate();
  const averageDailySpending = currentDate > 0 ? currentMonthExpenses / currentDate : 0;
  
  return {
    currentMonthExpenses,
    lastMonthExpenses,
    monthlyChange,
    topCategory: topCategory?.category || 'None',
    topCategoryAmount: topCategory?.amount || 0,
    averageDailySpending
  };
};