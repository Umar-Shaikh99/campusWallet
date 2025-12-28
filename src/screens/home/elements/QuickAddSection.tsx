import React from 'react';
import { View, Text } from 'react-native';
import { QuickAddButton } from '@/src/components/custom';
import { getIconByName } from '@/src/utils';
import { Plus } from 'lucide-react-native';
import type { ExpenseCategory } from '@/src/types';

// Define colors for each category index for variety
const CATEGORY_COLORS = [
  { bg: 'bg-primary-500/20', icon: 'text-primary-400' },      // Blue
  { bg: 'bg-warning-500/20', icon: 'text-warning-400' },      // Orange
  { bg: 'bg-success-500/20', icon: 'text-success-400' },      // Green
  { bg: 'bg-secondary-500/20', icon: 'text-secondary-400' },  // Purple
  { bg: 'bg-error-400/20', icon: 'text-error-400' },          // Pink/Red
];

interface QuickAddSectionProps {
  categories: ExpenseCategory[];
  maxVisible?: number;
  onCategoryPress: (category: ExpenseCategory) => void;
  onMorePress?: () => void;
}

export function QuickAddSection({
  categories,
  maxVisible = 5,
  onCategoryPress,
  onMorePress,
}: QuickAddSectionProps) {
  const visibleCategories = categories.slice(0, maxVisible);

  return (
    <View className="mb-6">
      <Text className="text-lg font-bold text-typography-50 mb-4">Quick Add</Text>
      <View className="flex-row flex-wrap justify-between">
        {visibleCategories.map((category, index) => {
          const colorSet = CATEGORY_COLORS[index % CATEGORY_COLORS.length];
          return (
            <View key={category.id} className="w-[31%] mb-3">
              <QuickAddButton
                icon={getIconByName(category.icon)}
                label={category.name}
                iconBgColor={colorSet.bg}
                iconColor={colorSet.icon}
                onPress={() => onCategoryPress(category)}
              />
            </View>
          );
        })}
        <View className="w-[31%] mb-3">
          <QuickAddButton
            icon={Plus}
            label="More"
            iconBgColor="bg-background-700"
            iconColor="text-typography-400"
            isDashed
            onPress={onMorePress}
          />
        </View>
      </View>
    </View>
  );
}
