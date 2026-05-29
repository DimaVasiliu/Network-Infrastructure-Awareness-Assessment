import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '../components/PrimaryButton';
import { QuizRunner } from '../components/QuizRunner';
import { useProgressStore } from '../store/progressStore';
import { colors, spacing } from '../theme';
import type { QuizAttempt } from '../types/progress';
import { buildMockExam, questions } from '../utils/questions';

export function MockExamScreen() {
  const [examQuestions, setExamQuestions] = useState(() => buildMockExam());
  const [isRunning, setIsRunning] = useState(false);
  const addAttempt = useProgressStore((state) => state.addAttempt);
  const passMark = Math.ceil(examQuestions.length * 0.7);

  function startExam() {
    setExamQuestions(buildMockExam());
    setIsRunning(true);
  }

  function completeAttempt(attempt: QuizAttempt) {
    addAttempt(attempt);
  }

  if (isRunning) {
    return (
      <QuizRunner
        mode="mockExam"
        onComplete={completeAttempt}
        onExit={() => setIsRunning(false)}
        questions={examQuestions}
        timerSeconds={30 * 60}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Mock Exam</Text>
      <Text style={styles.body}>
        A timed mock exam uses up to 50 random questions. Current seed bank has {questions.length} questions, so this
        build uses all available questions until the full bank is written.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Exam settings</Text>
        <Text style={styles.cardText}>{examQuestions.length} questions</Text>
        <Text style={styles.cardText}>30 minute timer</Text>
        <Text style={styles.cardText}>Pass mark: {passMark}/{examQuestions.length}</Text>
      </View>

      <PrimaryButton onPress={startExam}>Start Mock Exam</PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  body: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginVertical: spacing.xl,
    padding: spacing.lg,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  cardText: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 24,
  },
});
