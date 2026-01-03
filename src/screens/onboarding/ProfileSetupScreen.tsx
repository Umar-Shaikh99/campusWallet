import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Icon } from '@/src/components/ui/icon';
import { User, GraduationCap } from 'lucide-react-native';
import { StepIndicator } from '@/src/components/custom';
import { useOnboardingStore } from '@/src/app/stores/useOnboardingStore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '@/src/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'ProfileSetup'>;

export function ProfileSetupScreen({ navigation }: Props) {
  const { setUserName, setCollegeName } = useOnboardingStore();
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');

  const handleContinue = () => {
    if (name) setUserName(name);
    if (college) setCollegeName(college);
    navigation.navigate('BudgetSetup');
  };

  const handleSkip = () => {
    navigation.navigate('BudgetSetup');
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <View className="flex-1 px-6 pt-6">
        {/* Step indicator */}
        <StepIndicator totalSteps={4} currentStep={1} />

        {/* Title */}
        <View className="mt-8 mb-8">
          <Text className="text-center text-2xl text-typography-900 font-heading">
            Tell Us About Yourself
          </Text>
          <Text className="mt-2 text-center text-base text-typography-500 font-body">
            (Optional)
          </Text>
        </View>

        {/* Input fields */}
        <View className="gap-4">
          {/* Name input */}
          <View className="flex-row items-center rounded-xl border border-outline-200 bg-background-0 px-4 py-4">
            <Icon as={User} size="md" className="text-typography-400 mr-3" />
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your Name"
              placeholderTextColor="#94a3b8"
              className="flex-1 text-base text-typography-900 font-body"
            />
            <Text className="text-sm text-typography-400 font-body">(Optional)</Text>
          </View>

          {/* College input */}
          <View className="flex-row items-center rounded-xl border border-outline-200 bg-background-0 px-4 py-4">
            <Icon as={GraduationCap} size="md" className="text-typography-400 mr-3" />
            <TextInput
              value={college}
              onChangeText={setCollege}
              placeholder="Your College"
              placeholderTextColor="#94a3b8"
              className="flex-1 text-base text-typography-900 font-body"
            />
            <Text className="text-sm text-typography-400 font-body">(Optional)</Text>
          </View>
        </View>

        {/* Bottom buttons */}
        <View className="flex-1" />
        
        <View className="flex-row items-center gap-4 mb-6">
          <Pressable onPress={handleSkip} className="px-6 py-4">
            <Text className="text-base text-primary-600 font-inter-semibold">Skip</Text>
          </Pressable>
          
          <Button 
            size="xl" 
            action="primary"
            className="flex-1 rounded-full bg-primary-600"
            onPress={handleContinue}
          >
            <ButtonText className="text-lg text-white font-inter-semibold">Continue</ButtonText>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
