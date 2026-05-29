import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { QuizAttempt } from '../types/progress';

type ProgressState = {
  attempts: QuizAttempt[];
  addAttempt: (attempt: QuizAttempt) => void;
  clearProgress: () => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      attempts: [],
      addAttempt: (attempt) =>
        set((state) => ({
          attempts: [attempt, ...state.attempts].slice(0, 100),
        })),
      clearProgress: () => set({ attempts: [] }),
    }),
    {
      name: 'network-infrastructure-progress',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

