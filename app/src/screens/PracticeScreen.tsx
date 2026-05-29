import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { QuizRunner } from '../components/QuizRunner';
import { useProgressStore } from '../store/progressStore';
import { colors, spacing } from '../theme';
import type { Question } from '../types/question';
import type { QuestionSection } from '../types/question';
import type { QuizAttempt } from '../types/progress';
import { questionsForSection, sectionCounts, shuffleQuestions } from '../utils/questions';

export function PracticeScreen() {
  const [activeSection, setActiveSection] = useState<QuestionSection | null>(null);
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const addAttempt = useProgressStore((state) => state.addAttempt);

  function startSection(section: QuestionSection) {
    setActiveSection(section);
    setSessionQuestions(shuffleQuestions(questionsForSection(section)));
  }

  function exitSection() {
    setActiveSection(null);
    setSessionQuestions([]);
  }

  function completeAttempt(attempt: QuizAttempt) {
    addAttempt(attempt);
  }

  if (activeSection) {
    return (
      <QuizRunner
        mode="practice"
        onComplete={completeAttempt}
        onExit={exitSection}
        questions={sessionQuestions}
        section={activeSection}
        showImmediateFeedback
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Practice</Text>
      <Text style={styles.body}>Choose a section. Practice mode shows the answer explanation immediately.</Text>

      <View style={styles.sectionList}>
        {sectionCounts().map(({ section, count }) => (
          <Pressable
            accessibilityRole="button"
            key={section}
            onPress={() => startSection(section)}
            style={styles.sectionCard}
          >
            <View style={styles.sectionCardText}>
              <Text style={styles.sectionTitle}>{section}</Text>
              <Text style={styles.sectionMeta}>{count} questions</Text>
            </View>
            <Text style={styles.arrow}>Start</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
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
  sectionList: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  sectionCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  sectionCardText: {
    flex: 1,
    paddingRight: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
  },
  sectionMeta: {
    color: colors.muted,
    fontSize: 14,
    marginTop: spacing.xs,
  },
  arrow: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '900',
  },
});
