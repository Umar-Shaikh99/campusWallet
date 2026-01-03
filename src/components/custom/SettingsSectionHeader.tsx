import React from 'react';
import { Text } from 'react-native';

interface SettingsSectionHeaderProps {
  /** Section title */
  title: string;
}

export function SettingsSectionHeader({ title }: SettingsSectionHeaderProps) {
  return (
    <Text className="text-sm font-medium text-typography-500 mb-2 mt-6">
      {title}
    </Text>
  );
}
