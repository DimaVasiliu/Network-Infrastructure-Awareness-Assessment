import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PrimaryButton } from '../components/PrimaryButton';
import { QuizRunner } from '../components/QuizRunner';
import type { MockExamStackParamList } from '../navigation/AppTabs';
import { useProgressStore } from '../store/progressStore';
import { colors, spacing } from '../theme';
import type { QuizAttempt } from '../types/progress';
import {
  buildMockExam,
  mockExamBlueprint,
  mockExamDurationSeconds,
  mockExamPassMark,
  mockExamQuestionCount,
  questions,
} from '../utils/questions';

type MockExamHomeProps = NativeStackScreenProps<MockExamStackParamList, 'MockExamHome'>;
type MockExamRunProps = NativeStackScreenProps<MockExamStackParamList, 'MockExamRun'>;

export function MockExamScreen({ navigation }: MockExamHomeProps) {
  function startExam() {
    navigation.navigate('MockExamRun');
  }

  return (
    <ScrollView contentContainerStyle={styles.screen} style={styles.container}>
      <Text style={styles.title}>Mock Exam</Text>
      <Text style={styles.body}>
        Matches the published ECS Network Infrastructure Awareness format: 30 questions across the assessment topics,
        45 minutes, pass mark 24 correct answers.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Exam settings</Text>
        <Text style={styles.cardText}>{mockExamQuestionCount} questions from {questions.length} practice questions</Text>
        <Text style={styles.cardText}>45 minute timer</Text>
        <Text style={styles.cardText}>Pass mark: {mockExamPassMark}/{mockExamQuestionCount}</Text>
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

      <PrimaryButton onPress={startExam}>Start Mock Exam</PrimaryButton>
    </ScrollView>
  );
}

export function MockExamRunScreen({ navigation }: MockExamRunProps) {
  const examQuestions = useMemo(() => buildMockExam(), []);
  const addAttempt = useProgressStore((state) => state.addAttempt);

  function completeAttempt(attempt: QuizAttempt) {
    addAttempt(attempt);
  }

  return (
    <QuizRunner
      mode="mockExam"
      onComplete={completeAttempt}
      onExit={() => navigation.goBack()}
      passMark={mockExamPassMark}
      questions={examQuestions}
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
