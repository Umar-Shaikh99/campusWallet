import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Icon } from '@/src/components/ui/icon';
import { Building2, Home } from 'lucide-react-native';
import { StepIndicator, SelectionCard } from '@/src/components/custom';
import { useOnboardingStore } from '@/src/app/stores/useOnboardingStore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '@/src/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'LivingType'>;

export function LivingTypeScreen({ navigation }: Props) {
  const { onboardingData, setLivingType } = useOnboardingStore();

  const handleContinue = () => {
    navigation.navigate('Categories');
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <View className="flex-1 px-6 pt-4">
        {/* Step indicator */}
        <StepIndicator totalSteps={4} currentStep={3} />

        {/* Title */}
        <Text className="mt-8 mb-6 text-2xl text-typography-900 font-heading">
          Select Your Living Type
        </Text>

        {/* Selection cards */}
        <View className="flex-row gap-4 mb-6">
          <SelectionCard
            icon={Building2}
            label="Hostel/PG"
            isSelected={onboardingData.livingType === 'hostel'}
            onPress={() => setLivingType('hostel')}
          />
          <SelectionCard
            icon={Home}
            label="Home (with family)"
            isSelected={onboardingData.livingType === 'home'}
            onPress={() => setLivingType('home')}
          />
        </View>

        <Text className="text-sm text-typography-500 font-body">
          This helps customize expense categories for you
        </Text>

        {/* Bottom section */}
        <View className="flex-1" />
        
        <Button 
          size="xl" 
          action="primary"
          className="w-full rounded-full bg-primary-600 mb-6"
          onPress={handleContinue}
        >
          <ButtonText className="text-lg text-white font-inter-semibold">Continue</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}
