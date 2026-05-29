import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '../components/PrimaryButton';
import { useProgressStore } from '../store/progressStore';
import { colors, spacing } from '../theme';
import { questions, sectionCounts } from '../utils/questions';

type HomeScreenProps = {
  navigate: (tab: 'home' | 'practice' | 'mockExam' | 'stats') => void;
};

export function HomeScreen({ navigate }: HomeScreenProps) {
  const attempts = useProgressStore((state) => state.attempts);
  const latestAttempt = attempts[0];
  const totalAnswered = attempts.reduce((sum, attempt) => sum + attempt.total, 0);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.eyebrow}>Study mode</Text>
      <Text style={styles.title}>Network Infrastructure Trainer</Text>
      <Text style={styles.body}>Practice by topic, take a timed mock exam, and review weak areas.</Text>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{questions.length}</Text>
          <Text style={styles.statLabel}>Questions</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{sectionCounts().length}</Text>
          <Text style={styles.statLabel}>Sections</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalAnswered}</Text>
          <Text style={styles.statLabel}>Answered</Text>
        </View>
      </View>

      {latestAttempt ? (
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Latest result</Text>
          <Text style={styles.panelBody}>
            {latestAttempt.correct}/{latestAttempt.total} correct in{' '}
            {latestAttempt.mode === 'mockExam' ? 'Mock Exam' : latestAttempt.section}
          </Text>
        </View>
      ) : (
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Start here</Text>
        <Text style={styles.panelBody}>Use Practice first, then take Mock Exam once you have covered the sections.</Text>
      </View>
      )}

      <View style={styles.disclaimerPanel}>
        <Text style={styles.disclaimerTitle}>Independent study aid</Text>
        <Text style={styles.disclaimerText}>
          This app is not affiliated with, endorsed by, or sponsored by The JIB or the Electrotechnical
          Certification Scheme. ECS is a trademark of The JIB.
        </Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton onPress={() => navigate('practice')}>Start Practice</PrimaryButton>
        <PrimaryButton onPress={() => navigate('mockExam')} variant="secondary">
          Take Mock Exam
        </PrimaryButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
  body: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  statCard: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    flex: 1,
    padding: spacing.lg,
  },
  statNumber: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '900',
  },
  statLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  panel: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginTop: spacing.xl,
    padding: spacing.lg,
  },
  panelTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  panelBody: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  disclaimerPanel: {
    backgroundColor: colors.warningSoft,
    borderRadius: 8,
    marginTop: spacing.lg,
    padding: spacing.lg,
  },
  disclaimerTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  disclaimerText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
  },
  actions: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
});
