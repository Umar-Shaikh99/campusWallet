import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@/src/components/ui/icon';
import { ArrowLeft } from 'lucide-react-native';
import { getIconByName, formatCurrency } from '@/src/utils';
import { useOnboardingStore } from '@/src/app/stores/useOnboardingStore';
import { useExpenseStore } from '@/src/app/stores/useExpenseStore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/src/navigation/types';
import type { ExpenseCategory } from '@/src/types';

type Props = NativeStackScreenProps<RootStackParamList, 'CategoriesList'>;

interface CategoryCardProps {
  category: ExpenseCategory;
  expenseCount: number;
  totalAmount: number;
  onPress: () => void;
}

function CategoryCard({ category, expenseCount, totalAmount, onPress }: CategoryCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-background-900 rounded-2xl p-4 mb-3"
    >
      <View className="flex-row items-center">
        {/* Icon */}
        <View className="w-14 h-14 rounded-xl bg-primary-500/20 items-center justify-center">
          <Icon as={getIconByName(category.icon)} size="lg" className="text-primary-400" />
        </View>

        {/* Content */}
        <View className="flex-1 ml-4">
          <Text className="text-lg font-semibold text-typography-50 mb-1">
            {category.name}
          </Text>
          <View className="flex-row items-center">
            <View className="bg-background-800 rounded-full px-2 py-0.5">
              <Text className="text-xs text-typography-400">
                {expenseCount} {expenseCount === 1 ? 'expense' : 'expenses'}
              </Text>
            </View>
          </View>
        </View>

        {/* Amount */}
        <View className="items-end">
          <Text className="text-lg font-bold text-typography-50">
            {formatCurrency(totalAmount)}
          </Text>
          <Text className="text-xs text-typography-500">this month</Text>
        </View>
      </View>
    </Pressable>
  );
}

export function CategoriesListScreen({ navigation }: Props) {
  const { onboardingData } = useOnboardingStore();
  const { getCategoryTotal, getCategoryExpenseCount } = useExpenseStore();
  
  const categories = onboardingData.selectedCategories;

  const handleCategoryPress = (category: ExpenseCategory) => {
    navigation.navigate('CategoryExpenses', {
      categoryId: category.id,
      categoryName: category.name,
      categoryIcon: category.icon,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background-950">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3">
        <Pressable onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Icon as={ArrowLeft} size="md" className="text-typography-300" />
        </Pressable>
        <Text className="text-xl font-bold text-typography-50 ml-2">
          Expenses by Category
        </Text>
      </View>

      <ScrollView 
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Category Cards */}
        <View className="mt-4">
          {categories.map((category) => {
            const expenseCount = getCategoryExpenseCount(category.id);
            const totalAmount = getCategoryTotal(category.id);
            
            return (
              <CategoryCard
                key={category.id}
                category={category}
                expenseCount={expenseCount}
                totalAmount={totalAmount}
                onPress={() => handleCategoryPress(category)}
              />
            );
          })}
        </View>

        {/* Empty State */}
        {categories.length === 0 && (
          <View className="items-center py-12">
            <Text className="text-typography-400 text-center">
              No categories found.
            </Text>
            <Text className="text-typography-500 text-sm text-center mt-1">
              Add categories in your profile settings.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
