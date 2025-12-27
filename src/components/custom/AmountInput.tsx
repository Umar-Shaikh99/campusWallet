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
      <View className="flex-row items-center rounded-2xl border-2 border-primary-500 bg-background-900 px-6 py-5">
        <View className="mr-4 rounded-lg bg-primary-500/20 px-3 py-2">
          <Text className="text-xl font-bold text-primary-400">
            {currencySymbol}
          </Text>
        </View>
        <TextInput
          value={value > 0 ? value.toString() : ''}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          placeholderTextColor="#64748b"
          keyboardType="numeric"
          className="flex-1 text-center text-4xl font-bold text-typography-100"
          {...inputProps}
        />
      </View>

      {/* Helper text */}
      {helperText && (
        <Text className="text-center text-sm text-typography-500">
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
                    ? 'bg-primary-500'
                    : 'border border-outline-600 bg-background-800'
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    isSelected ? 'text-white' : 'text-typography-300'
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
