import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@/src/components/ui/icon';
import { BudgetCard } from '@/src/components/custom';
import { HeaderSection, QuickAddSection, RecentExpensesSection } from './elements';
import { useOnboardingStore } from '@/src/app/stores/useOnboardingStore';
import { useExpenseStore } from '@/src/app/stores/useExpenseStore';
import { useNavigation } from '@react-navigation/native';
import { Plus } from 'lucide-react-native';
import type { ExpenseCategory } from '@/src/types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/src/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { onboardingData } = useOnboardingStore();
  const { getTotalSpent, getRecentExpenses } = useExpenseStore();

  const totalSpent = getTotalSpent();
  const recentExpenses = getRecentExpenses(5);
  const userName = onboardingData.userName || 'User';
  const budget = onboardingData.monthlyBudget;

  // Quick Add - pre-selects category
  const handleQuickAdd = (category: ExpenseCategory) => {
    navigation.navigate('AddExpense', {
      screen: 'AddExpense',
      params: {
        categoryId: category.id,
        categoryName: category.name,
        categoryIcon: category.icon,
      },
    });
  };

  // FAB - opens without pre-selected category (shows category picker)
  const handleFABPress = () => {
    navigation.navigate('AddExpense', {
      screen: 'AddExpense',
      params: {},
    });
  };

  const handleExpensePress = (expense: { id: string }) => {
    navigation.navigate('ExpenseDetail', { expenseId: expense.id });
  };

  const handleViewAll = () => {
    navigation.navigate('CategoriesList');
  };

  return (
    <SafeAreaView className="flex-1 bg-background-950" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 py-4">
          <HeaderSection userName={userName} />

          <BudgetCard budget={budget} spent={totalSpent} className="mb-6 rounded-xl" />

          <QuickAddSection
            categories={onboardingData.selectedCategories}
            onCategoryPress={handleQuickAdd}
          />

          <RecentExpensesSection 
            expenses={recentExpenses} 
            onExpensePress={handleExpensePress}
            onViewAll={handleViewAll}
          />
        </View>
      </ScrollView>

      {/* FAB */}
      <Pressable
        className="absolute bottom-6 right-6 w-14 h-14 items-center justify-center rounded-full bg-primary-500"
        onPress={handleFABPress}
      >
        <Icon as={Plus} size="lg" className="text-white" />
      </Pressable>
    </SafeAreaView>
  );
}
