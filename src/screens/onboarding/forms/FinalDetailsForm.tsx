import React from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import type { FinalDetailsFormData } from '@/src/app/schema';

const BUDGET_PRESETS = [500, 1000, 2000];

interface FinalDetailsFormProps {
  control: Control<FinalDetailsFormData>;
  errors: FieldErrors<FinalDetailsFormData>;
  budgetAmount: string;
  onPresetSelect: (amount: number) => void;
}

export function FinalDetailsForm({
  control,
  errors,
  budgetAmount,
  onPresetSelect,
}: FinalDetailsFormProps) {
  const selectedPreset = BUDGET_PRESETS.includes(parseInt(budgetAmount, 10))
    ? parseInt(budgetAmount, 10)
    : null;

  return (
    <View>
      {/* Display Name Input */}
      <View className="mb-6">
        <Text className="text-xs text-typography-500 font-inter-semibold tracking-wider mb-3 uppercase">
          Display Name <Text className="text-error-500">*</Text>
        </Text>
        <Controller
          control={control}
          name="displayName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Enter your name"
              placeholderTextColor="#94a3b8"
              className={`bg-background-0 border rounded-xl px-4 py-4 text-base text-typography-900 font-body ${
                errors.displayName ? 'border-error-500' : 'border-outline-200'
              }`}
            />
          )}
        />
        {errors.displayName && (
          <Text className="text-xs text-error-500 font-body mt-2">
            {errors.displayName.message}
          </Text>
        )}
      </View>

      {/* College/University Input */}
      <View className="mb-8">
        <Text className="text-xs text-typography-500 font-inter-semibold tracking-wider mb-3 uppercase">
          College / University <Text className="text-error-500">*</Text>
        </Text>
        <Controller
          control={control}
          name="collegeName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Enter your college or university"
              placeholderTextColor="#94a3b8"
              className={`bg-background-0 border rounded-xl px-4 py-4 text-base text-typography-900 font-body ${
                errors.collegeName ? 'border-error-500' : 'border-outline-200'
              }`}
            />
          )}
        />
        {errors.collegeName && (
          <Text className="text-xs text-error-500 font-body mt-2">
            {errors.collegeName.message}
          </Text>
        )}
      </View>

      {/* Monthly Budget */}
      <View className="mb-4">
        <Text className="text-xs text-typography-500 font-inter-semibold tracking-wider mb-3 uppercase">
          Monthly Budget Limit <Text className="text-error-500">*</Text>
        </Text>
        
        {/* Preset chips */}
        <View className="flex-row gap-3 mb-4">
          {BUDGET_PRESETS.map((amount) => (
            <Pressable
              key={amount}
              onPress={() => onPresetSelect(amount)}
              className={`rounded-xl px-4 py-3 border ${
                selectedPreset === amount
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-outline-200 bg-background-0'
              }`}
            >
              <Text
                className={`text-sm font-inter-medium ${
                  selectedPreset === amount
                    ? 'text-primary-600'
                    : 'text-typography-700'
                }`}
              >
                ₹{amount}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Budget amount input */}
        <Controller
          control={control}
          name="budgetAmount"
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              className={`flex-row items-center bg-background-0 border rounded-xl px-4 py-4 ${
                errors.budgetAmount ? 'border-error-500' : 'border-outline-200'
              }`}
            >
              <Text className="text-base text-typography-400 font-body mr-2">₹</Text>
              <TextInput
                value={value}
                onChangeText={(text) => {
                  const numericValue = text.replace(/[^0-9]/g, '');
                  onChange(numericValue);
                }}
                onBlur={onBlur}
                placeholder="Enter amount"
                placeholderTextColor="#94a3b8"
                keyboardType="numeric"
                className="flex-1 text-base text-typography-900 font-body"
              />
            </View>
          )}
        />
        {errors.budgetAmount && (
          <Text className="text-xs text-error-500 font-body mt-2">
            {errors.budgetAmount.message}
          </Text>
        )}
      </View>
    </View>
  );
}
