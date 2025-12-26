import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme, View, StyleSheet } from 'react-native';
import { config } from './config';

type GluestackUIContextType = {
  colorMode: 'dark' | 'light';
  setColorMode: (mode: 'dark' | 'light') => void;
};

const GluestackUIContext = createContext<GluestackUIContextType>({
  colorMode: 'light',
  setColorMode: () => {},
});

export const useGluestackUIContext = () => useContext(GluestackUIContext);

interface GluestackUIProviderProps {
  mode?: 'dark' | 'light';
  children?: React.ReactNode;
}

export function GluestackUIProvider({ mode = 'light', children }: GluestackUIProviderProps) {
  const colorScheme = useColorScheme();
  const [colorMode, setColorMode] = useState<'dark' | 'light'>(mode);

  useEffect(() => {
    if (mode) {
      setColorMode(mode);
    } else if (colorScheme === 'dark' || colorScheme === 'light') {
      setColorMode(colorScheme);
    }
  }, [colorScheme, mode]);

  return (
    <GluestackUIContext.Provider value={{ colorMode, setColorMode }}>
      <View style={[styles.container, config[colorMode]]}>
        {children}
      </View>
    </GluestackUIContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
