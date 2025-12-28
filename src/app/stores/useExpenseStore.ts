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
  getRecentExpenses: (limit?: number) => Expense[];
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

      getRecentExpenses: (limit = 5) => {
        return get()
          .expenses.slice()
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, limit);
      },
    }),
    {
      name: 'expense-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
