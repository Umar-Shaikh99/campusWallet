import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@/src/components/ui/icon';
import { NumPad } from '@/src/components/custom';
import { ArrowLeft } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AddExpenseStackParamList } from '@/src/navigation/types';

type Props = NativeStackScreenProps<AddExpenseStackParamList, 'AddExpenseAmount'>;

export function AddExpenseAmountScreen({ navigation, route }: Props) {
  const [amount, setAmount] = useState('0');
  const { categoryId, categoryName, categoryIcon } = route.params;

  const handleKeyPress = (value: string) => {
    setAmount((prev) => {
      if (prev === '0') return value;
      if (prev.length >= 8) return prev; // Max 8 digits
      return prev + value;
    });
  };

  const handleDelete = () => {
    setAmount((prev) => {
      if (prev.length <= 1) return '0';
      return prev.slice(0, -1);
    });
  };

  const handleNext = () => {
    const numericAmount = parseInt(amount, 10);
    if (numericAmount > 0) {
      navigation.navigate('AddExpenseDetails', {
        amount: numericAmount,
        categoryId,
        categoryName,
        categoryIcon,
      });
    }
  };

  const displayAmount = `₹${parseInt(amount, 10).toLocaleString('en-IN')}`;

  return (
    <SafeAreaView className="flex-1 bg-background-950">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <Pressable onPress={() => navigation.goBack()} className="p-2">
          <Icon as={ArrowLeft} size="md" className="text-typography-300" />
        </Pressable>
        <Text className="text-lg font-semibold text-typography-50">Add Expense</Text>
        <Pressable 
          onPress={handleNext}
          disabled={amount === '0'}
          className="p-2"
        >
          <Text className={`text-base font-medium ${amount === '0' ? 'text-typography-600' : 'text-primary-400'}`}>
            Next
          </Text>
        </Pressable>
      </View>

      {/* Amount Display */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-5xl font-bold text-typography-50">{displayAmount}</Text>
        <Text className="text-base text-typography-500 mt-2">Enter amount</Text>
      </View>

      {/* NumPad */}
      <NumPad onPress={handleKeyPress} onDelete={handleDelete} />
    </SafeAreaView>
  );
}
