import React from 'react';
import { View } from 'react-native';

interface StepIndicatorProps {
  /** Total number of steps */
  totalSteps: number;
  /** Current active step (1-indexed) */
  currentStep: number;
  /** Active step color class */
  activeColor?: string;
  /** Completed step color class */
  completedColor?: string;
  /** Inactive step color class */
  inactiveColor?: string;
  /** Active step width class */
  activeWidth?: string;
  /** Inactive step width class */
  inactiveWidth?: string;
  /** Container className */
  className?: string;
}

export function StepIndicator({
  totalSteps,
  currentStep,
  activeColor = 'bg-primary-600',
  completedColor = 'bg-primary-400',
  inactiveColor = 'bg-outline-200',
  activeWidth = 'w-6',
  inactiveWidth = 'w-2',
  className = '',
}: StepIndicatorProps) {
  return (
    <View className={`flex-row items-center justify-center gap-2 ${className}`}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        const colorClass = isActive
          ? activeColor
          : isCompleted
            ? completedColor
            : inactiveColor;

        const widthClass = isActive ? activeWidth : inactiveWidth;

        return (
          <View
            key={index}
            className={`h-2 rounded-full ${widthClass} ${colorClass}`}
          />
        );
      })}
    </View>
  );
}
