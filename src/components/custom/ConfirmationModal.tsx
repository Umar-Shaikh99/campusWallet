import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Icon } from '@/src/components/ui/icon';
import type { LucideIcon } from 'lucide-react-native';

interface ConfirmationModalProps {
  /** Whether the modal is visible */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Callback when confirm button is pressed */
  onConfirm: () => void;
  /** Modal title */
  title: string;
  /** Modal description */
  description: string;
  /** Icon to display */
  icon?: LucideIcon | React.ComponentType<any>;
  /** Icon color class */
  iconColor?: string;
  /** Icon background color class */
  iconBgColor?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Confirm button text */
  confirmText?: string;
  /** Confirm button color class */
  confirmButtonColor?: string;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  icon,
  iconColor = 'text-warning-400',
  iconBgColor = 'bg-warning-500/20',
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  confirmButtonColor = 'bg-primary-500',
}: ConfirmationModalProps) {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable 
        className="flex-1 items-center justify-center bg-black/60 px-6"
        onPress={onClose}
      >
        <Pressable 
          className="w-full bg-background-900 rounded-2xl p-6"
          onPress={(e) => e.stopPropagation()}
        >
          <View className="items-center">
            {/* Icon */}
            {icon && (
              <View className={`w-16 h-16 rounded-full ${iconBgColor} items-center justify-center mb-4`}>
                <Icon as={icon} size="xl" className={iconColor} />
              </View>
            )}
            
            {/* Title */}
            <Text className="text-xl font-bold text-typography-50 text-center mb-2">{title}</Text>
            
            {/* Description */}
            <Text className="text-sm text-typography-400 text-center">{description}</Text>
          </View>

          {/* Buttons */}
          <View className="flex-row gap-3 mt-6">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 rounded-full border-outline-600"
              onPress={onClose}
            >
              <ButtonText className="text-typography-300">{cancelText}</ButtonText>
            </Button>
            <Button
              size="lg"
              className={`flex-1 rounded-full ${confirmButtonColor}`}
              onPress={onConfirm}
            >
              <ButtonText className="text-white">{confirmText}</ButtonText>
            </Button>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
