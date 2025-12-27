import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Icon } from '@/src/components/ui/icon';
import { ArrowLeft, ArrowRight, Wallet } from 'lucide-react-native';
import { StepIndicator, AmountInput } from '@/src/components/custom';
import { useOnboardingStore } from '@/src/app/stores/useOnboardingStore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '@/src/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'BudgetSetup'>;

export function BudgetSetupScreen({ navigation }: Props) {
  const { onboardingData, setMonthlyBudget } = useOnboardingStore();

  const handleContinue = () => {
    navigation.navigate('LivingType');
  };

  return (
    <SafeAreaView className="flex-1 bg-background-950">
      <View className="flex-1 px-6 pt-4">
        {/* Header with back button and step indicator */}
        <View className="flex-row items-center mb-6">
          <Pressable onPress={() => navigation.goBack()} className="p-2">
            <Icon as={ArrowLeft} size="md" className="text-typography-300" />
          </Pressable>
          <View className="flex-1">
            <StepIndicator totalSteps={4} currentStep={2} />
          </View>
          <View className="w-10" />
        </View>

        {/* Title */}
        <Text className="mb-8 text-center text-2xl font-bold text-typography-50">
          Set Your Monthly{'\n'}Budget
        </Text>

        {/* Budget input */}
        <AmountInput 
          value={onboardingData.monthlyBudget} 
          onChange={setMonthlyBudget}
          currencySymbol="₹"
          helperText="Enter your total monthly spending allowance"
          presets={[5000, 8000, 10000]}
        />

        {/* Bottom section */}
        <View className="flex-1" />
        
        <Button 
          size="xl" 
          action="primary"
          className="w-full rounded-full bg-primary-500 mb-4"
          onPress={handleContinue}
        >
          <ButtonText className="text-lg font-semibold">Continue</ButtonText>
          <Icon as={ArrowRight} size="md" className="text-white ml-2" />
        </Button>

        {/* Branding */}
        <View className="flex-row items-center justify-center mb-4">
          <Icon as={Wallet} size="sm" className="text-typography-600 mr-2" />
          <Text className="text-sm text-typography-600 tracking-wider">CAMPUSWALLET</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
