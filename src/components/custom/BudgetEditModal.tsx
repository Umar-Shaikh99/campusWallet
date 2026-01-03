import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Pressable, TextInput } from 'react-native';
import { Button, ButtonText } from '@/src/components/ui/button';
import { BUDGET_PRESETS } from '@/src/types';

interface BudgetEditModalProps {
  /** Whether the modal is visible */
  isOpen: boolean;
  /** Current budget value */
  currentBudget: number;
  /** Callback when modal should close */
  onClose: () => void;
  /** Callback when budget is saved */
  onSave: (newBudget: number) => void;
}

export function BudgetEditModal({
  isOpen,
  currentBudget,
  onClose,
  onSave,
}: BudgetEditModalProps) {
  const [budget, setBudget] = useState(currentBudget);

  // Reset budget to current value when modal opens
  useEffect(() => {
    if (isOpen) {
      setBudget(currentBudget);
    }
  }, [isOpen, currentBudget]);

  const handleTextChange = (text: string) => {
    const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10) || 0;
    setBudget(numericValue);
  };

  const handleSave = () => {
    onSave(budget);
  };

  const formatPreset = (value: number) => `₹${value.toLocaleString('en-IN')}`;

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable 
        className="flex-1 items-center justify-center bg-black/60 px-6"
        onPress={onClose}
      >
        <Pressable 
          className="w-full bg-background-900 rounded-2xl p-6"
          onPress={(e) => e.stopPropagation()}
        >
          {/* Title */}
          <Text className="text-xl font-bold text-typography-50 text-center mb-1">
            Monthly Budget
          </Text>
          <Text className="text-sm text-typography-400 text-center mb-6">
            Set your monthly spending limit
          </Text>

          {/* Amount Input */}
          <View className="flex-row items-center rounded-xl border-2 border-primary-500 bg-background-800 px-4 py-4 mb-4">
            <Text className="text-3xl font-bold text-typography-50 mr-2">₹</Text>
            <TextInput
              value={budget > 0 ? budget.toLocaleString('en-IN') : ''}
              onChangeText={handleTextChange}
              placeholder="0"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              className="flex-1 text-3xl font-bold text-typography-50 text-center"
            />
          </View>

          {/* Preset Chips */}
          <View className="flex-row justify-center gap-2 mb-6">
            {BUDGET_PRESETS.map((preset) => {
              const isSelected = budget === preset;
              return (
                <Pressable
                  key={preset}
                  onPress={() => setBudget(preset)}
                  className={`rounded-full px-4 py-2 ${
                    isSelected
                      ? 'bg-primary-500'
                      : 'bg-background-800'
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      isSelected ? 'text-white' : 'text-typography-300'
                    }`}
                  >
                    {formatPreset(preset)}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Buttons */}
          <View className="flex-row gap-3">
            <Pressable 
              className="flex-1 items-center py-4"
              onPress={onClose}
            >
              <Text className="text-base font-medium text-typography-400">Cancel</Text>
            </Pressable>
            <Button
              size="lg"
              className="flex-1 rounded-full bg-primary-500"
              onPress={handleSave}
            >
              <ButtonText className="text-white font-semibold">Save</ButtonText>
            </Button>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
