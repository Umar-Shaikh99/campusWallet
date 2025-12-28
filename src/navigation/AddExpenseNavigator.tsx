import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  AddExpenseAmountScreen,
  AddExpenseDetailsScreen,
  AddExpenseSuccessScreen,
} from '@/src/screens/expense';
import type { AddExpenseStackParamList } from './types';

const Stack = createNativeStackNavigator<AddExpenseStackParamList>();

export function AddExpenseNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="AddExpenseAmount" component={AddExpenseAmountScreen} />
      <Stack.Screen name="AddExpenseDetails" component={AddExpenseDetailsScreen} />
      <Stack.Screen name="AddExpenseSuccess" component={AddExpenseSuccessScreen} />
    </Stack.Navigator>
  );
}
