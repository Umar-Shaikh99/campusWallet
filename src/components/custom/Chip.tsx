import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { Icon } from '@/src/components/ui/icon';

interface ChipProps extends ViewProps {
  /** Label text */
  label: string;
  /** Optional icon component (Lucide or any SVG component) */
  icon?: React.ComponentType<any>;
  /** Chip variant */
  variant?: 'filled' | 'outlined';
  /** Chip size */
  size?: 'sm' | 'md' | 'lg';
  /** Background color class (for filled variant) */
  bgColor?: string;
  /** Border color class (for outlined variant) */
  borderColor?: string;
  /** Text color class */
  textColor?: string;
  /** Icon color class */
  iconColor?: string;
  /** Container className */
  className?: string;
}

const sizeClasses = {
  sm: { container: 'px-3 py-2', text: 'text-xs', icon: 'sm' as const },
  md: { container: 'px-4 py-3', text: 'text-sm', icon: 'sm' as const },
  lg: { container: 'px-5 py-4', text: 'text-base', icon: 'md' as const },
};

export function Chip({
  label,
  icon,
  variant = 'filled',
  size = 'md',
  bgColor = 'bg-background-100',
  borderColor = 'border-outline-200',
  textColor = 'text-typography-700',
  iconColor = 'text-typography-500',
  className = '',
  ...viewProps
}: ChipProps) {
  const sizes = sizeClasses[size];

  const containerClasses =
    variant === 'filled'
      ? `${bgColor} ${sizes.container}`
      : `bg-transparent border ${borderColor} ${sizes.container}`;

  return (
    <View
      {...viewProps}
      className={`flex-row items-center gap-3 rounded-xl ${containerClasses} ${className}`}
    >
      {icon && <Icon as={icon} size={sizes.icon} className={iconColor} />}
      <Text className={`${sizes.text} font-medium ${textColor}`}>{label}</Text>
    </View>
  );
}
