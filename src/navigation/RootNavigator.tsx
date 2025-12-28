import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useOnboardingStore } from '@/src/app/stores/useOnboardingStore';
import { BottomTabNavigator } from './BottomTabNavigator';
import { OnboardingNavigator } from './OnboardingNavigator';
import { AddExpenseNavigator } from './AddExpenseNavigator';
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
