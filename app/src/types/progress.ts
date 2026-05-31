import type { AnswerChoice, QuestionSection } from './question';

export type QuizMode = 'practice' | 'mockExam';

export type AttemptAnswer = {
  questionId: string;
  selectedAnswer?: AnswerChoice;
  correctAnswer: AnswerChoice;
  isCorrect: boolean;
};

export type QuizAttempt = {
  id: string;
  mode: QuizMode;
  section?: QuestionSection;
  total: number;
  correct: number;
  durationSeconds: number;
  completedAt: string;
  answers: AttemptAnswer[];
};

export type QuestionStat = {
  seen: number;
  correct: number;
  lastSeenAt: string;
  lastWasCorrect: boolean;
};

/**
 * A paused mock-exam attempt. Persisted so the user can come back after
 * closing the app or switching tabs without losing progress.
 */
export type MockSessionSnapshot = {
  questionIds: string[];
  answers: Record<string, AnswerChoice>;
  choiceOrders?: Record<string, AnswerChoice[]>;
  currentIndex: number;
  remainingSeconds: number;
  savedAt: string;
};
