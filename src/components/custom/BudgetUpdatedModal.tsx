import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Icon } from '@/src/components/ui/icon';
import { Check } from 'lucide-react-native';
import { formatCurrency } from '@/src/utils';

interface BudgetUpdatedModalProps {
  /** Whether the modal is visible */
  isOpen: boolean;
  /** The new budget amount */
  newBudget: number;
  /** Callback when Done is pressed */
  onDone: () => void;
}

export function BudgetUpdatedModal({
  isOpen,
  newBudget,
  onDone,
}: BudgetUpdatedModalProps) {
  return (
    <Modal
      visible={isOpen}
      transparent={false}
      animationType="fade"
      onRequestClose={onDone}
    >
      <View className="flex-1 bg-background-950 items-center justify-center px-6">
        {/* Success Icon */}
        <View className="w-28 h-28 rounded-full bg-success-500/20 items-center justify-center mb-8">
          <Icon as={Check} size="xl" className="text-success-400" style={{ width: 48, height: 48 }} />
        </View>

        {/* Title */}
        <Text className="text-2xl font-bold text-typography-50 mb-4">
          Budget Updated
        </Text>

        {/* Amount */}
        <Text className="text-5xl font-bold text-typography-50 mb-2">
          {formatCurrency(newBudget)}
        </Text>

        {/* Subtitle */}
        <Text className="text-base text-typography-400">
          New Monthly Limit
        </Text>

        {/* Bottom Done Button */}
        <View className="absolute bottom-10 left-6 right-6">
          <Button
            size="xl"
            className="w-full rounded-full bg-primary-500"
            onPress={onDone}
          >
            <ButtonText className="text-lg font-semibold text-white">Done</ButtonText>
          </Button>
        </View>
      </View>
    </Modal>
  );
}
