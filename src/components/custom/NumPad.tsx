import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface NumPadProps {
  onPress: (value: string) => void;
  onDelete: () => void;
  className?: string;
}

const keys = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['00', '0', 'delete'],
];

export function NumPad({ onPress, onDelete, className = '' }: NumPadProps) {
  const handleKeyPress = (key: string) => {
    if (key === 'delete') {
      onDelete();
    } else {
      onPress(key);
    }
  };

  return (
    <View className={`bg-background-800 rounded-t-3xl px-4 py-6 ${className}`}>
      {keys.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row justify-center gap-4 mb-4">
          {row.map((key) => (
            <Pressable
              key={key}
              onPress={() => handleKeyPress(key)}
              className="w-24 h-14 items-center justify-center rounded-xl bg-background-700 active:bg-background-600"
            >
              {key === 'delete' ? (
                <Text className="text-xl text-typography-200">⌫</Text>
              ) : (
                <Text className="text-2xl font-semibold text-typography-100">{key}</Text>
              )}
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}
