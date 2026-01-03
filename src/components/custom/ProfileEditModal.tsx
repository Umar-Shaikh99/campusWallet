import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Pressable, TextInput } from 'react-native';
import { Button, ButtonText } from '@/src/components/ui/button';

interface ProfileEditModalProps {
  /** Whether the modal is visible */
  isOpen: boolean;
  /** Current name value */
  currentName: string;
  /** Current college value */
  currentCollege: string;
  /** Callback when modal should close */
  onClose: () => void;
  /** Callback when profile is saved */
  onSave: (name: string, college: string) => void;
}

export function ProfileEditModal({
  isOpen,
  currentName,
  currentCollege,
  onClose,
  onSave,
}: ProfileEditModalProps) {
  const [name, setName] = useState(currentName);
  const [college, setCollege] = useState(currentCollege);

  // Reset values when modal opens
  useEffect(() => {
    if (isOpen) {
      setName(currentName);
      setCollege(currentCollege);
    }
  }, [isOpen, currentName, currentCollege]);

  const handleSave = () => {
    onSave(name, college);
  };

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
          {/* Title */}
          <Text className="text-xl font-bold text-typography-50 text-center mb-6">
            Edit Profile
          </Text>

          {/* Name Input */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-typography-400 mb-2">Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#64748b"
              className="bg-background-800 rounded-xl px-4 py-4 text-base text-typography-50"
            />
          </View>

          {/* College Input */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-typography-400 mb-2">College</Text>
            <View className="flex-row items-center bg-background-800 rounded-xl px-4 py-4">
              <Text className="text-lg mr-2">🏫</Text>
              <TextInput
                value={college}
                onChangeText={setCollege}
                placeholder="Enter your college"
                placeholderTextColor="#64748b"
                className="flex-1 text-base text-typography-50"
              />
            </View>
          </View>

          {/* Buttons */}
          <View className="flex-row gap-3">
            <Pressable 
              className="flex-1 items-center py-4"
              onPress={onClose}
            >
              <Text className="text-base font-medium text-typography-400">Cancel</Text>
            </Pressable>
            <Button
              size="lg"
              className="flex-1 rounded-full bg-primary-500"
              onPress={handleSave}
            >
              <ButtonText className="text-white font-semibold">Save</ButtonText>
            </Button>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
