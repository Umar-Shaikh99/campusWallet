import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import type { BottomTabParamList } from './types';

import { Button, ButtonText } from '@/src/components/ui/button';
import { Avatar, AvatarFallbackText, AvatarImage, AvatarBadge } from '@/src/components/ui/avatar';
import { Badge, BadgeText } from '@/src/components/ui/badge';
import { Card } from '@/src/components/ui/card';
import { ScrollView } from 'react-native';

// Component showcase screen - testing all gluestack UI components
function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-background-0 p-4">
      <Text className="text-2xl font-bold text-white mb-6">Component Showcase</Text>

      {/* Button Section */}
      <Text className="text-lg font-semibold text-white mb-3">Buttons</Text>
      <View className="flex-row flex-wrap gap-3 mb-6">
        <Button action="primary" variant="solid" size="lg" className="!bg-red-500 rounded-full">
          <ButtonText>Primary</ButtonText>
          
        </Button>
        <Button action="secondary" variant="solid" size="md" className="bg-secondary-500">
          <ButtonText>Secondary</ButtonText>
        </Button>
        <Button action="positive" variant="outline" size="md" className="bg-positive-500">
          <ButtonText>Outline</ButtonText>
        </Button>
        <Button action="negative" variant="link" size="md" className="bg-negative-500">
          <ButtonText>Link</ButtonText>
        </Button>
      </View>

      {/* Avatar Section */}
      <Text className="text-lg font-semibold text-white mb-3">Avatars</Text>
      <View className="flex-row items-center gap-4 mb-6">
        <Avatar size="sm">
          <AvatarFallbackText>JD</AvatarFallbackText>
        </Avatar>
        <Avatar size="md">
          <AvatarFallbackText>AB</AvatarFallbackText>
          <AvatarBadge />
        </Avatar>
        <Avatar size="lg">
          <AvatarFallbackText>XY</AvatarFallbackText>
        </Avatar>
        <Avatar size="xl">
          <AvatarFallbackText>ZW</AvatarFallbackText>
        </Avatar>
      </View>

      {/* Badge Section */}
      <Text className="text-lg font-semibold text-white mb-3">Badges</Text>
      <View className="flex-row flex-wrap gap-3 mb-6">
        <Badge action="success" variant="solid">
          <BadgeText>Success</BadgeText>
        </Badge>
        <Badge action="error" variant="solid">
          <BadgeText>Error</BadgeText>
        </Badge>
        <Badge action="warning" variant="solid">
          <BadgeText>Warning</BadgeText>
        </Badge>
        <Badge action="info" variant="solid">
          <BadgeText>Info</BadgeText>
        </Badge>
        <Badge action="muted" variant="outline">
          <BadgeText>Muted</BadgeText>
        </Badge>
      </View>

      {/* Card Section */}
      <Text className="text-lg font-semibold text-white mb-3">Cards</Text>
      <Card variant="elevated" size="md" className="p-4 mb-4">
        <Text className="text-lg font-bold text-white">Elevated Card</Text>
        <Text className="text-gray-400 mt-2">This is an elevated card with shadow.</Text>
      </Card>
      <Card variant="outline" size="md" className="p-4 mb-4">
        <Text className="text-lg font-bold text-white">Outline Card</Text>
        <Text className="text-gray-400 mt-2">This is an outline card with border.</Text>
      </Card>
      <Card variant="filled" size="md" className="p-4 mb-6">
        <Text className="text-lg font-bold text-white">Filled Card</Text>
        <Text className="text-gray-400 mt-2">This is a filled card with background.</Text>
      </Card>
    </ScrollView>
  );
}

function ExpensesScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <Text className="text-xl font-bold text-gray-900 dark:text-white">Expenses</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <Text className="text-xl font-bold text-gray-900 dark:text-white">Settings</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator<BottomTabParamList>();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#111827',
          borderTopColor: '#374151',
        },
        tabBarActiveTintColor: '#0ea5e9',
        tabBarInactiveTintColor: '#9ca3af',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Expenses"
        component={ExpensesScreen}
        options={{
          tabBarLabel: 'Expenses',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}
