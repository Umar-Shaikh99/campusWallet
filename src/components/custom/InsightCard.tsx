import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '@/src/components/ui/icon';

interface InsightCardProps {
  /** Icon component to display */
  icon: React.ComponentType<any>;
  /** Card title */
  title: string;
  /** Description with optional highlighted text */
  children: React.ReactNode;
  /** Icon background color class */
  iconBgColor?: string;
  /** Icon color class */
  iconColor?: string;
  /** Container className */
  className?: string;
}

export function InsightCard({
  icon,
  title,
  children,
  iconBgColor = 'bg-primary-500/20',
  iconColor = 'text-primary-400',
  className = '',
}: InsightCardProps) {
  return (
    <View className={`bg-background-900 rounded-2xl p-4 border border-outline-800 ${className}`}>
      <View className="flex-row items-center">
        {/* Icon */}
        <View className={`w-14 h-14 rounded-xl items-center justify-center ${iconBgColor}`}>
          <Icon as={icon} size="lg" className={iconColor} />
        </View>

        {/* Content */}
        <View className="flex-1 ml-4">
          <Text className="text-lg font-bold text-typography-50 mb-1">
            {title}
          </Text>
          <Text className="text-sm text-typography-400 leading-5">
            {children}
          </Text>
        </View>
      </View>
    </View>
  );
}

interface HighlightTextProps {
  children: React.ReactNode;
}

/** Helper component for highlighting text within InsightCard description */
export function HighlightText({ children }: HighlightTextProps) {
  return (
    <Text className="font-semibold text-typography-100">{children}</Text>
  );
}
