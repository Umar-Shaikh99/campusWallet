import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandMMKVStorage } from './zustandStorage';

// App state interface (general app settings)
interface AppState {
  isDarkMode: boolean;

  // Actions
  setDarkMode: (isDark: boolean) => void;
  reset: () => void;
}

// Initial state
const initialState = {
  isDarkMode: false,
};

// Create the app store with MMKV persistence
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,

      setDarkMode: (isDark: boolean) => set({ isDarkMode: isDark }),
      reset: () => set(initialState),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
