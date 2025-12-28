import React from 'react';
import { View, Text, Pressable, PressableProps } from 'react-native';
import { Icon } from '@/src/components/ui/icon';

interface QuickAddButtonProps extends Omit<PressableProps, 'children'> {
  /** Icon component */
  icon: React.ComponentType<any>;
  /** Button label */
  label: string;
  /** Icon background color class */
  iconBgColor?: string;
  /** Icon color class */
  iconColor?: string;
  /** Whether this is a dashed border button (for "More") */
  isDashed?: boolean;
  /** Container className */
  className?: string;
}

export function QuickAddButton({
  icon,
  label,
  iconBgColor = 'bg-primary-500/20',
  iconColor = 'text-primary-400',
  isDashed = false,
  className = '',
  ...pressableProps
}: QuickAddButtonProps) {
  return (
    <Pressable
      {...pressableProps}
      className={`items-center rounded-2xl bg-background-900 border ${
        isDashed ? 'border-dashed border-outline-600' : 'border-outline-700'
      } py-4 px-2 ${className}`}
    >
      <View className={`w-14 h-14 items-center justify-center rounded-full ${iconBgColor} mb-3`}>
        <Icon as={icon} size="lg" className={iconColor} />
      </View>
      <Text className="text-sm text-typography-300 text-center">{label}</Text>
    </Pressable>
  );
}
