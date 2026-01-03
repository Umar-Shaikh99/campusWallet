import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@/src/components/ui/icon';
import { ExpenseItem } from '@/src/components/custom';
import { ArrowLeft, Receipt } from 'lucide-react-native';
import { getIconByName, formatCurrency, formatExpenseDate } from '@/src/utils';
import { useExpenseStore, type Expense } from '@/src/app/stores/useExpenseStore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/src/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'CategoryExpenses'>;

export function CategoryExpensesScreen({ navigation, route }: Props) {
  const { categoryId, categoryName, categoryIcon } = route.params;
  const { getCategoryTotal, getCategoryExpenseCount, getExpensesByCategory } = useExpenseStore();

  // Get current month expenses for this category
  const allCategoryExpenses = getExpensesByCategory(categoryId);
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const currentMonthExpenses = allCategoryExpenses
    .filter((e) => {
      const expenseDate = new Date(e.date);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalSpent = getCategoryTotal(categoryId);
  const expenseCount = getCategoryExpenseCount(categoryId);

  const handleExpensePress = (expense: Expense) => {
    navigation.navigate('ExpenseDetail', { expenseId: expense.id });
  };

  return (
    <SafeAreaView className="flex-1 bg-background-950">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3">
        <Pressable onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Icon as={ArrowLeft} size="md" className="text-typography-300" />
        </Pressable>
      </View>

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Category Header */}
        <View className="flex-row items-center px-5 mb-6">
          <View className="w-12 h-12 rounded-xl bg-primary-500 items-center justify-center">
            <Icon as={getIconByName(categoryIcon)} size="lg" className="text-white" />
          </View>
          <Text className="text-2xl font-bold text-typography-50 ml-4">
            {categoryName}
          </Text>
        </View>

        {/* Summary Card */}
        <View className="mx-5 mb-6 bg-background-900 rounded-2xl p-5 border border-outline-800">
          <Text className="text-sm text-typography-400 mb-2">
            Total spent this month
          </Text>
          <Text className="text-4xl font-bold text-typography-50 mb-3">
            {formatCurrency(totalSpent)}
          </Text>
          <View className="flex-row items-center">
            <View className="bg-background-800 rounded-lg px-3 py-1.5 flex-row items-center">
              <Icon as={Receipt} size="xs" className="text-typography-400 mr-1.5" />
              <Text className="text-xs font-medium text-typography-300 uppercase">
                {expenseCount} {expenseCount === 1 ? 'expense' : 'expenses'} this month
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="px-5">
          <Text className="text-lg font-bold text-typography-50 mb-4">
            Recent Activity
          </Text>

          {currentMonthExpenses.length > 0 ? (
            <View className="gap-3">
              {currentMonthExpenses.map((expense) => (
                <ExpenseItem
                  key={expense.id}
                  title={expense.title}
                  subtitle={formatExpenseDate(expense.date)}
                  amount={expense.amount}
                  icon={getIconByName(expense.categoryIcon)}
                  onPress={() => handleExpensePress(expense)}
                />
              ))}
            </View>
          ) : (
            <View className="items-center py-12 bg-background-900 rounded-2xl">
              <View className="w-16 h-16 rounded-full bg-background-800 items-center justify-center mb-4">
                <Icon as={Receipt} size="xl" className="text-typography-500" />
              </View>
              <Text className="text-typography-400 text-center">
                No expenses this month
              </Text>
              <Text className="text-typography-500 text-sm text-center mt-1">
                Add your first {categoryName.toLowerCase()} expense
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
