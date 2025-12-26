// Common type definitions
export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

// Onboarding types
export type LivingType = 'hostel' | 'home';

export interface ExpenseCategory {
  id: string;
  name: string;
  icon: string; // Lucide icon name
}

export interface OnboardingData {
  userName?: string;
  collegeName?: string;
  monthlyBudget: number;
  livingType: LivingType;
  selectedCategories: ExpenseCategory[];
}

// Default expense categories based on living type
export const HOSTEL_CATEGORIES: ExpenseCategory[] = [
  { id: 'canteen', name: 'Canteen', icon: 'UtensilsCrossed' },
  { id: 'snacks', name: 'Snacks', icon: 'Cookie' },
  { id: 'food-delivery', name: 'Food Delivery', icon: 'Bike' },
  { id: 'auto-metro', name: 'Auto/Metro', icon: 'Bus' },
  { id: 'hostel-rent', name: 'Hostel Rent', icon: 'Building2' },
  { id: 'mess', name: 'Mess', icon: 'Soup' },
  { id: 'exam-fees', name: 'Exam Fees', icon: 'FileText' },
  { id: 'photocopy', name: 'Photocopy/Print', icon: 'Printer' },
  { id: 'mobile-recharge', name: 'Mobile Recharge', icon: 'Smartphone' },
  { id: 'other', name: 'Other', icon: 'MoreHorizontal' },
];

export const HOME_CATEGORIES: ExpenseCategory[] = [
  { id: 'food', name: 'Food', icon: 'UtensilsCrossed' },
  { id: 'snacks', name: 'Snacks', icon: 'Cookie' },
  { id: 'transport', name: 'Transport', icon: 'Car' },
  { id: 'entertainment', name: 'Entertainment', icon: 'Gamepad2' },
  { id: 'shopping', name: 'Shopping', icon: 'ShoppingBag' },
  { id: 'education', name: 'Education', icon: 'GraduationCap' },
  { id: 'mobile-recharge', name: 'Mobile Recharge', icon: 'Smartphone' },
  { id: 'other', name: 'Other', icon: 'MoreHorizontal' },
];

// Budget presets
export const BUDGET_PRESETS = [5000, 8000, 10000];
