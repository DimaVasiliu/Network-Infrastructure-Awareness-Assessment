import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { MockSessionSnapshot, QuestionStat, QuizAttempt } from '../types/progress';

type ProgressState = {
  attempts: QuizAttempt[];
  bookmarks: string[];
  stats: Record<string, QuestionStat>;
  crashReportingOptOut: boolean;
  mockSession: MockSessionSnapshot | null;
  addAttempt: (attempt: QuizAttempt) => void;
  clearProgress: () => void;
  toggleBookmark: (questionId: string) => void;
  setCrashReportingOptOut: (optedOut: boolean) => void;
  saveMockSession: (snapshot: MockSessionSnapshot) => void;
  clearMockSession: () => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      attempts: [],
      bookmarks: [],
      stats: {},
      crashReportingOptOut: false,
      mockSession: null,
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
      saveMockSession: (snapshot) => set({ mockSession: snapshot }),
      clearMockSession: () => set({ mockSession: null }),
    }),
    {
      name: 'network-infrastructure-progress',
      storage: createJSONStorage(() => AsyncStorage),
      version: 4,
      migrate: (persisted: unknown) => {
        const previous = (persisted as Partial<ProgressState>) ?? {};
        return {
          attempts: previous.attempts ?? [],
          bookmarks: previous.bookmarks ?? [],
          stats: previous.stats ?? {},
          crashReportingOptOut: previous.crashReportingOptOut ?? false,
          mockSession: previous.mockSession ?? null,
        } as ProgressState;
      },
    },
  ),
);
