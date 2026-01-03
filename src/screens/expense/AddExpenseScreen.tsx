import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Platform, ScrollView, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@/src/components/ui/icon';
import { Button, ButtonText } from '@/src/components/ui/button';
import { NumPad } from '@/src/components/custom';
import { getIconByName } from '@/src/utils';
import { ArrowLeft, ChevronDown, Calendar, Clock, AlertTriangle, User, Users, Check } from 'lucide-react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AddExpenseStackParamList, RootStackParamList } from '@/src/navigation/types';
import { useExpenseStore } from '@/src/app/stores/useExpenseStore';
import { useOnboardingStore } from '@/src/app/stores/useOnboardingStore';
import type { ExpenseCategory } from '@/src/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteType = RouteProp<AddExpenseStackParamList, 'AddExpense'>;

const SPLIT_OPTIONS = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'roommates', label: 'Roommates', icon: Users },
];

export function AddExpenseScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteType>();
  
  const { onboardingData } = useOnboardingStore();
  const { addExpense, getTotalSpent } = useExpenseStore();
  const categories = onboardingData.selectedCategories;
  
  // Check if category is pre-selected (from Quick Add)
  const preselectedCategoryId = route.params?.categoryId;
  const initialCategory = preselectedCategoryId 
    ? categories.find(c => c.id === preselectedCategoryId) || categories[0]
    : categories[0];
  
  const [amount, setAmount] = useState('0');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState(initialCategory?.id || '');
  const [selectedSplit, setSelectedSplit] = useState('personal');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showNumPad, setShowNumPad] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const numericAmount = parseInt(amount, 10) || 0;
  const currentSpent = getTotalSpent();
  const budget = onboardingData.monthlyBudget;
  const willExceedBudget = currentSpent + numericAmount > budget;
  const exceedAmount = (currentSpent + numericAmount) - budget;

  const selectedCategoryData = categories.find(c => c.id === selectedCategory) || initialCategory;

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
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

  const handleCategorySelect = (category: ExpenseCategory) => {
    setSelectedCategory(category.id);
    setShowCategoryPicker(false);
  };

  const handleSave = () => {
    if (numericAmount <= 0 || !selectedCategoryData) return;
    
    addExpense({
      amount: numericAmount,
      title: note || selectedCategoryData.name,
      categoryId: selectedCategoryData.id,
      categoryName: selectedCategoryData.name,
      categoryIcon: selectedCategoryData.icon,
      date: date.toISOString(),
    });

    setShowSuccess(true);
    
    // Auto-dismiss after 1.5 seconds
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const formattedDate = date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const renderCategoryItem = ({ item }: { item: ExpenseCategory }) => {
    const isSelected = item.id === selectedCategory;
    return (
      <Pressable
        onPress={() => handleCategorySelect(item)}
        className={`flex-row items-center px-4 py-4 border-b border-outline-800 ${
          isSelected ? 'bg-primary-500/10' : ''
        }`}
      >
        <View className="w-10 h-10 rounded-lg bg-primary-500/20 items-center justify-center mr-3">
          <Icon as={getIconByName(item.icon)} size="md" className="text-primary-400" />
        </View>
        <Text className="flex-1 text-base text-typography-100">{item.name}</Text>
        {isSelected && (
          <Icon as={Check} size="md" className="text-primary-400" />
        )}
      </Pressable>
    );
  };

  // Success screen state
  const [countdown, setCountdown] = useState(3);

  // Countdown effect for success screen
  React.useEffect(() => {
    if (showSuccess && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (showSuccess && countdown === 0) {
      navigation.goBack();
    }
  }, [showSuccess, countdown, navigation]);

  const handleAddAnother = () => {
    // Reset form and hide success
    setShowSuccess(false);
    setAmount('0');
    setNote('');
    setDate(new Date());
    setCountdown(3);
  };

  const handleDone = () => {
    navigation.goBack();
  };

  const formattedSuccessDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedSuccessTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // Success screen
  if (showSuccess) {
    return (
      <SafeAreaView className="flex-1 bg-background-950">
        <View className="flex-1 items-center justify-center px-5">
          {/* Glowing checkmark */}
          <View className="mb-8">
            <View className="w-24 h-24 rounded-full border-4 border-success-500 items-center justify-center"
              style={{
                shadowColor: '#10B981',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 20,
              }}
            >
              <Icon as={Check} size="xl" className="text-success-500" style={{ width: 48, height: 48 }} />
            </View>
          </View>

          {/* Title */}
          <Text className="text-3xl font-bold text-typography-50 mb-2">Expense Added!</Text>
          <Text className="text-base text-typography-500 mb-8">Your transaction has been recorded.</Text>

          {/* Summary Card */}
          <View className="w-full rounded-2xl bg-background-900 border border-outline-800 p-5 mb-8">
            {/* Amount */}
            <View className="items-center mb-4 pb-4 border-b border-outline-800">
              <Text className="text-xs text-typography-500 tracking-widest mb-2">AMOUNT</Text>
              <Text className="text-3xl font-bold text-typography-50">₹{numericAmount.toLocaleString('en-IN')}.00</Text>
            </View>

            {/* Details */}
            <View className="gap-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-typography-500">Category</Text>
                <View className="flex-row items-center">
                  <Icon as={getIconByName(selectedCategoryData?.icon || 'Tag')} size="sm" className="text-typography-300 mr-2" />
                  <Text className="text-sm text-typography-100">{selectedCategoryData?.name}</Text>
                </View>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-typography-500">Date</Text>
                <Text className="text-sm text-typography-100">{formattedSuccessDate}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-typography-500">Time</Text>
                <Text className="text-sm text-typography-100">{formattedSuccessTime}</Text>
              </View>
              {note && (
                <View className="flex-row justify-between">
                  <Text className="text-sm text-typography-500">Note</Text>
                  <Text className="text-sm text-typography-100">{note}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Buttons */}
          <View className="w-full flex-row gap-3">
            <Button 
              size="xl" 
              className="flex-1 rounded-full bg-secondary-600"
              onPress={handleAddAnother}
            >
              <ButtonText className="text-white font-semibold">Add Another</ButtonText>
            </Button>
            <Button 
              size="xl" 
              className="flex-1 rounded-full bg-primary-500"
              onPress={handleDone}
            >
              <ButtonText className="text-white font-semibold">Done</ButtonText>
            </Button>
          </View>
        </View>

        {/* Countdown */}
        <View className="items-center pb-8">
          <Text className="text-sm text-typography-600">Returning to home in {countdown}...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background-950">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <Pressable onPress={showNumPad ? () => setShowNumPad(false) : handleCancel} className="p-2">
          <Icon as={ArrowLeft} size="md" className="text-typography-300" />
        </Pressable>
        <Text className="text-lg font-semibold text-typography-50">
          {showNumPad ? 'Enter Amount' : 'Add Expense'}
        </Text>
        {showNumPad ? (
          <Pressable onPress={() => setShowNumPad(false)} className="p-2">
            <Text className="text-base font-medium text-primary-400">Done</Text>
          </Pressable>
        ) : (
          <Pressable onPress={handleCancel} className="p-2">
            <Text className="text-base font-medium text-typography-400">Cancel</Text>
          </Pressable>
        )}
      </View>

      <View className="flex-1">
        {showNumPad ? (
          /* NumPad View with built-in display and cursor */
          <View className="flex-1 justify-end">
            <NumPad 
              value={amount} 
              onChange={setAmount}
              showDisplay={true}
            />
          </View>
        ) : (
          /* Form View */
          <>
            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
              {/* Total Amount - Tappable */}
              <Pressable 
                onPress={() => setShowNumPad(true)}
                className="items-center mt-4 mb-4"
              >
                <Text className="text-xs text-typography-500 tracking-widest mb-2">TOTAL AMOUNT</Text>
                <View className="flex-row items-baseline">
                  <Text className="text-2xl text-typography-400 mr-2">₹</Text>
                  <Text className="text-5xl font-bold text-typography-50">
                    {numericAmount.toLocaleString('en-IN')}.00
                  </Text>
                </View>
                <Text className="text-xs text-primary-400 mt-2">Tap to edit</Text>
              </Pressable>

              {/* Budget Warning */}
              {willExceedBudget && numericAmount > 0 && (
                <View className="rounded-xl bg-warning-500/20 p-4 mb-4 flex-row items-start">
                  <Icon as={AlertTriangle} size="md" className="text-warning-400 mr-3 mt-0.5" />
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-warning-400">Budget Warning</Text>
                    <Text className="text-sm text-warning-300">
                      This expense will exceed your monthly budget by ₹{exceedAmount.toLocaleString('en-IN')}.
                    </Text>
                  </View>
                </View>
              )}

              {/* Category Picker */}
              <View className="mb-4">
                <Text className="text-sm text-typography-500 mb-2">Category</Text>
                <Pressable
                  onPress={() => setShowCategoryPicker(true)}
                  className="flex-row items-center justify-between rounded-xl bg-background-800 px-4 py-3"
                >
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 rounded-lg bg-primary-500/20 items-center justify-center mr-3">
                      <Icon as={getIconByName(selectedCategoryData?.icon || 'Tag')} size="md" className="text-primary-400" />
                    </View>
                    <Text className="text-base text-typography-100">{selectedCategoryData?.name || 'Select Category'}</Text>
                  </View>
                  <Icon as={ChevronDown} size="md" className="text-typography-400" />
                </Pressable>
              </View>

              {/* Date & Time Row */}
              <View className="flex-row gap-3 mb-4">
                <View className="flex-1">
                  <Text className="text-sm text-typography-500 mb-2">Date</Text>
                  <Pressable 
                    onPress={() => setShowDatePicker(true)}
                    className="flex-row items-center justify-between rounded-xl bg-background-800 px-4 py-4"
                  >
                    <Text className="text-base text-typography-100">{formattedDate}</Text>
                    <Icon as={Calendar} size="md" className="text-typography-400" />
                  </Pressable>
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-typography-500 mb-2">Time</Text>
                  <Pressable 
                    onPress={() => setShowTimePicker(true)}
                    className="flex-row items-center justify-between rounded-xl bg-background-800 px-4 py-4"
                  >
                    <Text className="text-base text-typography-100">{formattedTime}</Text>
                    <Icon as={Clock} size="md" className="text-typography-400" />
                  </Pressable>
                </View>
              </View>

              {/* Split With */}
              <View className="mb-4">
                <Text className="text-sm text-typography-500 mb-2">Split With</Text>
                <View className="flex-row gap-2">
                  {SPLIT_OPTIONS.map((option) => (
                    <Pressable
                      key={option.id}
                      onPress={() => setSelectedSplit(option.id)}
                      className={`flex-row items-center px-4 py-3 rounded-full ${
                        selectedSplit === option.id
                          ? 'bg-primary-500'
                          : 'bg-background-800'
                      }`}
                    >
                      <Icon 
                        as={option.icon} 
                        size="sm" 
                        className={selectedSplit === option.id ? 'text-white mr-2' : 'text-typography-400 mr-2'} 
                      />
                      <Text className={selectedSplit === option.id ? 'text-white font-medium' : 'text-typography-300'}>
                        {option.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Notes */}
              <View className="mb-6">
                <Text className="text-sm text-typography-500 mb-2">Notes (Optional)</Text>
                <View className="rounded-xl bg-background-800 px-4 py-4">
                  <TextInput
                    value={note}
                    onChangeText={setNote}
                    placeholder="e.g. Lunch at canteen with Rahul..."
                    placeholderTextColor="#64748b"
                    multiline
                    numberOfLines={3}
                    className="text-base text-typography-100 min-h-[80px]"
                    textAlignVertical="top"
                  />
                </View>
              </View>
            </ScrollView>

            {/* Bottom Button */}
            <View className="px-5 pb-6 pt-4 bg-background-950">
              <Button 
                action="primary"
                size="xl" 
                className={`w-full rounded-full ${numericAmount > 0 ? 'bg-primary-500' : 'bg-background-700'}`}
                onPress={handleSave}
                disabled={numericAmount <= 0}
              >
                <ButtonText className={numericAmount > 0 ? 'text-white' : 'text-typography-500'}>
                  Add Expense
                </ButtonText>
              </Button>
            </View>
          </>
        )}
      </View>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
        />
      )}

      {/* Category Picker Modal */}
      <Modal
        visible={showCategoryPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategoryPicker(false)}
      >
        <Pressable 
          className="flex-1 justify-end bg-black/60"
          onPress={() => setShowCategoryPicker(false)}
        >
          <Pressable 
            className="bg-background-900 rounded-t-3xl max-h-[60%]"
            onPress={(e) => e.stopPropagation()}
          >
            <View className="items-center py-3">
              <View className="w-12 h-1 bg-background-600 rounded-full" />
            </View>
            <Text className="text-lg font-semibold text-typography-50 px-4 pb-3">Select Category</Text>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={renderCategoryItem}
              showsVerticalScrollIndicator={false}
            />
            <View className="h-8" />
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
