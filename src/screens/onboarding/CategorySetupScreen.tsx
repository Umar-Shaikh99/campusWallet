import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Icon } from '@/src/components/ui/icon';
import { ArrowLeft, Check } from 'lucide-react-native';
import { useOnboardingStore } from '@/src/app/stores/useOnboardingStore';
import { getIconByName } from '@/src/utils';
import { HOSTEL_CATEGORIES, HOME_CATEGORIES } from '@/src/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '@/src/navigation/types';
import type { ExpenseCategory } from '@/src/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'CategorySetup'>;

// Pre-selected categories for each living type
const HOSTEL_PRESELECTED = ['canteen', 'mess', 'auto-metro', 'mobile-recharge'];
const HOME_PRESELECTED = ['food', 'transport', 'education', 'mobile-recharge'];

function CategoryChip({
  category,
  isSelected,
  onPress,
}: {
  category: ExpenseCategory;
  isSelected: boolean;
  onPress: () => void;
}) {
  const IconComponent = getIconByName(category.icon);
  
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center rounded-xl px-4 py-3 mr-3 mb-3 border ${
        isSelected
          ? 'border-primary-600 bg-primary-50'
          : 'border-outline-200 bg-background-0'
      }`}
    >
      <View
        className={`h-8 w-8 items-center justify-center rounded-lg mr-2 ${
          isSelected ? 'bg-primary-100' : 'bg-background-100'
        }`}
      >
        <Icon
          as={IconComponent}
          size="sm"
          className={isSelected ? 'text-primary-600' : 'text-typography-500'}
        />
      </View>
      <Text
        className={`text-sm font-inter-medium ${
          isSelected ? 'text-primary-600' : 'text-typography-700'
        }`}
      >
        {category.name}
      </Text>
      {isSelected && (
        <Icon as={Check} size="xs" className="text-primary-600 ml-2" />
      )}
    </Pressable>
  );
}

export function CategorySetupScreen({ navigation }: Props) {
  const { onboardingData, setCategories } = useOnboardingStore();
  
  // Get available categories based on living type
  const availableCategories = onboardingData.livingType === 'hostel' 
    ? HOSTEL_CATEGORIES 
    : HOME_CATEGORIES;
  
  const preselectedIds = onboardingData.livingType === 'hostel' 
    ? HOSTEL_PRESELECTED 
    : HOME_PRESELECTED;
  
  // Local state for selected category IDs
  const [selectedIds, setSelectedIds] = useState<string[]>(preselectedIds);

  // Initialize with preselected categories on mount
  useEffect(() => {
    const preselected = availableCategories.filter(cat => preselectedIds.includes(cat.id));
    setCategories(preselected);
  }, []);

  const handleToggleCategory = (categoryId: string) => {
    let newSelectedIds: string[];
    
    if (selectedIds.includes(categoryId)) {
      newSelectedIds = selectedIds.filter(id => id !== categoryId);
    } else {
      newSelectedIds = [...selectedIds, categoryId];
    }
    
    setSelectedIds(newSelectedIds);
    
    // Update store with selected categories
    const selected = availableCategories.filter(cat => newSelectedIds.includes(cat.id));
    setCategories(selected);
  };

  const handleApprove = () => {
    navigation.navigate('FinalDetails');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const livingTypeLabel = onboardingData.livingType === 'hostel' ? 'hostel' : 'home';
  const MIN_CATEGORIES = 3;
  const isValidSelection = selectedIds.length >= MIN_CATEGORIES;

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <View className="flex-1 px-6 pt-4">
        {/* Header */}
        <Pressable onPress={handleBack} className="p-2 -ml-2 mb-4">
          <Icon as={ArrowLeft} size="md" className="text-typography-600" />
        </Pressable>

        {/* Title */}
        <Text className="text-2xl text-typography-900 font-heading mb-2">
          Category Setup
        </Text>
        <Text className="text-base text-typography-500 font-body mb-8">
          Suggested categories based on your <Text className="text-primary-600 font-inter-medium">{livingTypeLabel}</Text> profile.
        </Text>

        {/* Category chips grid */}
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="flex-row flex-wrap">
            {availableCategories.map((category) => (
              <CategoryChip
                key={category.id}
                category={category}
                isSelected={selectedIds.includes(category.id)}
                onPress={() => handleToggleCategory(category.id)}
              />
            ))}
          </View>
        </ScrollView>

        {/* Bottom buttons */}
        <View className="pt-4 pb-2">
          {/* Validation message */}
          {!isValidSelection && (
            <Text className="text-center text-sm text-error-500 font-body mb-3">
              Please select at least {MIN_CATEGORIES} categories ({selectedIds.length}/{MIN_CATEGORIES} selected)
            </Text>
          )}

          <Button
            size="xl"
            action="primary"
            className={`w-full rounded-2xl mb-3 ${isValidSelection ? 'bg-primary-600' : 'bg-primary-300'}`}
            onPress={handleApprove}
            disabled={!isValidSelection}
          >
            <ButtonText className="text-lg text-white font-inter-semibold">
              Approve Categories
            </ButtonText>
          </Button>

          <Pressable onPress={handleBack} className="py-3">
            <Text className="text-center text-base text-typography-500 font-body">
              Go Back
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
