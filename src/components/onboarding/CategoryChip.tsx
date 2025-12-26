import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '@/src/components/ui/icon';
import * as LucideIcons from 'lucide-react-native';
import type { ExpenseCategory } from '@/src/types';

interface CategoryChipProps {
  category: ExpenseCategory;
}

// Helper to get icon component from string name
function getIconComponent(iconName: string) {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<any>>;
  return icons[iconName] || LucideIcons.Circle;
}

export function CategoryChip({ category }: CategoryChipProps) {
  const IconComponent = getIconComponent(category.icon);
  
  return (
    <View className="flex-row items-center gap-3 rounded-xl bg-background-800 px-4 py-3">
      <Icon as={IconComponent} size="sm" className="text-typography-400" />
      <Text className="text-sm font-medium text-typography-200">{category.name}</Text>
    </View>
  );
}
