import React from 'react';
import { View, Text, Pressable, PressableProps } from 'react-native';
import { Icon, CheckCircleIcon } from '@/src/components/ui/icon';
import type { LucideIcon } from 'lucide-react-native';

interface SelectionCardProps extends Omit<PressableProps, 'children'> {
  /** Icon component from lucide-react-native */
  icon: LucideIcon;
  /** Card label text */
  label: string;
  /** Optional description text */
  description?: string;
  /** Whether the card is selected */
  isSelected?: boolean;
  /** Selected state border color */
  selectedBorderColor?: string;
  /** Selected state background color */
  selectedBgColor?: string;
  /** Unselected state border color */
  unselectedBorderColor?: string;
  /** Unselected state background color */
  unselectedBgColor?: string;
  /** Icon size */
  iconSize?: 'sm' | 'md' | 'lg' | 'xl';
  /** Show checkmark when selected */
  showCheckmark?: boolean;
  /** Container className */
  className?: string;
}

export function SelectionCard({
  icon,
  label,
  description,
  isSelected = false,
  selectedBorderColor = 'border-primary-500',
  selectedBgColor = 'bg-primary-500/10',
  unselectedBorderColor = 'border-outline-600',
  unselectedBgColor = 'bg-background-900',
  iconSize = 'xl',
  showCheckmark = true,
  className = '',
  ...pressableProps
}: SelectionCardProps) {
  const borderColor = isSelected ? selectedBorderColor : unselectedBorderColor;
  const bgColor = isSelected ? selectedBgColor : unselectedBgColor;

  return (
    <Pressable
      {...pressableProps}
      className={`relative flex-1 items-center justify-center rounded-2xl border-2 p-6 ${borderColor} ${bgColor} ${className}`}
    >
      {/* Checkmark */}
      {showCheckmark && isSelected && (
        <View className="absolute right-2 top-2">
          <Icon as={CheckCircleIcon} size="sm" className="text-primary-500" />
        </View>
      )}

      {/* Icon container */}
      <View
        className={`mb-3 rounded-xl p-3 ${
          isSelected ? 'bg-primary-500/20' : 'bg-background-800'
        }`}
      >
        <Icon
          as={icon}
          size={iconSize}
          className={isSelected ? 'text-primary-500' : 'text-typography-400'}
        />
      </View>

      {/* Label */}
      <Text
        className={`text-center text-sm font-medium ${
          isSelected ? 'text-primary-400' : 'text-typography-300'
        }`}
      >
        {label}
      </Text>

      {/* Optional description */}
      {description && (
        <Text className="mt-1 text-center text-xs text-typography-500">
          {description}
        </Text>
      )}
    </Pressable>
  );
}
