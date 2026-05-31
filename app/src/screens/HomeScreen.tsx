import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { PrimaryButton } from '../components/PrimaryButton';
import { ReadinessCard } from '../components/ReadinessCard';
import { useT } from '../i18n';
import type { RootTabParamList } from '../navigation/AppTabs';
import { useProgressStore } from '../store/progressStore';
import { colors, spacing } from '../theme';
import { questions, sectionCounts } from '../utils/questions';

type HomeScreenProps = BottomTabScreenProps<RootTabParamList, 'HomeTab'>;

export function HomeScreen({ navigation }: HomeScreenProps) {
  const t = useT();
  const attempts = useProgressStore((state) => state.attempts);
  const latestAttempt = attempts[0];
  const totalAnswered = attempts.reduce((sum, attempt) => sum + attempt.total, 0);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.eyebrow}>{t.home.eyebrow}</Text>
      <Text style={styles.title}>Network Infrastructure Trainer</Text>
      <Text style={styles.body}>{t.home.intro}</Text>

      <View style={styles.startPanel}>
        <Text style={styles.startEyebrow}>{t.home.startEyebrow}</Text>
        <Text style={styles.startTitle}>{t.home.startTitle}</Text>
        <View style={styles.stepList}>
          <StepItem number="1" title={t.home.step1Title} body={t.home.step1Body} />
          <StepItem number="2" title={t.home.step2Title} body={t.home.step2Body} />
          <StepItem number="3" title={t.home.step3Title} body={t.home.step3Body} />
        </View>
        <View style={styles.startActions}>
          <PrimaryButton onPress={() => navigation.navigate('DecoderTab')}>{t.home.openDecoder}</PrimaryButton>
          <PrimaryButton onPress={() => navigation.navigate('PracticeTab')} variant="secondary">
            {t.home.chooseSection}
          </PrimaryButton>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{questions.length}</Text>
          <Text style={styles.statLabel}>{t.home.statQuestions}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{sectionCounts().length}</Text>
          <Text style={styles.statLabel}>{t.home.statSections}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalAnswered}</Text>
          <Text style={styles.statLabel}>{t.home.statAnswered}</Text>
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
          <Text style={styles.panelTitle}>{t.home.latestResult}</Text>
          <Text style={styles.panelBody}>
            {latestAttempt.correct}/{latestAttempt.total} {t.home.correctIn}{' '}
            {latestAttempt.mode === 'mockExam' ? t.nav.mockTitle : latestAttempt.section}
          </Text>
        </View>
      ) : null}

      <View style={styles.disclaimerPanel}>
        <Text style={styles.disclaimerTitle}>{t.home.disclaimerTitle}</Text>
        <Text style={styles.disclaimerText}>{t.home.disclaimerText}</Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton onPress={() => navigation.navigate('PracticeTab')}>{t.home.startPractice}</PrimaryButton>
        <PrimaryButton onPress={() => navigation.navigate('MockExamTab')} variant="secondary">
          {t.home.takeMock}
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
