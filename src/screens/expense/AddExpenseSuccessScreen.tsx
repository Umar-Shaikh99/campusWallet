import React, { useEffect, useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@/src/components/ui/icon';
import { Button, ButtonText } from '@/src/components/ui/button';
import { getIconByName, formatCurrency } from '@/src/utils';
import { Check } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AddExpenseStackParamList } from '@/src/navigation/types';

type Props = NativeStackScreenProps<AddExpenseStackParamList, 'AddExpenseSuccess'>;

export function AddExpenseSuccessScreen({ navigation, route }: Props) {
  const { amount, categoryName, categoryIcon, note, date } = route.params;
  const [countdown, setCountdown] = useState(3);

  const expenseDate = new Date(date);
  const formattedDate = expenseDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = expenseDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const handleDone = useCallback(() => {
    navigation.getParent()?.goBack();
  }, [navigation]);

  const handleAddAnother = useCallback(() => {
    navigation.popToTop();
  }, [navigation]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Navigate when countdown reaches 0
  useEffect(() => {
    if (countdown <= 0) {
      handleDone();
    }
  }, [countdown, handleDone]);

  return (
    <SafeAreaView className="flex-1 bg-background-950">
      <View className="flex-1 px-5 py-4 items-center justify-center">
        {/* Success Icon */}
        <View className="w-24 h-24 rounded-full border-4 border-success-500 items-center justify-center mb-6">
          <Icon as={Check} size="xl" className="text-success-500" />
        </View>

        <Text className="text-2xl font-bold text-typography-50 mb-2">Expense Added!</Text>
        <Text className="text-base text-typography-500 mb-8">Your transaction has been recorded.</Text>

        {/* Summary Card */}
        <View className="w-full rounded-2xl border border-outline-700 bg-background-900 p-5">
          {/* Amount */}
          <View className="items-center mb-4 pb-4 border-b border-outline-800">
            <Text className="text-xs text-typography-500 uppercase tracking-wider mb-1">AMOUNT</Text>
            <Text className="text-3xl font-bold text-primary-400">{formatCurrency(amount)}</Text>
          </View>

          {/* Details */}
          <View className="gap-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-typography-500">Category</Text>
              <View className="flex-row items-center">
                <Icon as={getIconByName(categoryIcon)} size="sm" className="text-typography-300 mr-2" />
                <Text className="text-sm text-typography-100">{categoryName}</Text>
              </View>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-typography-500">Date</Text>
              <Text className="text-sm text-typography-100">{formattedDate}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-typography-500">Time</Text>
              <Text className="text-sm text-typography-100">{formattedTime}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-typography-500">Note</Text>
              <Text className="text-sm text-typography-100">{note}</Text>
            </View>
          </View>
        </View>

        {/* Spacer */}
        <View className="flex-1" />

        {/* Bottom Buttons */}
        <View className="w-full flex-row gap-3 mb-4">
          <Button 
            size="xl" 
            className="flex-1 rounded-full bg-secondary-600"
            onPress={handleAddAnother}
          >
            <ButtonText className="text-white">Add Another</ButtonText>
          </Button>
          <Button 
            action="primary"
            size="xl" 
            className="flex-1 rounded-full bg-primary-500"
            onPress={handleDone}
          >
            <ButtonText className="text-white">Done</ButtonText>
          </Button>
        </View>

        <Text className="text-sm text-typography-600">
          Returning to home in {Math.max(countdown, 0)}...
        </Text>
      </View>
    </SafeAreaView>
  );
}
