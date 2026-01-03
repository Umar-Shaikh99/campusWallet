import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Icon } from '@/src/components/ui/icon';
import { ShieldCheck, TrendingUp, ChevronRight } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '@/src/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'IntroFinances'>;

export function IntroFinancesScreen({ navigation }: Props) {
  const handleStartSetup = () => {
    navigation.navigate('IntroTracking');
  };

  const handleSkip = () => {
    navigation.navigate('HousingSituation');
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <View className="flex-1 px-6 pt-4">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <View className="w-10" />
          <Text className="text-primary-600 font-montserrat-semibold text-sm tracking-wider">
            BUDGETPRO
          </Text>
          <Pressable onPress={handleSkip}>
            <Text className="text-typography-400 font-inter text-sm">SKIP</Text>
          </Pressable>
        </View>

        {/* Illustration placeholder */}
        <View className="flex-1 items-center justify-center">
          <View className="relative">
            {/* Main icon container */}
            <View className="h-40 w-40 items-center justify-center rounded-3xl bg-background-100 border border-outline-100">
              <View className="h-24 w-24 items-center justify-center rounded-2xl bg-primary-50 border border-primary-100">
                <Icon as={ShieldCheck} size="xl" className="text-primary-600" />
              </View>
            </View>
            {/* Accent icon */}
            <View className="absolute -top-2 -right-2 h-10 w-10 items-center justify-center rounded-lg bg-success-500">
              <Icon as={TrendingUp} size="sm" className="text-white" />
            </View>
          </View>
        </View>

        {/* Content */}
        <View className="pb-8">
          <Text className="text-2xl text-typography-900 font-heading mb-3">
            Master Your Finances
          </Text>
          <Text className="text-base text-typography-500 font-body leading-6">
            A professional tool to manage your student budget with precision and clarity.
          </Text>

          {/* Pagination dots */}
          <View className="flex-row items-center gap-2 mt-6">
            <View className="h-2 w-6 rounded-full bg-primary-600" />
            <View className="h-2 w-2 rounded-full bg-outline-200" />
            <View className="h-2 w-2 rounded-full bg-outline-200" />
          </View>
        </View>

        {/* Button */}
        <Button 
          size="xl" 
          action="primary"
          className="w-full rounded-2xl bg-primary-600 mb-6"
          onPress={handleStartSetup}
        >
          <ButtonText className="text-lg text-white font-inter-semibold">Start Setup</ButtonText>
          <Icon as={ChevronRight} size="md" className="text-white ml-1" />
        </Button>
      </View>
    </SafeAreaView>
  );
}
