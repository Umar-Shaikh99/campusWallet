import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Icon } from '@/src/components/ui/icon';
import { ArrowLeft, UtensilsCrossed, BookOpen, Coffee } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '@/src/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'IntroTracking'>;

// Expense card component for the illustration
function ExpenseCard({ 
  icon: IconComponent, 
  title, 
  subtitle, 
  amount, 
  iconBgColor = 'bg-primary-100',
  iconColor = 'text-primary-600'
}: { 
  icon: React.ComponentType<any>; 
  title: string; 
  subtitle: string; 
  amount: string;
  iconBgColor?: string;
  iconColor?: string;
}) {
  return (
    <View className="flex-row items-center bg-background-0 rounded-2xl px-4 py-3 mb-3 border border-outline-100">
      <View className={`h-10 w-10 items-center justify-center rounded-xl ${iconBgColor} mr-3`}>
        <Icon as={IconComponent} size="sm" className={iconColor} />
      </View>
      <View className="flex-1">
        <Text className="text-sm text-typography-900 font-inter-medium">{title}</Text>
        <Text className="text-xs text-typography-400 font-body">{subtitle}</Text>
      </View>
      <Text className="text-base text-primary-600 font-montserrat-semibold">{amount}</Text>
    </View>
  );
}

export function IntroTrackingScreen({ navigation }: Props) {
  const handleContinue = () => {
    navigation.navigate('IntroCustomization');
  };

  const handleSkip = () => {
    navigation.navigate('HousingSituation');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <View className="flex-1 px-6 pt-4">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <Pressable onPress={handleBack} className="p-2">
            <Icon as={ArrowLeft} size="md" className="text-typography-600" />
          </Pressable>
          <Text className="text-primary-600 font-montserrat-semibold text-sm tracking-wider">
            BUDGETPRO
          </Text>
          <Pressable onPress={handleSkip}>
            <Text className="text-typography-400 font-inter text-sm">SKIP</Text>
          </Pressable>
        </View>

        {/* Illustration - Expense cards */}
        <View className="flex-1 items-center justify-center px-4">
          <View className="w-full max-w-xs">
            <ExpenseCard 
              icon={UtensilsCrossed} 
              title="Dining Out" 
              subtitle="12:30 PM" 
              amount="-$15.00"
            />
            <ExpenseCard 
              icon={BookOpen} 
              title="Textbooks" 
              subtitle="Semester 1" 
              amount="-$45.00"
              iconBgColor="bg-secondary-100"
              iconColor="text-secondary-600"
            />
            <ExpenseCard 
              icon={Coffee} 
              title="Coffee" 
              subtitle="8:00 AM" 
              amount="-$4.50"
            />
          </View>
        </View>

        {/* Content */}
        <View className="pb-8">
          <Text className="text-2xl text-typography-900 font-heading mb-3">
            Track Every Expense
          </Text>
          <Text className="text-base text-typography-500 font-body leading-6">
            From textbooks to tuition, log your spending efficiently. Knowledge is power.
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
          action="secondary"
          className="w-full rounded-2xl bg-background-0 border border-outline-200 mb-6"
          onPress={handleContinue}
        >
          <ButtonText className="text-lg text-typography-900 font-inter-medium">Continue</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}
