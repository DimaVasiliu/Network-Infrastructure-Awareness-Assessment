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
