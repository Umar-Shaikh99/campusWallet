import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({
  id: 'expenseapp-storage',
  encryptionKey: undefined, // Add encryption key for enhanced security if needed
});

// Helper function for storing complex data
export const mmkvStorage = {
  getItem: (key: string): string | null => {
    const value = storage.getString(key);
    return value ?? null;
  },
  setItem: (key: string, value: string): void => {
    storage.set(key, value);
  },
  removeItem: (key: string): void => {
    storage.remove(key);
  },
};
