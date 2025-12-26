import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandMMKVStorage } from './zustandStorage';
import type { OnboardingData, LivingType, ExpenseCategory } from '@/src/types';
import { HOSTEL_CATEGORIES, HOME_CATEGORIES } from '@/src/types';

// Default onboarding data
const defaultOnboardingData: OnboardingData = {
  userName: undefined,
  collegeName: undefined,
  monthlyBudget: 8000,
  livingType: 'hostel',
  selectedCategories: HOSTEL_CATEGORIES,
};

// Onboarding state interface
interface OnboardingState {
  isOnboarded: boolean;
  onboardingData: OnboardingData;

  // Actions
  setUserName: (name: string) => void;
  setCollegeName: (college: string) => void;
  setMonthlyBudget: (budget: number) => void;
  setLivingType: (type: LivingType) => void;
  setCategories: (categories: ExpenseCategory[]) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

// Initial state
const initialState = {
  isOnboarded: false,
  onboardingData: defaultOnboardingData,
};

// Create the onboarding store with MMKV persistence
export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...initialState,

      setUserName: (name: string) =>
        set((state) => ({
          onboardingData: { ...state.onboardingData, userName: name },
        })),

      setCollegeName: (college: string) =>
        set((state) => ({
          onboardingData: { ...state.onboardingData, collegeName: college },
        })),

      setMonthlyBudget: (budget: number) =>
        set((state) => ({
          onboardingData: { ...state.onboardingData, monthlyBudget: budget },
        })),

      setLivingType: (type: LivingType) => {
        const categories = type === 'hostel' ? HOSTEL_CATEGORIES : HOME_CATEGORIES;
        set((state) => ({
          onboardingData: {
            ...state.onboardingData,
            livingType: type,
            selectedCategories: categories,
          },
        }));
      },

      setCategories: (categories: ExpenseCategory[]) =>
        set((state) => ({
          onboardingData: { ...state.onboardingData, selectedCategories: categories },
        })),

      completeOnboarding: () => set({ isOnboarded: true }),

      resetOnboarding: () => set(initialState),
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
