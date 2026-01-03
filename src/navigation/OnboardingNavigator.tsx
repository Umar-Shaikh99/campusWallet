import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  IntroFinancesScreen,
  IntroTrackingScreen,
  IntroCustomizationScreen,
  HousingSituationScreen,
  CategorySetupScreen,
  FinalDetailsScreen,
} from '@/src/screens/onboarding';
import type { OnboardingStackParamList } from './types';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {/* Intro screens */}
      <Stack.Screen name="IntroFinances" component={IntroFinancesScreen} />
      <Stack.Screen name="IntroTracking" component={IntroTrackingScreen} />
      <Stack.Screen name="IntroCustomization" component={IntroCustomizationScreen} />
      {/* New onboarding flow */}
      <Stack.Screen name="HousingSituation" component={HousingSituationScreen} />
      <Stack.Screen name="CategorySetup" component={CategorySetupScreen} />
      <Stack.Screen name="FinalDetails" component={FinalDetailsScreen} />
    </Stack.Navigator>
  );
}


