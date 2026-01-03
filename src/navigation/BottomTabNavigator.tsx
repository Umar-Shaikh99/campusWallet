import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { Icon } from '@/src/components/ui/icon';
import { Home, BarChart3, Wallet, Settings } from 'lucide-react-native';
import type { BottomTabParamList } from './types';

// Screens
import { HomeScreen } from '@/src/screens/home';
import { InsightsScreen } from '@/src/screens/insights';
import { SettingsScreen } from '@/src/screens/settings';


function WalletScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background-950">
      <Text className="text-xl font-bold text-typography-50">Wallet</Text>
      <Text className="text-typography-500 mt-2">Coming soon</Text>
    </View>
  );
}

// ProfileScreen placeholder removed - now using SettingsScreen

const Tab = createBottomTabNavigator<BottomTabParamList>();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0f172a',
          borderTopColor: '#1e293b',
          paddingTop: 8,
          paddingBottom: 8,
          height: 64,
        },
        tabBarActiveTintColor: '#0ea5e9',
        tabBarInactiveTintColor: '#64748b',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon as={Home} size="md" style={{ color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={InsightsScreen}
        options={{
          tabBarLabel: 'Insights',
          tabBarIcon: ({ color, size }) => (
            <Icon as={BarChart3} size="md" style={{ color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({ color, size }) => (
            <Icon as={Wallet} size="md" style={{ color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon as={Settings} size="md" style={{ color }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
