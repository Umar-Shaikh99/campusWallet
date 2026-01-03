import React from 'react';
import { View, Text, TextInput, Pressable, TextInputProps } from 'react-native';

interface AmountInputProps {
  /** Current value */
  value: number;
  /** Change handler */
  onChange: (value: number) => void;
  /** Currency symbol */
  currencySymbol?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text below input */
  helperText?: string;
  /** Preset amounts for quick selection */
  presets?: number[];
  /** Format preset labels (e.g., add currency symbol) */
  formatPreset?: (value: number) => string;
  /** Container className */
  className?: string;
  /** Input props */
  inputProps?: Omit<TextInputProps, 'value' | 'onChangeText'>;
}

export function AmountInput({
  value,
  onChange,
  currencySymbol = '₹',
  placeholder = '0',
  helperText,
  presets = [],
  formatPreset = (val) => `₹${val.toLocaleString('en-IN')}`,
  className = '',
  inputProps,
}: AmountInputProps) {
  const handleTextChange = (text: string) => {
    const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10) || 0;
    onChange(numericValue);
  };

  return (
    <View className={`gap-4 ${className}`}>
      {/* Input field */}
      <View className="flex-row items-center rounded-2xl border-2 border-primary-600 bg-background-0 px-6 py-5">
        <View className="mr-4 rounded-lg bg-primary-100 px-3 py-2">
          <Text className="text-xl text-primary-600 font-montserrat-bold">
            {currencySymbol}
          </Text>
        </View>
        <TextInput
          value={value > 0 ? value.toString() : ''}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          keyboardType="numeric"
          className="flex-1 text-center text-4xl text-typography-900 font-montserrat-bold"
          {...inputProps}
        />
      </View>

      {/* Helper text */}
      {helperText && (
        <Text className="text-center text-sm text-typography-500 font-body">
          {helperText}
        </Text>
      )}

      {/* Preset chips */}
      {presets.length > 0 && (
        <View className="flex-row justify-center gap-3">
          {presets.map((preset) => {
            const isSelected = value === preset;
            return (
              <Pressable
                key={preset}
                onPress={() => onChange(preset)}
                className={`rounded-full px-5 py-3 ${
                  isSelected
                    ? 'bg-primary-600'
                    : 'border border-outline-200 bg-background-0'
                }`}
              >
                <Text
                  className={`text-sm font-inter-semibold ${
                    isSelected ? 'text-white' : 'text-typography-700'
                  }`}
                >
                  {formatPreset(preset)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}
