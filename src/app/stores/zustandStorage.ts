import { StateStorage } from 'zustand/middleware';
import { mmkvStorage } from './storage';

// Custom Zustand storage adapter using MMKV
export const zustandMMKVStorage: StateStorage = {
  getItem: (name: string): string | null => {
    return mmkvStorage.getItem(name);
  },
  setItem: (name: string, value: string): void => {
    mmkvStorage.setItem(name, value);
  },
  removeItem: (name: string): void => {
    mmkvStorage.removeItem(name);
  },
};
