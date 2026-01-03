import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Icon } from '@/src/components/ui/icon';
import { ArrowLeft, Building2, Home, Check } from 'lucide-react-native';
import { useOnboardingStore } from '@/src/app/stores/useOnboardingStore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '@/src/navigation/types';
import type { LivingType } from '@/src/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'HousingSituation'>;

interface HousingOption {
  id: LivingType;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
}

const HOUSING_OPTIONS: HousingOption[] = [
  { id: 'hostel', title: 'Hostel/PG', subtitle: 'Room & Board', icon: Building2 },
  { id: 'home', title: 'Home', subtitle: 'With Family', icon: Home },
];

function HousingCard({
  option,
  isSelected,
  onPress,
}: {
  option: HousingOption;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center rounded-2xl border-2 px-4 py-4 mb-3 ${
        isSelected
          ? 'border-primary-600 bg-primary-50'
          : 'border-outline-200 bg-background-0'
      }`}
    >
      <View
        className={`h-12 w-12 items-center justify-center rounded-xl mr-4 ${
          isSelected ? 'bg-primary-100' : 'bg-background-100'
        }`}
      >
        <Icon
          as={option.icon}
          size="md"
          className={isSelected ? 'text-primary-600' : 'text-typography-500'}
        />
      </View>
      <View className="flex-1">
        <Text className={`text-base font-inter-medium ${isSelected ? 'text-typography-900' : 'text-typography-800'}`}>
          {option.title}
        </Text>
        <Text className="text-sm text-typography-400 font-body">
          {option.subtitle}
        </Text>
      </View>
      {isSelected && (
        <Icon as={Check} size="md" className="text-primary-600" />
      )}
    </Pressable>
  );
}

export function HousingSituationScreen({ navigation }: Props) {
  const { onboardingData, setLivingType } = useOnboardingStore();

  const handleConfirm = () => {
    navigation.navigate('CategorySetup');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <View className="flex-1 px-6 pt-4">
        {/* Header */}
        <Pressable onPress={handleBack} className="p-2 -ml-2 mb-4">
          <Icon as={ArrowLeft} size="md" className="text-typography-600" />
        </Pressable>

        {/* Title */}
        <Text className="text-2xl text-typography-900 font-heading mb-2">
          Housing Situation
        </Text>
        <Text className="text-base text-typography-500 font-body mb-8">
          Select your current living arrangement to calibrate categories.
        </Text>

        {/* Housing options */}
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {HOUSING_OPTIONS.map((option) => (
            <HousingCard
              key={option.id}
              option={option}
              isSelected={onboardingData.livingType === option.id}
              onPress={() => setLivingType(option.id)}
            />
          ))}
        </ScrollView>

        {/* Bottom buttons */}
        <View className="pt-4 pb-2">
          <Button
            size="xl"
            action="primary"
            className="w-full rounded-2xl bg-primary-600 mb-3"
            onPress={handleConfirm}
          >
            <ButtonText className="text-lg text-white font-inter-semibold">
              Confirm Selection
            </ButtonText>
          </Button>

          <Pressable onPress={handleBack} className="py-3">
            <Text className="text-center text-base text-typography-500 font-body">
              Go Back
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
