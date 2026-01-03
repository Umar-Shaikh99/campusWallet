import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Icon } from '@/src/components/ui/icon';
import { GraduationCap, IndianRupee } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '@/src/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <View className="flex-1 items-center px-6 pt-12">
        {/* Logo */}
        <View className="relative mb-6">
          <View className="h-24 w-24 items-center justify-center rounded-2xl bg-primary-100">
            <Icon as={GraduationCap} size="xl" className="text-primary-600" />
          </View>
          <View className="absolute -bottom-1 -right-1 h-8 w-8 items-center justify-center rounded-full bg-primary-600">
            <Icon as={IndianRupee} size="sm" className="text-white" />
          </View>
        </View>

        {/* Title */}
        <Text className="mb-3 text-center text-3xl text-typography-900 font-heading">
          Track Your College{'\n'}Expenses Smartly
        </Text>
        
        <Text className="mb-8 text-center text-base text-typography-500 font-body">
          Budget, split bills, save goals - made{'\n'}simple for students
        </Text>

        {/* Illustration */}
        <View className="mb-8 h-72 w-full items-center justify-center overflow-hidden !rounded-2xl bg-background-0">
          <Image 
            source={require('@/src/assets/onboarding/Onboarding_image.png')}
            className="h-full w-full"
            resizeMode="contain"
          />
        </View>

        {/* Bottom section */}
        <View className="flex-1" />
        
        <Text className="mb-4 text-center text-sm text-typography-500 font-body">
          Already have an account?{' '}
          <Text className="text-primary-600 font-inter-semibold">Log In</Text>
        </Text>

        <Button 
          size="xl" 
          action="primary"
          className="w-full rounded-full bg-primary-600 mb-6"
          onPress={() => navigation.navigate('ProfileSetup')}
        >
          <ButtonText className="text-lg text-white font-inter-semibold">Get Started</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}
