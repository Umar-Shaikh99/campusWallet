import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Icon } from '@/src/components/ui/icon';
import { ChevronRight } from 'lucide-react-native';

interface SettingsItemProps {
  /** Main label text */
  label: string;
  /** Optional value displayed on the right */
  value?: string;
  /** Optional subtitle below the label */
  subtitle?: string;
  /** Press handler */
  onPress?: () => void;
  /** Visual variant - danger shows red text */
  variant?: 'default' | 'danger';
  /** Whether to show the chevron */
  showChevron?: boolean;
}

export function SettingsItem({
  label,
  value,
  subtitle,
  onPress,
  variant = 'default',
  showChevron = true,
}: SettingsItemProps) {
  const labelColor = variant === 'danger' ? 'text-error-400' : 'text-typography-50';

  return (
    <Pressable
      className="flex-row items-center justify-between bg-background-900 px-4 py-6 active:opacity-80"
      onPress={onPress}
    >
      <View className="flex-1">
        <Text className={`text-base font-medium ${labelColor}`}>{label}</Text>
        {subtitle && (
          <Text className="text-sm text-typography-500 mt-0.5">{subtitle}</Text>
        )}
      </View>
      <View className="flex-row items-center">
        {value && (
          <Text className="text-base text-typography-400 mr-2">{value}</Text>
        )}
        {showChevron && (
          <Icon as={ChevronRight} size="sm" className="text-typography-600" />
        )}
      </View>
    </Pressable>
  );
}
