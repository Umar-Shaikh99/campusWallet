import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@/src/components/ui/icon';
import { Button, ButtonText } from '@/src/components/ui/button';
import { ConfirmationModal } from '@/src/components/custom';
import { getIconByName, formatCurrency } from '@/src/utils';
import { ArrowLeft, Pencil, FileText, Users, Trash2 } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/src/navigation/types';
import { useExpenseStore, type Expense } from '@/src/app/stores/useExpenseStore';

type Props = NativeStackScreenProps<RootStackParamList, 'ExpenseDetail'>;

export function ExpenseDetailScreen({ navigation, route }: Props) {
  const { expenseId } = route.params;
  const { expenses, removeExpense } = useExpenseStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const expense = expenses.find((e) => e.id === expenseId);

  if (!expense) {
    return (
      <SafeAreaView className="flex-1 bg-background-950 items-center justify-center">
        <Text className="text-typography-400">Expense not found</Text>
      </SafeAreaView>
    );
  }

  const expenseDate = new Date(expense.date);
  const isToday = new Date().toDateString() === expenseDate.toDateString();
  const isYesterday = new Date(Date.now() - 86400000).toDateString() === expenseDate.toDateString();
  
  const dateLabel = isToday 
    ? 'Today' 
    : isYesterday 
      ? 'Yesterday' 
      : expenseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  
  const timeLabel = expenseDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const formattedDateTime = `${dateLabel}, ${timeLabel}`;

  const handleEdit = () => {
    navigation.navigate('EditExpense', { expenseId: expense.id });
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    removeExpense(expense.id);
    setShowDeleteModal(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-background-950">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <Pressable onPress={() => navigation.goBack()} className="p-2">
          <Icon as={ArrowLeft} size="md" className="text-typography-300" />
        </Pressable>
        <Text className="text-lg font-semibold text-typography-50">Expense Details</Text>
        <Pressable onPress={handleDelete} className="p-2">
          <Icon as={Trash2} size="md" className="text-error-400" />
        </Pressable>
      </View>

      <View className="flex-1 px-5">
        {/* Category Icon & Info */}
        <View className="items-center mt-8 mb-6">
          <View className="w-24 h-24 rounded-full bg-primary-500 items-center justify-center mb-4">
            <Icon as={getIconByName(expense.categoryIcon)} size="xl" className="text-white" />
          </View>
          <Text className="text-4xl font-semibold text-typography-50 mb-5">{expense.categoryName}</Text>
          <Text className="text-6xl font-bold text-typography-50 mb-2">{formatCurrency(expense.amount)}.00</Text>
          <View className="flex-row items-center">
            <Icon as={getIconByName('Calendar')} size="sm" className="text-typography-500 mr-2" />
            <Text className="text-base text-typography-400">{formattedDateTime}</Text>
          </View>
        </View>

        {/* Details Card */}
        <View className="rounded-2xl border border-outline-700 bg-background-900 p-5">
          {/* Note */}
          <View className="flex-row items-center py-4 border-b border-outline-800">
            <Icon as={FileText} size="md" className="text-typography-500 mr-3" />
            <Text className="text-base text-typography-400 w-16">Note</Text>
            <Text className="flex-1 text-base text-typography-100 text-right">{expense.title}</Text>
          </View>

          {/* Group */}
          <View className="flex-row items-center py-4">
            <Icon as={Users} size="md" className="text-typography-500 mr-3" />
            <Text className="text-base text-typography-400 w-16">Group</Text>
            <View className="flex-1 flex-row justify-end">
              <View className="rounded-full bg-background-700 px-4 py-1">
                <Text className="text-sm text-typography-200">Personal</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Spacer */}
        <View className="flex-1" />

        {/* Bottom Button */}
        <View className="mb-6">
          <Button 
            action="primary"
            size="xl" 
            className="w-full rounded-full bg-primary-500"
            onPress={handleEdit}
          >
            <Icon as={Pencil} size="sm" className="text-white mr-2" />
            <ButtonText className="text-white">Edit Expense</ButtonText>
          </Button>
        </View>
      </View>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Expense"
        description="Are you sure you want to delete this expense? This action cannot be undone."
        icon={Trash2}
        iconColor="text-error-400"
        iconBgColor="bg-error-500/20"
        cancelText="Cancel"
        confirmText="Delete"
        confirmButtonColor="bg-error-500"
      />
    </SafeAreaView>
  );
}
