import { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PrimaryButton } from '../components/PrimaryButton';
import { QuizRunner } from '../components/QuizRunner';
import type { QuizSnapshot } from '../components/QuizRunner';
import type { MockExamStackParamList } from '../navigation/AppTabs';
import { useProgressStore } from '../store/progressStore';
import { colors, spacing } from '../theme';
import type { Question } from '../types/question';
import type { QuizAttempt } from '../types/progress';
import {
  buildMockExam,
  mockExamBlueprint,
  mockExamDurationSeconds,
  mockExamPassMark,
  mockExamQuestionCount,
  questionMap,
  questions,
} from '../utils/questions';

type MockExamHomeProps = NativeStackScreenProps<MockExamStackParamList, 'MockExamHome'>;
type MockExamRunProps = NativeStackScreenProps<MockExamStackParamList, 'MockExamRun'>;

function formatRemaining(seconds: number) {
  const safe = Math.max(0, Math.round(seconds));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${m}m ${s.toString().padStart(2, '0')}s`;
}

export function MockExamScreen({ navigation }: MockExamHomeProps) {
  const mockSession = useProgressStore((state) => state.mockSession);
  const clearMockSession = useProgressStore((state) => state.clearMockSession);

  function startExam() {
    navigation.navigate('MockExamRun');
  }

  function discardSession() {
    Alert.alert('Discard saved attempt?', 'The paused mock exam will be cleared.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Discard', style: 'destructive', onPress: clearMockSession },
    ]);
  }

  const answered = mockSession ? Object.keys(mockSession.answers).length : 0;

  return (
    <ScrollView contentContainerStyle={styles.screen} style={styles.container}>
      <Text style={styles.title}>Mock Exam</Text>
      <Text style={styles.body}>
        Matches the published Network Infrastructure Awareness format: 30 questions across the assessment
        topics, 45 minutes, pass mark 24 correct answers.
      </Text>

      {mockSession ? (
        <View style={styles.resumePanel}>
          <Text style={styles.resumeTitle}>Resume in-progress mock</Text>
          <Text style={styles.resumeText}>
            {answered}/{mockSession.questionIds.length} answered ·{' '}
            {formatRemaining(mockSession.remainingSeconds)} left on the clock
          </Text>
          <View style={styles.resumeActions}>
            <PrimaryButton onPress={startExam}>Resume mock exam</PrimaryButton>
            <PrimaryButton onPress={discardSession} variant="danger">
              Discard
            </PrimaryButton>
          </View>
        </View>
      ) : null}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Exam settings</Text>
        <Text style={styles.cardText}>
          {mockExamQuestionCount} questions from {questions.length} practice questions
        </Text>
        <Text style={styles.cardText}>45 minute timer</Text>
        <Text style={styles.cardText}>
          Pass mark: {mockExamPassMark}/{mockExamQuestionCount}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Topic weighting</Text>
        {mockExamBlueprint.map((item) => (
          <View key={item.section} style={styles.blueprintRow}>
            <Text style={styles.blueprintSection}>{item.section}</Text>
            <Text style={styles.blueprintCount}>{item.count}</Text>
          </View>
        ))}
      </View>

      {mockSession ? null : <PrimaryButton onPress={startExam}>Start Mock Exam</PrimaryButton>}
    </ScrollView>
  );
}

export function MockExamRunScreen({ navigation }: MockExamRunProps) {
  const mockSession = useProgressStore((state) => state.mockSession);
  const saveMockSession = useProgressStore((state) => state.saveMockSession);
  const clearMockSession = useProgressStore((state) => state.clearMockSession);
  const addAttempt = useProgressStore((state) => state.addAttempt);

  // Build a fresh exam OR rehydrate the persisted one. Captured once on mount
  // so changes to the saved session don't reshuffle questions mid-attempt.
  const [examQuestions] = useState<Question[]>(() => {
    if (mockSession) {
      const rehydrated = mockSession.questionIds
        .map((id) => questionMap[id])
        .filter((q): q is Question => Boolean(q));
      if (rehydrated.length === mockSession.questionIds.length) {
        return rehydrated;
      }
      // Saved exam references unknown ids (rare). Fall through to fresh exam.
    }
    return buildMockExam();
  });

  const resumeFrom = useMemo<QuizSnapshot | undefined>(() => {
    if (!mockSession) return undefined;
    return {
      answers: mockSession.answers,
      currentIndex: mockSession.currentIndex,
      remainingSeconds: mockSession.remainingSeconds,
    };
    // intentionally NOT depending on mockSession changes after mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function persistSnapshot(snapshot: QuizSnapshot) {
    saveMockSession({
      questionIds: examQuestions.map((q) => q.id),
      answers: snapshot.answers,
      currentIndex: snapshot.currentIndex,
      remainingSeconds: snapshot.remainingSeconds ?? 0,
      savedAt: new Date().toISOString(),
    });
  }

  function completeAttempt(attempt: QuizAttempt) {
    addAttempt(attempt);
    clearMockSession();
  }

  return (
    <QuizRunner
      mode="mockExam"
      onComplete={completeAttempt}
      onExit={() => navigation.goBack()}
      onSnapshot={persistSnapshot}
      passMark={mockExamPassMark}
      questions={examQuestions}
      resumeFrom={resumeFrom}
      timerSeconds={mockExamDurationSeconds}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screen: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingBottom: 96,
    paddingTop: spacing.xl,
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
  resumePanel: {
    backgroundColor: colors.primarySoft,
    borderRadius: 8,
    marginTop: spacing.xl,
    padding: spacing.lg,
  },
  resumeTitle: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  resumeText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.xs,
  },
  resumeActions: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginTop: spacing.xl,
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
  blueprintRow: {
    alignItems: 'center',
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  blueprintSection: {
    color: colors.text,
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    paddingRight: spacing.md,
  },
  blueprintCount: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '900',
  },
});
