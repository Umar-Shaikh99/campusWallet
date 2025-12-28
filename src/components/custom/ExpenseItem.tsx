import React from 'react';
import { View, Text, Pressable, PressableProps } from 'react-native';
import { Icon } from '@/src/components/ui/icon';

interface ExpenseItemProps extends Omit<PressableProps, 'children'> {
  /** Expense title */
  title: string;
  /** Date/time text */
  subtitle: string;
  /** Expense amount */
  amount: number;
  /** Icon component */
  icon: React.ComponentType<any>;
  /** Currency symbol */
  currencySymbol?: string;
  /** Icon background color class */
  iconBgColor?: string;
  /** Icon color class */
  iconColor?: string;
  /** Container className */
  className?: string;
}

export function ExpenseItem({
  title,
  subtitle,
  amount,
  icon,
  currencySymbol = '₹',
  iconBgColor = 'bg-background-800',
  iconColor = 'text-primary-400',
  className = '',
  ...pressableProps
}: ExpenseItemProps) {
  return (
    <Pressable
      {...pressableProps}
      className={`flex-row items-center bg-background-900 rounded-2xl p-4 ${className}`}
    >
      {/* Icon */}
      <View className={`w-12 h-12 items-center justify-center rounded-xl ${iconBgColor}`}>
        <Icon as={icon} size="md" className={iconColor} />
      </View>

      {/* Content */}
      <View className="flex-1 ml-3">
        <Text className="text-base font-medium text-typography-100">{title}</Text>
        <Text className="text-sm text-typography-500">{subtitle}</Text>
      </View>

      {/* Amount */}
      <Text className="text-base font-semibold text-typography-100">
        - {currencySymbol}{amount.toLocaleString('en-IN')}
      </Text>
    </Pressable>
  );
}
