import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Switch, Alert, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@/src/components/ui/icon';
import { Button, ButtonText } from '@/src/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react-native';
import { useOnboardingStore } from '@/src/app/stores/useOnboardingStore';
import { getIconByName } from '@/src/utils';
import type { ExpenseCategory } from '@/src/types';
import { HOSTEL_CATEGORIES, HOME_CATEGORIES } from '@/src/types';

interface CategoryItemProps {
  category: ExpenseCategory;
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

function CategoryItem({ category, isEnabled, onToggle }: CategoryItemProps) {
  const CategoryIcon = getIconByName(category.icon);

  return (
    <View 
      className={`flex-row items-center justify-between rounded-xl px-4 py-4 mb-3 ${
        isEnabled ? 'bg-background-900' : 'bg-background-900/50'
      }`}
    >
      <View className="flex-row items-center flex-1">
        <View 
          className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
            isEnabled ? 'bg-primary-500/20' : 'bg-background-800'
          }`}
        >
          <Icon 
            as={CategoryIcon} 
            size="sm" 
            className={isEnabled ? 'text-primary-400' : 'text-typography-600'} 
          />
        </View>
        <Text 
          className={`text-base font-medium ${
            isEnabled ? 'text-typography-50' : 'text-typography-500'
          }`}
        >
          {category.name}
        </Text>
      </View>
      <Switch
        value={isEnabled}
        onValueChange={onToggle}
        trackColor={{ false: '#374151', true: '#3b82f6' }}
        thumbColor={isEnabled ? '#ffffff' : '#9ca3af'}
      />
    </View>
  );
}

export function ManageCategoriesScreen() {
  const navigation = useNavigation();
  const { onboardingData, setCategories } = useOnboardingStore();
  
  // Get all available categories based on living type
  const allCategories = onboardingData.livingType === 'hostel' 
    ? HOSTEL_CATEGORIES 
    : HOME_CATEGORIES;
  
  // Track which categories are enabled
  const [enabledCategoryIds, setEnabledCategoryIds] = useState<Set<string>>(
    new Set(onboardingData.selectedCategories.map(c => c.id))
  );
  
  // Custom categories (added by user)
  const [customCategories, setCustomCategories] = useState<ExpenseCategory[]>([]);
  
  // Add category modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleToggleCategory = (categoryId: string, enabled: boolean) => {
    const newEnabledIds = new Set(enabledCategoryIds);
    
    if (enabled) {
      newEnabledIds.add(categoryId);
    } else {
      // Ensure at least one category remains enabled
      if (newEnabledIds.size <= 1) {
        Alert.alert('Cannot Disable', 'You must have at least one category enabled.');
        return;
      }
      newEnabledIds.delete(categoryId);
    }
    
    setEnabledCategoryIds(newEnabledIds);
    
    // Update store with enabled categories
    const allCats = [...allCategories, ...customCategories];
    const newSelectedCategories = allCats.filter(c => newEnabledIds.has(c.id));
    setCategories(newSelectedCategories);
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      Alert.alert('Invalid Name', 'Please enter a category name.');
      return;
    }
    
    const newCategory: ExpenseCategory = {
      id: `custom-${Date.now()}`,
      name: newCategoryName.trim(),
      icon: 'Tag',
    };
    
    setCustomCategories(prev => [...prev, newCategory]);
    setEnabledCategoryIds(prev => new Set([...prev, newCategory.id]));
    
    // Update store with new category
    const allCats = [...allCategories, ...customCategories, newCategory];
    const newSelectedCategories = allCats.filter(c => 
      enabledCategoryIds.has(c.id) || c.id === newCategory.id
    );
    setCategories(newSelectedCategories);
    
    setNewCategoryName('');
    setShowAddModal(false);
  };

  // Combine default and custom categories
  const allCategoriesWithCustom = [...allCategories, ...customCategories];

  return (
    <SafeAreaView className="flex-1 bg-background-950">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3">
        <Pressable onPress={() => navigation.goBack()} className="p-2 -ml-2">
          <Icon as={ArrowLeft} size="md" className="text-typography-300" />
        </Pressable>
        <Text className="flex-1 text-xl font-bold text-typography-50 text-center mr-8">
          Manage Categories
        </Text>
      </View>

      {/* Subtitle */}
      <Text className="text-sm text-typography-500 px-5 mb-4">
        Toggle categories on/off for your expense tracking.
      </Text>

      {/* Categories List */}
      <ScrollView 
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {allCategoriesWithCustom.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            isEnabled={enabledCategoryIds.has(category.id)}
            onToggle={(enabled) => handleToggleCategory(category.id, enabled)}
          />
        ))}
      </ScrollView>

      {/* Add Category Button */}
      <View className="absolute bottom-8 left-5 right-5">
        <Button
          size="xl"
          className="w-full rounded-full bg-primary-500"
          onPress={() => setShowAddModal(true)}
        >
          <Icon as={Plus} size="sm" className="text-white mr-2" />
          <ButtonText className="text-lg font-semibold text-white">Add New Category</ButtonText>
        </Button>
      </View>

      {/* Add Category Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddModal(false)}
      >
        <Pressable 
          className="flex-1 items-center justify-center bg-black/60 px-6"
          onPress={() => setShowAddModal(false)}
        >
          <Pressable 
            className="w-full bg-background-900 rounded-2xl p-6"
            onPress={(e) => e.stopPropagation()}
          >
            <Text className="text-xl font-bold text-typography-50 text-center mb-6">
              Add New Category
            </Text>
            
            <TextInput
              value={newCategoryName}
              onChangeText={setNewCategoryName}
              placeholder="Category name"
              placeholderTextColor="#64748b"
              className="bg-background-800 rounded-xl px-4 py-4 text-base text-typography-50 mb-6"
              autoFocus
            />

            <View className="flex-row gap-3">
              <Pressable 
                className="flex-1 items-center py-4"
                onPress={() => setShowAddModal(false)}
              >
                <Text className="text-base font-medium text-typography-400">Cancel</Text>
              </Pressable>
              <Button
                size="lg"
                className="flex-1 rounded-full bg-primary-500"
                onPress={handleAddCategory}
              >
                <ButtonText className="text-white font-semibold">Add</ButtonText>
              </Button>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
