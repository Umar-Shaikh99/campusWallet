import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { NumPad } from './NumPad';

interface AmountInputWithCursorProps {
  value: string;
  onChange: (value: string) => void;
  currencySymbol?: string;
  showNumPad?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
}

export function AmountInputWithCursor({
  value,
  onChange,
  currencySymbol = '₹',
  showNumPad = true,
  onFocus,
  onBlur,
  className = '',
}: AmountInputWithCursorProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <View className={className}>
      {showNumPad && isFocused && (
        <NumPad 
          value={value} 
          onChange={onChange}
          currencySymbol={currencySymbol}
          showDisplay={true}
        />
      )}
    </View>
  );
}
