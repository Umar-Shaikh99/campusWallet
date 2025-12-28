import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

// Onboarding Stack Navigator param list
export type OnboardingStackParamList = {
  Welcome: undefined;
  ProfileSetup: undefined;
  BudgetSetup: undefined;
  LivingType: undefined;
  Categories: undefined;
};

// Add Expense Stack Navigator param list
export type AddExpenseStackParamList = {
  AddExpenseAmount: {
    categoryId: string;
    categoryName: string;
    categoryIcon: string;
  };
  AddExpenseDetails: {
    amount: number;
    categoryId: string;
    categoryName: string;
    categoryIcon: string;
  };
  AddExpenseSuccess: {
    amount: number;
    categoryName: string;
    categoryIcon: string;
    note: string;
    date: string;
  };
};

// Bottom Tab Navigator param list
export type BottomTabParamList = {
  Home: undefined;
  Analytics: undefined;
  Wallet: undefined;
  Profile: undefined;
};

// Root Stack Navigator param list
export type RootStackParamList = {
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  MainTabs: NavigatorScreenParams<BottomTabParamList>;
  AddExpense: NavigatorScreenParams<AddExpenseStackParamList>;
};

// Screen props types
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type OnboardingStackScreenProps<T extends keyof OnboardingStackParamList> =
  NativeStackScreenProps<OnboardingStackParamList, T>;

export type AddExpenseStackScreenProps<T extends keyof AddExpenseStackParamList> =
  NativeStackScreenProps<AddExpenseStackParamList, T>;

export type BottomTabScreenPropsType<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

// Declare global navigation type for useNavigation hook
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
