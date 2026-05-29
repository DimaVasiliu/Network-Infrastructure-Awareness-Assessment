import { useMemo } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '../components/PrimaryButton';
import { useProgressStore } from '../store/progressStore';
import { colors, spacing } from '../theme';
import { sectionAccuracy } from '../utils/questions';

export function StatsScreen() {
  const attempts = useProgressStore((state) => state.attempts);
  const stats = useProgressStore((state) => state.stats);
  const clearProgress = useProgressStore((state) => state.clearProgress);
  const totalAnswered = attempts.reduce((sum, attempt) => sum + attempt.total, 0);
  const totalCorrect = attempts.reduce((sum, attempt) => sum + attempt.correct, 0);
  const averageScore = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const mockAttempts = attempts.filter((attempt) => attempt.mode === 'mockExam');
  const bestMock = mockAttempts.reduce<number | null>((best, attempt) => {
    const score = Math.round((attempt.correct / attempt.total) * 100);
    return best === null ? score : Math.max(best, score);
  }, null);

  const perSection = useMemo(() => sectionAccuracy(stats), [stats]);

  function confirmClear() {
    Alert.alert('Clear progress?', 'This removes attempt history and per-question stats from this device.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', onPress: clearProgress, style: 'destructive' },
    ]);
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Stats</Text>
      <Text style={styles.body}>Progress is stored only on this device.</Text>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.value}>{attempts.length}</Text>
          <Text style={styles.label}>Attempts</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.value}>{averageScore}%</Text>
          <Text style={styles.label}>Average</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.value}>{bestMock === null ? '-' : `${bestMock}%`}</Text>
          <Text style={styles.label}>Best mock</Text>
        </View>
      </View>

      <View style={styles.sectionPanel}>
        <Text style={styles.panelTitle}>By section</Text>
        {perSection.every((row) => row.accuracy === null) ? (
          <Text style={styles.empty}>Section accuracy will appear here once you complete some questions.</Text>
        ) : (
          perSection.map((row) => (
            <View key={row.section} style={styles.sectionRow}>
              <View style={styles.sectionRowText}>
                <Text style={styles.sectionRowTitle}>{row.section}</Text>
                <Text style={styles.sectionRowMeta}>
                  {row.seen === 0 ? 'No data yet' : `${row.correct}/${row.seen} correct`}
                </Text>
              </View>
              <View style={styles.sectionRowRight}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        width: `${row.accuracy ?? 0}%`,
                        backgroundColor: barColor(row.accuracy),
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.sectionRowScore, { color: barColor(row.accuracy) }]}>
                  {row.accuracy === null ? '—' : `${row.accuracy}%`}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>

      <View style={styles.history}>
        <Text style={styles.historyTitle}>Recent attempts</Text>
        {attempts.length === 0 ? (
          <Text style={styles.empty}>Complete a practice section or mock exam to see results here.</Text>
        ) : (
          attempts.slice(0, 10).map((attempt) => (
            <View key={attempt.id} style={styles.historyItem}>
              <View>
                <Text style={styles.historyItemTitle}>
                  {attempt.mode === 'mockExam' ? 'Mock Exam' : attempt.section ?? 'Practice'}
                </Text>
                <Text style={styles.historyItemMeta}>{new Date(attempt.completedAt).toLocaleString()}</Text>
              </View>
              <Text style={styles.historyScore}>
                {attempt.correct}/{attempt.total}
              </Text>
            </View>
          ))
        )}
      </View>

      {attempts.length > 0 ? (
        <PrimaryButton onPress={confirmClear} variant="danger">
          Clear Progress
        </PrimaryButton>
      ) : null}
    </ScrollView>
  );
}

function barColor(accuracy: number | null) {
  if (accuracy === null) return colors.muted;
  if (accuracy >= 80) return colors.success;
  if (accuracy >= 60) return colors.warning;
  return colors.danger;
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
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
  grid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    flex: 1,
    padding: spacing.lg,
  },
  value: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  label: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  sectionPanel: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginTop: spacing.xl,
    padding: spacing.lg,
  },
  panelTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
  sectionRow: {
    alignItems: 'center',
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  sectionRowText: {
    flex: 1,
    paddingRight: spacing.md,
  },
  sectionRowTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  sectionRowMeta: {
    color: colors.muted,
    fontSize: 13,
    marginTop: spacing.xs,
  },
  sectionRowRight: {
    alignItems: 'flex-end',
    minWidth: 120,
  },
  barTrack: {
    backgroundColor: colors.border,
    borderRadius: 4,
    height: 6,
    overflow: 'hidden',
    width: 100,
  },
  barFill: {
    height: '100%',
  },
  sectionRowScore: {
    fontSize: 14,
    fontWeight: '900',
    marginTop: spacing.xs,
  },
  history: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginVertical: spacing.xl,
    padding: spacing.lg,
  },
  historyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: spacing.lg,
  },
  empty: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  historyItem: {
    alignItems: 'center',
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  historyItemTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 21,
  },
  historyItemMeta: {
    color: colors.muted,
    fontSize: 13,
    marginTop: spacing.xs,
  },
  historyScore: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: '900',
    marginLeft: spacing.md,
  },
});
