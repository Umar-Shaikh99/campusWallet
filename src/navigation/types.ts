import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

// Onboarding Stack Navigator param list
export type OnboardingStackParamList = {
  IntroFinances: undefined;
  IntroTracking: undefined;
  IntroCustomization: undefined;
  HousingSituation: undefined;
  CategorySetup: undefined;
  FinalDetails: undefined;
};

// Add Expense Stack Navigator param list
export type AddExpenseStackParamList = {
  AddExpense: {
    categoryId?: string;
    categoryName?: string;
    categoryIcon?: string;
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
  ExpenseDetail: { expenseId: string };
  EditExpense: { expenseId: string };
  CategoriesList: undefined;
  CategoryExpenses: {
    categoryId: string;
    categoryName: string;
    categoryIcon: string;
  };
  ManageCategories: undefined;
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
