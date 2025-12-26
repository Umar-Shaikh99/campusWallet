/**
 * ExpenseApp - React Native CLI Boilerplate
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { GluestackUIProvider } from '@/src/components/ui/gluestack-ui-provider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from '@/src/navigation/RootNavigator';
import '@/global.css';

function App(): React.JSX.Element {
  return (
    <GluestackUIProvider mode="dark">
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}

export default App;
