// App constants
export const COLORS = {
  primary: '#0ea5e9',
  secondary: '#d946ef',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
} as const;

export const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Entertainment',
  'Bills',
  'Health',
  'Other',
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];
