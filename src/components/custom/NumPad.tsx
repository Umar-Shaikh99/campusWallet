import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';

interface NumPadProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  currencySymbol?: string;
  showDisplay?: boolean;
  className?: string;
}

const keys = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['00', '0', 'delete'],
];

export function NumPad({ 
  value, 
  onChange, 
  maxLength = 8,
  currencySymbol = '₹',
  showDisplay = true,
  className = '' 
}: NumPadProps) {
  const inputRef = useRef<TextInput>(null);
  const [selection, setSelection] = useState({ start: value.length, end: value.length });
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    if (isFocused) {
      const interval = setInterval(() => {
        setCursorVisible((prev) => !prev);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isFocused]);

  // Update selection when value changes
  useEffect(() => {
    // Keep cursor at the end of the new value
    setSelection({ start: value.length, end: value.length });
  }, [value]);

  const handleKeyPress = (key: string) => {
    if (key === 'delete') {
      handleDelete();
    } else {
      const { start, end } = selection;
      const newValue = value.slice(0, start) + key + value.slice(end);
      
      // Remove leading zeros except for single "0"
      let cleanValue = newValue.replace(/^0+/, '') || '0';
      if (cleanValue.length > maxLength) cleanValue = cleanValue.slice(0, maxLength);
      
      const diff = cleanValue.length - value.length;
      const newPosition = Math.max(0, start + diff + (value === '0' ? 0 : 1));
      
      onChange(cleanValue);
      setSelection({ start: newPosition, end: newPosition });
    }
  };

  const handleDelete = () => {
    const { start, end } = selection;
    
    if (start === end) {
      if (start > 0) {
        const newValue = value.slice(0, start - 1) + value.slice(start);
        const cleanValue = newValue || '0';
        onChange(cleanValue);
        setSelection({ start: Math.max(0, start - 1), end: Math.max(0, start - 1) });
      }
    } else {
      const newValue = value.slice(0, start) + value.slice(end);
      const cleanValue = newValue || '0';
      onChange(cleanValue);
      setSelection({ start, end: start });
    }
  };

  const handleSelectionChange = (event: { nativeEvent: { selection: { start: number; end: number } } }) => {
    setSelection(event.nativeEvent.selection);
  };

  const handleDisplayPress = () => {
    inputRef.current?.focus();
    setIsFocused(true);
  };

  const numericValue = parseInt(value, 10) || 0;
  const displayValue = numericValue.toLocaleString('en-IN');

  // Split display into characters for cursor positioning
  const renderDisplayWithCursor = () => {
    const chars = displayValue.split('');
    const cursorPosition = selection.start;
    
    return (
      <View className="flex-row items-baseline justify-center">
        <Text className="text-2xl text-typography-400 mr-2">{currencySymbol}</Text>
        {chars.map((char, index) => (
          <React.Fragment key={index}>
            {index === cursorPosition && isFocused && (
              <Text className={`text-5xl font-bold ${cursorVisible ? 'text-primary-400' : 'text-transparent'}`}>
                |
              </Text>
            )}
            <Text className="text-5xl font-bold text-typography-50">{char}</Text>
          </React.Fragment>
        ))}
        {cursorPosition >= chars.length && isFocused && (
          <Text className={`text-5xl font-bold ${cursorVisible ? 'text-primary-400' : 'text-transparent'}`}>
            |
          </Text>
        )}
      </View>
    );
  };

  return (
    <View className={className}>
      {/* Amount Display with Cursor */}
      {showDisplay && (
        <Pressable 
          onPress={handleDisplayPress}
          className="items-center py-6"
        >
          {renderDisplayWithCursor()}
          
          {/* Hidden TextInput for cursor control */}
          <TextInput
            ref={inputRef}
            value={value}
            onChangeText={onChange}
            onSelectionChange={handleSelectionChange}
            selection={selection}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            keyboardType="numeric"
            showSoftInputOnFocus={false}
            caretHidden={true}
            autoFocus={true}
            style={styles.hiddenInput}
          />
        </Pressable>
      )}

      {/* NumPad Keys */}
      <View className="bg-background-800 rounded-t-3xl px-4 py-6">
        {keys.map((row, rowIndex) => (
          <View key={rowIndex} className="flex-row justify-between gap-3 mb-3">
            {row.map((key) => (
              <Pressable
                key={key}
                onPress={() => handleKeyPress(key)}
                className="flex-1 h-14 items-center justify-center rounded-xl bg-background-700 active:bg-background-600"
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
    </View>
  );
}

const styles = StyleSheet.create({
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    height: 0,
    width: 0,
  },
});
