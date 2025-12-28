import React, { useState } from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@/src/components/ui/icon';
import { Button, ButtonText } from '@/src/components/ui/button';
import { InputField, ConfirmationModal } from '@/src/components/custom';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Calendar, ChevronDown, Users, AlertTriangle } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AddExpenseStackParamList } from '@/src/navigation/types';
import { useExpenseStore } from '@/src/app/stores/useExpenseStore';
import { useOnboardingStore } from '@/src/app/stores/useOnboardingStore';

type Props = NativeStackScreenProps<AddExpenseStackParamList, 'AddExpenseDetails'>;

export function AddExpenseDetailsScreen({ navigation, route }: Props) {
  const { amount, categoryId, categoryName, categoryIcon } = route.params;
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showOverBudgetModal, setShowOverBudgetModal] = useState(false);
  const { addExpense, getTotalSpent } = useExpenseStore();
  const { onboardingData } = useOnboardingStore();

  const currentSpent = getTotalSpent();
  const budget = onboardingData.monthlyBudget;
  const willExceedBudget = currentSpent + amount > budget;

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }) + ', ' + date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
      if (Platform.OS === 'android') {
        setShowTimePicker(true);
      }
    }
  };

  const handleTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (event.type === 'set' && selectedTime) {
      const newDate = new Date(date);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setDate(newDate);
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const saveExpense = () => {
    addExpense({
      amount,
      title: note || categoryName,
      categoryId,
      categoryName,
      categoryIcon,
      date: date.toISOString(),
    });

    navigation.navigate('AddExpenseSuccess', {
      amount,
      categoryName,
      categoryIcon,
      note: note || categoryName,
      date: date.toISOString(),
    });
  };

  const handleSave = () => {
    if (willExceedBudget) {
      setShowOverBudgetModal(true);
    } else {
      saveExpense();
    }
  };

  const handleConfirmOverBudget = () => {
    setShowOverBudgetModal(false);
    saveExpense();
  };

  return (
    <SafeAreaView className="flex-1 bg-background-950">
      <View className="flex-1 px-5 py-4">
        {/* Title */}
        <Text className="text-2xl font-bold text-typography-50 mb-1">Add Details (Optional)</Text>
        <Text className="text-sm text-typography-500 mb-6">Skip if not needed</Text>

        {/* Note Input */}
        <View className="rounded-2xl border border-outline-700 bg-background-900 p-4 mb-4">
          <Text className="text-sm font-medium text-typography-300 mb-3">Note</Text>
          <InputField
            value={note}
            onChangeText={setNote}
            placeholder="Lunch at college canteen..."
            className="border-0 bg-transparent p-0"
          />
        </View>

        {/* Date & Time */}
        <View className="rounded-2xl border border-outline-700 bg-background-900 p-4 mb-4">
          <Text className="text-sm font-medium text-typography-300 mb-3">Date & Time</Text>
          <Pressable 
            onPress={openDatePicker}
            className="flex-row items-center justify-between rounded-xl bg-background-800 px-4 py-4"
          >
            <Text className="text-base text-typography-100">{formattedDate}</Text>
            <Icon as={Calendar} size="md" className="text-primary-400" />
          </Pressable>
        </View>

        {/* Add to Group */}
        <View className="rounded-2xl border border-outline-700 bg-background-900 p-4">
          <Text className="text-sm font-medium text-typography-300 mb-3">Add to Group</Text>
          <Pressable className="flex-row items-center justify-between rounded-xl bg-background-800 px-4 py-4">
            <View className="flex-row items-center">
              <Icon as={Users} size="md" className="text-typography-400 mr-3" />
              <Text className="text-base text-typography-100">Personal</Text>
            </View>
            <Icon as={ChevronDown} size="md" className="text-typography-400" />
          </Pressable>
        </View>

        {/* Over Budget Warning */}
        {willExceedBudget && (
          <View className="mt-4 p-4 rounded-2xl bg-warning-500/10 border border-warning-500/30 flex-row items-center">
            <Icon as={AlertTriangle} size="md" className="text-warning-400 mr-3" />
            <View className="flex-1">
              <Text className="text-sm font-medium text-warning-400">Budget Warning</Text>
              <Text className="text-xs text-warning-300">This expense will exceed your monthly budget</Text>
            </View>
          </View>
        )}

        {/* Spacer */}
        <View className="flex-1" />

        {/* Bottom Buttons */}
        <View className="flex-row gap-3 mb-4">
          <Button 
            variant="outline"
            size="xl" 
            className="flex-1 rounded-full border-outline-600"
            onPress={handleBack}
          >
            <ButtonText className="text-typography-300">Back</ButtonText>
          </Button>
          <Button 
            action="primary"
            size="xl" 
            className="flex-1 rounded-full bg-primary-500"
            onPress={handleSave}
          >
            <ButtonText className="text-white">Save Expense</ButtonText>
          </Button>
        </View>
      </View>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode={Platform.OS === 'ios' ? 'datetime' : 'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}

      {/* Time Picker (Android only) */}
      {showTimePicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}

      {/* Over Budget Confirmation Modal */}
      <ConfirmationModal
        isOpen={showOverBudgetModal}
        onClose={() => setShowOverBudgetModal(false)}
        onConfirm={handleConfirmOverBudget}
        title="Over Budget"
        description="Adding this expense will exceed your monthly budget. Do you want to proceed anyway?"
        icon={AlertTriangle}
        iconColor="text-warning-400"
        iconBgColor="bg-warning-500/20"
        cancelText="Cancel"
        confirmText="Add Anyway"
        confirmButtonColor="bg-warning-500"
      />
    </SafeAreaView>
  );
}
