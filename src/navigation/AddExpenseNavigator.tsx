import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddExpenseScreen } from '@/src/screens/expense';
import type { AddExpenseStackParamList } from './types';

const Stack = createNativeStackNavigator<AddExpenseStackParamList>();

export function AddExpenseNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
    </Stack.Navigator>
  );
}
