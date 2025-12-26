import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { BUDGET_PRESETS } from '@/src/types';

interface BudgetInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function BudgetInput({ value, onChange }: BudgetInputProps) {
  const handleTextChange = (text: string) => {
    const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10) || 0;
    onChange(numericValue);
  };

  return (
    <View className="gap-4">
      {/* Large budget input */}
      <View className="flex-row items-center rounded-2xl border-2 border-primary-500 bg-background-900 px-6 py-5">
        <View className="mr-4 rounded-lg bg-primary-500/20 px-3 py-2">
          <Text className="text-xl font-bold text-primary-400">₹</Text>
        </View>
        <TextInput
          value={value > 0 ? value.toString() : ''}
          onChangeText={handleTextChange}
          placeholder="0"
          placeholderTextColor="#64748b"
          keyboardType="numeric"
          className="flex-1 text-center text-4xl font-bold text-typography-100"
        />
      </View>
      
      <Text className="text-center text-sm text-typography-500">
        Enter your total monthly spending allowance
      </Text>
      
      {/* Preset chips */}
      <View className="flex-row justify-center gap-3">
        {BUDGET_PRESETS.map((preset) => {
          const isSelected = value === preset;
          return (
            <Pressable
              key={preset}
              onPress={() => onChange(preset)}
              className={`rounded-full px-5 py-3 ${
                isSelected 
                  ? 'bg-primary-500' 
                  : 'bg-background-800 border border-outline-600'
              }`}
            >
              <Text className={`text-sm font-semibold ${
                isSelected ? 'text-white' : 'text-typography-300'
              }`}>
                ₹{preset.toLocaleString('en-IN')}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
