import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { Icon } from '@/src/components/ui/icon';
import type { LucideIcon } from 'lucide-react-native';

interface InputFieldProps extends Omit<TextInputProps, 'className'> {
  /** Label text above input */
  label?: string;
  /** Left icon */
  icon?: LucideIcon | React.ComponentType<any>;
  /** Right element */
  rightElement?: React.ReactNode;
  /** Container className */
  className?: string;
  /** Input className */
  inputClassName?: string;
}

export function InputField({
  label,
  icon,
  rightElement,
  className = '',
  inputClassName = '',
  ...inputProps
}: InputFieldProps) {
  return (
    <View className={className}>
      {label && (
        <Text className="text-sm font-medium text-typography-300 mb-2">{label}</Text>
      )}
      <View className="flex-row items-center rounded-xl border border-outline-700 bg-background-900 px-4 py-4">
        {icon && (
          <Icon as={icon} size="md" className="text-typography-500 mr-3" />
        )}
        <TextInput
          placeholderTextColor="#64748b"
          className={`flex-1 text-base text-typography-100 ${inputClassName}`}
          {...inputProps}
        />
        {rightElement}
      </View>
    </View>
  );
}
