import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { PrimaryButton } from '../components/PrimaryButton';
import { ReadinessCard } from '../components/ReadinessCard';
import type { RootTabParamList } from '../navigation/AppTabs';
import { useProgressStore } from '../store/progressStore';
import { colors, spacing } from '../theme';
import { questions, sectionCounts } from '../utils/questions';

type HomeScreenProps = BottomTabScreenProps<RootTabParamList, 'HomeTab'>;

export function HomeScreen({ navigation }: HomeScreenProps) {
  const attempts = useProgressStore((state) => state.attempts);
  const latestAttempt = attempts[0];
  const totalAnswered = attempts.reduce((sum, attempt) => sum + attempt.total, 0);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.eyebrow}>Study mode</Text>
      <Text style={styles.title}>Network Infrastructure Trainer</Text>
      <Text style={styles.body}>
        Practice by topic, decode the common cable codes, then test exam readiness.
      </Text>

      <View style={styles.startPanel}>
        <Text style={styles.startEyebrow}>Start here</Text>
        <Text style={styles.startTitle}>Build the basics before the mock exam</Text>
        <View style={styles.stepList}>
          <StepItem
            number="1"
            title="Decode the codes"
            body="Review CPR, EuroClass, fibre sizes and Class EA limits."
          />
          <StepItem
            number="2"
            title="Practise one section"
            body="Work through Product Selection first, then continue by topic."
          />
          <StepItem
            number="3"
            title="Use the mock later"
            body="Take the timed exam after every section has been covered."
          />
        </View>
        <View style={styles.startActions}>
          <PrimaryButton onPress={() => navigation.navigate('DecoderTab')}>Open Code Decoder</PrimaryButton>
          <PrimaryButton onPress={() => navigation.navigate('PracticeTab')} variant="secondary">
            Choose a Section
          </PrimaryButton>
        </View>
      </View>

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

      <View style={styles.readinessSlot}>
        <ReadinessCard
          onOpenPractice={() => navigation.navigate('PracticeTab')}
          onPracticeWeakest={() =>
            navigation.navigate('PracticeTab', {
              screen: 'PracticeFocus',
              params: { focus: 'weakest' },
            })
          }
          onStartMock={() => navigation.navigate('MockExamTab')}
        />
      </View>

      {latestAttempt ? (
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Latest result</Text>
          <Text style={styles.panelBody}>
            {latestAttempt.correct}/{latestAttempt.total} correct in{' '}
            {latestAttempt.mode === 'mockExam' ? 'Mock Exam' : latestAttempt.section}
          </Text>
        </View>
      ) : null}

      <View style={styles.disclaimerPanel}>
        <Text style={styles.disclaimerTitle}>Independent study aid</Text>
        <Text style={styles.disclaimerText}>
          This app is not affiliated with, endorsed by, or sponsored by The JIB or the Electrotechnical
          Certification Scheme. ECS is a trademark of The JIB.
        </Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton onPress={() => navigation.navigate('PracticeTab')}>Start Practice</PrimaryButton>
        <PrimaryButton onPress={() => navigation.navigate('MockExamTab')} variant="secondary">
          Take Mock Exam
        </PrimaryButton>
      </View>
    </ScrollView>
  );
}

function StepItem({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <View style={styles.stepItem}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{number}</Text>
      </View>
      <View style={styles.stepText}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepBody}>{body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
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
  startPanel: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginTop: spacing.xl,
    padding: spacing.lg,
  },
  startEyebrow: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  startTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 26,
    marginTop: spacing.xs,
  },
  stepList: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  stepItem: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.md,
  },
  stepNumber: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: 14,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  stepNumberText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
  },
  stepText: {
    flex: 1,
  },
  stepTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  stepBody: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 2,
  },
  startActions: {
    gap: spacing.sm,
    marginTop: spacing.lg,
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
  readinessSlot: {
    marginTop: spacing.xl,
  },
  panel: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginTop: spacing.lg,
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
