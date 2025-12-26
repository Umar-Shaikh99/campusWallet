import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Icon, CheckCircleIcon } from '@/src/components/ui/icon';
import type { LucideIcon } from 'lucide-react-native';

interface SelectionCardProps {
  icon: LucideIcon;
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export function SelectionCard({ icon, label, isSelected, onPress }: SelectionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`relative flex-1 items-center justify-center rounded-2xl border-2 p-6 ${
        isSelected 
          ? 'border-primary-500 bg-primary-500/10' 
          : 'border-outline-600 bg-background-900'
      }`}
    >
      {isSelected && (
        <View className="absolute right-2 top-2">
          <Icon as={CheckCircleIcon} size="sm" className="text-primary-500" />
        </View>
      )}
      
      <View className={`mb-3 rounded-xl p-3 ${
        isSelected ? 'bg-primary-500/20' : 'bg-background-800'
      }`}>
        <Icon 
          as={icon} 
          size="xl" 
          className={isSelected ? 'text-primary-500' : 'text-typography-400'} 
        />
      </View>
      
      <Text className={`text-center text-sm font-medium ${
        isSelected ? 'text-primary-400' : 'text-typography-300'
      }`}>
        {label}
      </Text>
    </Pressable>
  );
}
