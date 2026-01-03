import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Icon } from '@/src/components/ui/icon';
import { ArrowLeft, Info } from 'lucide-react-native';
import { useOnboardingStore } from '@/src/app/stores/useOnboardingStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { finalDetailsSchema, type FinalDetailsFormData } from '@/src/app/schema';
import { FinalDetailsForm } from './forms';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '@/src/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'FinalDetails'>;

export function FinalDetailsScreen({ navigation }: Props) {
  const { setUserName, setCollegeName, setMonthlyBudget, completeOnboarding } = useOnboardingStore();
  
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FinalDetailsFormData>({
    resolver: zodResolver(finalDetailsSchema),
    mode: 'onChange',
    defaultValues: {
      displayName: '',
      collegeName: '',
      budgetAmount: '',
    },
  });

  const budgetAmount = watch('budgetAmount');

  const handlePresetSelect = (amount: number) => {
    setValue('budgetAmount', amount.toString(), { shouldValidate: true });
  };

  const onSubmit = (data: FinalDetailsFormData) => {
    setUserName(data.displayName.trim());
    setCollegeName(data.collegeName.trim());
    setMonthlyBudget(parseInt(data.budgetAmount, 10));
    completeOnboarding();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 px-6 pt-4 pb-6">
          {/* Header */}
          <Pressable onPress={handleBack} className="p-2 -ml-2 mb-6">
            <Icon as={ArrowLeft} size="md" className="text-typography-600" />
          </Pressable>

          {/* Title */}
          <Text className="text-2xl text-typography-900 font-heading mb-2">
            Final Details
          </Text>
          <Text className="text-base text-typography-500 font-body mb-8">
            Configure your personal profile settings.
          </Text>

          {/* Form */}
          <FinalDetailsForm
            control={control}
            errors={errors}
            budgetAmount={budgetAmount}
            onPresetSelect={handlePresetSelect}
          />

          {/* Privacy note */}
          <View className="flex-row items-center mb-8">
            <Icon as={Info} size="xs" className="text-typography-400 mr-2" />
            <Text className="text-xs text-typography-400 font-body">
              Data is stored locally on your device.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom buttons */}
      <View className="px-6 pt-4 pb-2 border-t border-outline-100">
        <Button
          size="xl"
          action="primary"
          className={`w-full rounded-2xl mb-3 ${isValid ? 'bg-primary-600' : 'bg-primary-300'}`}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          <ButtonText className="text-lg text-white font-inter-semibold">
            Initialize Dashboard
          </ButtonText>
        </Button>

        <Pressable onPress={handleBack} className="py-3">
          <Text className="text-center text-base text-typography-500 font-body">
            Back
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
