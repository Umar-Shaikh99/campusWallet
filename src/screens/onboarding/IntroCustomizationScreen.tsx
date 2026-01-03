import React from 'react';
import { View, Text, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Icon } from '@/src/components/ui/icon';
import { ArrowLeft, Settings, Plus, Pencil } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '@/src/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'IntroCustomization'>;

export function IntroCustomizationScreen({ navigation }: Props) {
  const [isEnabled, setIsEnabled] = React.useState(true);

  const handleGetStarted = () => {
    navigation.navigate('HousingSituation');
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

        {/* Illustration - Customization UI mockup */}
        <View className="flex-1 items-center justify-center">
          <View className="w-full max-w-xs bg-background-100 rounded-3xl p-4 border border-outline-100">
            {/* Settings gear icon */}
            <View className="absolute -top-2 -right-2 h-8 w-8 items-center justify-center rounded-lg bg-background-200">
              <Icon as={Settings} size="xs" className="text-typography-500" />
            </View>

            {/* Toggle row */}
            <View className="flex-row items-center justify-between bg-background-0 rounded-xl px-4 py-3 mb-3">
              <View className="flex-row items-center gap-2">
                <View className="h-2 w-8 rounded-full bg-outline-200" />
              </View>
              <Switch
                value={isEnabled}
                onValueChange={setIsEnabled}
                trackColor={{ false: '#e2e8f0', true: '#2563eb' }}
                thumbColor="#ffffff"
              />
            </View>

            {/* Edit row */}
            <View className="flex-row items-center bg-background-0 rounded-xl px-4 py-3 mb-3">
              <Icon as={Pencil} size="xs" className="text-typography-400 mr-3" />
              <View className="h-2 w-16 rounded-full bg-outline-200" />
            </View>

            {/* Add Category row */}
            <View className="flex-row items-center bg-background-0 rounded-xl px-4 py-3">
              <Icon as={Plus} size="xs" className="text-typography-400 mr-3" />
              <Text className="text-sm text-typography-400 font-body">Add Category</Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <View className="pb-8">
          <Text className="text-2xl text-typography-900 font-heading mb-3">
            Complete Customization
          </Text>
          <Text className="text-base text-typography-500 font-body leading-6">
            Add new categories, edit expenses, and toggle tracking on or off. Manage your budget your way.
          </Text>

          {/* Pagination dots */}
          <View className="flex-row items-center gap-2 mt-6">
            <View className="h-2 w-2 rounded-full bg-outline-200" />
            <View className="h-2 w-2 rounded-full bg-outline-200" />
            <View className="h-2 w-6 rounded-full bg-primary-600" />
          </View>
        </View>

        {/* Button */}
        <Button 
          size="xl" 
          action="primary"
          className="w-full rounded-2xl bg-primary-600 mb-6"
          onPress={handleGetStarted}
        >
          <ButtonText className="text-lg text-white font-inter-semibold">Get Started</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}
