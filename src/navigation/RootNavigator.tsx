import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useOnboardingStore } from '@/src/app/stores/useOnboardingStore';
import { BottomTabNavigator } from './BottomTabNavigator';
import { OnboardingNavigator } from './OnboardingNavigator';
import { AddExpenseNavigator } from './AddExpenseNavigator';
import { ExpenseDetailScreen, EditExpenseScreen, CategoriesListScreen, CategoryExpensesScreen } from '@/src/screens/expense';
import { ManageCategoriesScreen } from '@/src/screens/settings';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const isOnboarded = useOnboardingStore((state) => state.isOnboarded);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isOnboarded ? (
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
            <Stack.Screen 
              name="AddExpense" 
              component={AddExpenseNavigator}
              options={{ presentation: 'modal' }}
            />
            <Stack.Screen 
              name="ExpenseDetail" 
              component={ExpenseDetailScreen}
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen 
              name="EditExpense" 
              component={EditExpenseScreen}
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen 
              name="CategoriesList" 
              component={CategoriesListScreen}
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen 
              name="CategoryExpenses" 
              component={CategoryExpensesScreen}
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen 
              name="ManageCategories" 
              component={ManageCategoriesScreen}
              options={{ animation: 'slide_from_right' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
