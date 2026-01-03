import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandMMKVStorage } from './zustandStorage';

export interface Expense {
  id: string;
  amount: number;
  title: string;
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  date: string; // ISO string
  createdAt: string; // ISO string
}

export interface TopSpendingCategory {
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  total: number;
}

interface ExpenseState {
  expenses: Expense[];

  // Actions
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => void;
  removeExpense: (id: string) => void;
  updateExpense: (id: string, updates: Partial<Expense>) => void;
  clearExpenses: () => void;

  // Selectors (computed values)
  getTotalSpent: () => number;
  getExpensesByCategory: (categoryId: string) => Expense[];
  getCategoryTotal: (categoryId: string) => number;
  getCategoryExpenseCount: (categoryId: string) => number;
  getRecentExpenses: (limit?: number) => Expense[];
  
  // Insight selectors
  getTodaySpending: () => number;
  getTopSpendingCategory: () => TopSpendingCategory | null;
  getRemainingDaysInMonth: () => number;
}

// Generate unique ID
const generateId = () => `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set, get) => ({
      expenses: [],

      addExpense: (expense) => {
        const newExpense: Expense = {
          ...expense,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          expenses: [newExpense, ...state.expenses],
        }));
      },

      removeExpense: (id) => {
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        }));
      },

      updateExpense: (id, updates) => {
        set((state) => ({
          expenses: state.expenses.map((e) =>
            e.id === id ? { ...e, ...updates } : e
          ),
        }));
      },

      clearExpenses: () => set({ expenses: [] }),

      getTotalSpent: () => {
        const { expenses } = get();
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        return expenses
          .filter((e) => {
            const expenseDate = new Date(e.date);
            return (
              expenseDate.getMonth() === currentMonth &&
              expenseDate.getFullYear() === currentYear
            );
          })
          .reduce((sum, e) => sum + e.amount, 0);
      },

      getExpensesByCategory: (categoryId) => {
        return get().expenses.filter((e) => e.categoryId === categoryId);
      },

      getCategoryTotal: (categoryId) => {
        const { expenses } = get();
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        return expenses
          .filter((e) => {
            const expenseDate = new Date(e.date);
            return (
              e.categoryId === categoryId &&
              expenseDate.getMonth() === currentMonth &&
              expenseDate.getFullYear() === currentYear
            );
          })
          .reduce((sum, e) => sum + e.amount, 0);
      },

      getCategoryExpenseCount: (categoryId) => {
        const { expenses } = get();
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        return expenses.filter((e) => {
          const expenseDate = new Date(e.date);
          return (
            e.categoryId === categoryId &&
            expenseDate.getMonth() === currentMonth &&
            expenseDate.getFullYear() === currentYear
          );
        }).length;
      },

      getRecentExpenses: (limit = 5) => {
        return get()
          .expenses.slice()
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, limit);
      },

      getTodaySpending: () => {
        const { expenses } = get();
        const today = new Date();
        const todayStr = today.toDateString();

        return expenses
          .filter((e) => new Date(e.date).toDateString() === todayStr)
          .reduce((sum, e) => sum + e.amount, 0);
      },

      getTopSpendingCategory: () => {
        const { expenses } = get();
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // Filter current month expenses
        const currentMonthExpenses = expenses.filter((e) => {
          const expenseDate = new Date(e.date);
          return (
            expenseDate.getMonth() === currentMonth &&
            expenseDate.getFullYear() === currentYear
          );
        });

        if (currentMonthExpenses.length === 0) return null;

        // Group by category and sum
        const categoryTotals = currentMonthExpenses.reduce((acc, e) => {
          if (!acc[e.categoryId]) {
            acc[e.categoryId] = {
              categoryId: e.categoryId,
              categoryName: e.categoryName,
              categoryIcon: e.categoryIcon,
              total: 0,
            };
          }
          acc[e.categoryId].total += e.amount;
          return acc;
        }, {} as Record<string, TopSpendingCategory>);

        // Find the category with highest total
        const topCategory = Object.values(categoryTotals).reduce((max, cat) =>
          cat.total > max.total ? cat : max
        );

        return topCategory;
      },

      getRemainingDaysInMonth: () => {
        const now = new Date();
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return lastDayOfMonth.getDate() - now.getDate() + 1; // Include today
      },
    }),
    {
      name: 'expense-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
