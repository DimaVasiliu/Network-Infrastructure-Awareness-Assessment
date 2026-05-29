import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { QuestionStat, QuizAttempt } from '../types/progress';

type ProgressState = {
  attempts: QuizAttempt[];
  bookmarks: string[];
  stats: Record<string, QuestionStat>;
  crashReportingOptOut: boolean;
  addAttempt: (attempt: QuizAttempt) => void;
  clearProgress: () => void;
  toggleBookmark: (questionId: string) => void;
  setCrashReportingOptOut: (optedOut: boolean) => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      attempts: [],
      bookmarks: [],
      stats: {},
      crashReportingOptOut: false,
      addAttempt: (attempt) =>
        set((state) => {
          const nextStats = { ...state.stats };
          for (const answer of attempt.answers) {
            const prior = nextStats[answer.questionId];
            const seen = (prior?.seen ?? 0) + 1;
            const correct = (prior?.correct ?? 0) + (answer.isCorrect ? 1 : 0);
            nextStats[answer.questionId] = {
              seen,
              correct,
              lastSeenAt: attempt.completedAt,
              lastWasCorrect: answer.isCorrect,
            };
          }
          return {
            attempts: [attempt, ...state.attempts].slice(0, 100),
            stats: nextStats,
          };
        }),
      clearProgress: () => set({ attempts: [], stats: {} }),
      toggleBookmark: (questionId) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(questionId)
            ? state.bookmarks.filter((id) => id !== questionId)
            : [questionId, ...state.bookmarks],
        })),
      setCrashReportingOptOut: (optedOut) => set({ crashReportingOptOut: optedOut }),
    }),
    {
      name: 'network-infrastructure-progress',
      storage: createJSONStorage(() => AsyncStorage),
      version: 3,
      migrate: (persisted: unknown) => {
        const previous = (persisted as Partial<ProgressState>) ?? {};
        return {
          attempts: previous.attempts ?? [],
          bookmarks: previous.bookmarks ?? [],
          stats: previous.stats ?? {},
          crashReportingOptOut: previous.crashReportingOptOut ?? false,
        } as ProgressState;
      },
    },
  ),
);
