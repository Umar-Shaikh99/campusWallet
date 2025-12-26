import React from 'react';
import { View } from 'react-native';

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export function StepIndicator({ totalSteps, currentStep }: StepIndicatorProps) {
  return (
    <View className="flex-row items-center justify-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index + 1 === currentStep;
        const isCompleted = index + 1 < currentStep;
        
        return (
          <View
            key={index}
            className={`h-2 rounded-full transition-all ${
              isActive 
                ? 'w-6 bg-primary-500' 
                : isCompleted 
                  ? 'w-2 bg-primary-400' 
                  : 'w-2 bg-outline-600'
            }`}
          />
        );
      })}
    </View>
  );
}
