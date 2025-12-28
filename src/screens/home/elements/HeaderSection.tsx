import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Icon } from '@/src/components/ui/icon';
import { Avatar, AvatarFallbackText } from '@/src/components/ui/avatar';
import { Bell } from 'lucide-react-native';

interface HeaderSectionProps {
  userName: string;
  onNotificationPress?: () => void;
}

export function HeaderSection({ userName, onNotificationPress }: HeaderSectionProps) {
  return (
    <View className="flex-row items-center justify-between mb-6">
      <View className="flex-row items-center">
        <Avatar size="md" className="mr-3">
          <AvatarFallbackText>{userName}</AvatarFallbackText>
        </Avatar>
        <View>
          <Text className="text-sm text-typography-400">Welcome back,</Text>
          <Text className="text-xl font-bold text-typography-50">{userName}</Text>
        </View>
      </View>
      <Pressable 
        className="w-10 h-10 items-center justify-center rounded-full bg-background-800"
        onPress={onNotificationPress}
      >
        <Icon as={Bell} size="md" className="text-typography-300" />
      </Pressable>
    </View>
  );
}
