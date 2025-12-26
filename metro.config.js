const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add resolver to handle react-dom imports for @react-aria compatibility
config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    ...config.resolver?.extraNodeModules,
    'react-dom': path.resolve(__dirname, 'src/utils/react-dom-shim.js'),
  },
};

module.exports = withNativeWind(config, { input: './global.css' });
