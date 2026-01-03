import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Trash2, RotateCcw } from 'lucide-react-native';
import { 
  SettingsItem, 
  SettingsSectionHeader, 
  ConfirmationModal,
  BudgetEditModal,
  BudgetUpdatedModal,
  ProfileEditModal,
} from '@/src/components/custom';
import { useOnboardingStore } from '@/src/app/stores/useOnboardingStore';
import { useExpenseStore } from '@/src/app/stores/useExpenseStore';
import { formatCurrency } from '@/src/utils';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/src/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function SettingsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { onboardingData, resetOnboarding, setMonthlyBudget, setUserName, setCollegeName } = useOnboardingStore();
  const { clearExpenses } = useExpenseStore();
  
  const [showClearDataModal, setShowClearDataModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showBudgetEditModal, setShowBudgetEditModal] = useState(false);
  const [showBudgetUpdatedModal, setShowBudgetUpdatedModal] = useState(false);
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [updatedBudget, setUpdatedBudget] = useState(0);

  // Budget handlers
  const handleEditBudget = () => {
    setShowBudgetEditModal(true);
  };

  const handleSaveBudget = (newBudget: number) => {
    setMonthlyBudget(newBudget);
    setUpdatedBudget(newBudget);
    setShowBudgetEditModal(false);
    setShowBudgetUpdatedModal(true);
  };

  const handleBudgetUpdateDone = () => {
    setShowBudgetUpdatedModal(false);
  };

  // Profile handlers
  const handleEditProfile = () => {
    setShowProfileEditModal(true);
  };

  const handleSaveProfile = (name: string, college: string) => {
    setUserName(name);
    setCollegeName(college);
    setShowProfileEditModal(false);
  };

  const handleManageCategories = () => {
    navigation.navigate('ManageCategories');
  };

  // Data & Privacy handlers
//   const handleResetOnboarding = () => {
//     setShowResetModal(true);
//   };

  const handleConfirmReset = () => {
    resetOnboarding();
    setShowResetModal(false);
  };

  const handleClearAllData = () => {
    setShowClearDataModal(true);
  };

  const handleConfirmClearData = () => {
    clearExpenses();
    resetOnboarding();
    setShowClearDataModal(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-950">
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Header */}
        {/* <View className="px-5 pt-4 pb-2">
          <Text className="text-3xl font-bold text-primary-400 text-start">
            Settings
          </Text>
        </View> */}
         <View className="px-5 pt-4 pb-6">
                  <Text className="text-3xl font-bold text-typography-50 mb-1">
                    Settings
                  </Text>
                  <Text className="text-base text-typography-400">
                    Manage your settings
                  </Text>
                </View>

        <View className="px-5">
          {/* Budget Section */}
          <SettingsSectionHeader title="Budget" />
          <View className="rounded-xl overflow-hidden">
            <SettingsItem
              label="Monthly Budget"
              value={formatCurrency(onboardingData.monthlyBudget)}
              onPress={handleEditBudget}
            />
          </View>

          {/* Profile Section */}
          <SettingsSectionHeader title="Profile" />
          <View className="rounded-xl overflow-hidden">
            <SettingsItem
              label="Name"
              value={onboardingData.userName || 'Not set'}
              onPress={handleEditProfile}
            />
            <View className="h-px bg-outline-800 mx-4" />
            <SettingsItem
              label="College"
              value={onboardingData.collegeName || 'Not set'}
              onPress={handleEditProfile}
            />
          </View>

          {/* Categories Section */}
          <SettingsSectionHeader title="Categories" />
          <View className="rounded-xl overflow-hidden">
            <SettingsItem
              label="Manage Categories"
              subtitle="Enable or disable expense categories"
              onPress={handleManageCategories}
            />
          </View>

          {/* Data & Privacy Section */}
          <SettingsSectionHeader title="Data & Privacy" />
          <View className="rounded-xl overflow-hidden">
            {/* <SettingsItem
              label="Reset Onboarding"
              onPress={handleResetOnboarding}
            /> */}
            <View className="h-px bg-outline-800 mx-4" />
            <SettingsItem
              label="Clear All Data"
              variant="danger"
              onPress={handleClearAllData}
            />
          </View>
        </View>
      </ScrollView>

      {/* Budget Edit Modal */}
      <BudgetEditModal
        isOpen={showBudgetEditModal}
        currentBudget={onboardingData.monthlyBudget}
        onClose={() => setShowBudgetEditModal(false)}
        onSave={handleSaveBudget}
      />

      {/* Budget Updated Confirmation Modal */}
      <BudgetUpdatedModal
        isOpen={showBudgetUpdatedModal}
        newBudget={updatedBudget}
        onDone={handleBudgetUpdateDone}
      />

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={showProfileEditModal}
        currentName={onboardingData.userName || ''}
        currentCollege={onboardingData.collegeName || ''}
        onClose={() => setShowProfileEditModal(false)}
        onSave={handleSaveProfile}
      />

      {/* Reset Onboarding Confirmation Modal */}
      <ConfirmationModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleConfirmReset}
        title="Reset Onboarding?"
        description="This will reset your profile settings and take you back to the onboarding flow. Your expenses will be preserved."
        icon={RotateCcw}
        iconColor="text-warning-400"
        iconBgColor="bg-warning-500/20"
        confirmText="Reset"
        confirmButtonColor="bg-warning-500"
      />

      {/* Clear All Data Confirmation Modal */}
      <ConfirmationModal
        isOpen={showClearDataModal}
        onClose={() => setShowClearDataModal(false)}
        onConfirm={handleConfirmClearData}
        title="Clear All Data?"
        description="This will permanently delete all your expenses and reset your profile. This action cannot be undone."
        icon={Trash2}
        iconColor="text-error-400"
        iconBgColor="bg-error-500/20"
        confirmText="Clear All"
        confirmButtonColor="bg-error-500"
      />
    </SafeAreaView>
  );
}
