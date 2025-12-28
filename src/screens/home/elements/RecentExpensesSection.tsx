import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ExpenseItem } from '@/src/components/custom';
import { getIconByName, formatExpenseDate } from '@/src/utils';
import type { Expense } from '@/src/app/stores/useExpenseStore';

interface RecentExpensesSectionProps {
  expenses: Expense[];
  onViewAll?: () => void;
  onExpensePress?: (expense: Expense) => void;
}

export function RecentExpensesSection({
  expenses,
  onViewAll,
  onExpensePress,
}: RecentExpensesSectionProps) {
  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-bold text-typography-50">Recent Expenses</Text>
        <Pressable onPress={onViewAll}>
          <Text className="text-sm font-medium text-primary-400">VIEW ALL</Text>
        </Pressable>
      </View>

      {expenses.length > 0 ? (
        <View className="gap-3">
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              title={expense.title}
              subtitle={formatExpenseDate(expense.date)}
              amount={expense.amount}
              icon={getIconByName(expense.categoryIcon)}
              onPress={() => onExpensePress?.(expense)}
            />
          ))}
        </View>
      ) : (
        <View className="items-center py-8 bg-background-900 rounded-2xl">
          <Text className="text-typography-500">No expenses yet</Text>
          <Text className="text-typography-600 text-sm mt-1">
            Tap Quick Add to add your first expense
          </Text>
        </View>
      )}
    </View>
  );
}
