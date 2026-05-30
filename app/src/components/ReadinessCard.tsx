import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useProgressStore } from '../store/progressStore';
import { colors, spacing } from '../theme';
import { computeReadiness } from '../utils/readiness';
import type { ReadinessReport } from '../utils/readiness';

type ReadinessCardProps = {
  onPracticeWeakest: () => void;
  onStartMock: () => void;
  onOpenPractice: () => void;
};

export function ReadinessCard({ onPracticeWeakest, onStartMock, onOpenPractice }: ReadinessCardProps) {
  const stats = useProgressStore((state) => state.stats);
  const report = useMemo(() => computeReadiness(stats), [stats]);

  const tint = scoreColor(report.overall);
  const hasData = report.weakest !== null;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.eyebrow}>Exam readiness</Text>
        <Text style={[styles.scoreValue, { color: tint }]}>{report.overall}%</Text>
      </View>

      <View style={styles.barTrack}>
        <View style={[styles.barFill, { backgroundColor: tint, width: `${report.overall}%` }]} />
      </View>

      <Text style={styles.suggestion}>{report.suggestion}</Text>

      {hasData ? (
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Weakest topic</Text>
          <Text style={styles.metaValue}>
            {report.weakest!.section} · {report.weakest!.score}%
          </Text>
        </View>
      ) : null}

      <View style={styles.actions}>
        {pickAction(report, { onPracticeWeakest, onStartMock, onOpenPractice })}
      </View>

      <Text style={styles.footer}>Mock-ready when every section ≥ 75% accuracy with enough coverage.</Text>
    </View>
  );
}

function pickAction(
  report: ReadinessReport,
  actions: {
    onPracticeWeakest: () => void;
    onStartMock: () => void;
    onOpenPractice: () => void;
  },
) {
  if (report.weakest === null) {
    return <ActionButton label="Open Practice" onPress={actions.onOpenPractice} />;
  }
  if (report.mockReady) {
    return <ActionButton label="Take Mock Exam" onPress={actions.onStartMock} primary />;
  }
  return <ActionButton label="Do 10 weakest questions" onPress={actions.onPracticeWeakest} primary />;
}

function ActionButton({
  label,
  onPress,
  primary,
}: {
  label: string;
  onPress: () => void;
  primary?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.actionButton, primary ? styles.actionButtonPrimary : styles.actionButtonSecondary]}
    >
      <Text style={[styles.actionLabel, primary ? styles.actionLabelPrimary : styles.actionLabelSecondary]}>
        {label}
      </Text>
    </Pressable>
  );
}

function scoreColor(score: number) {
  if (score >= 75) return colors.success;
  if (score >= 50) return colors.warning;
  return colors.danger;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.lg,
  },
  headerRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  scoreValue: {
    fontSize: 30,
    fontWeight: '900',
  },
  barTrack: {
    backgroundColor: colors.border,
    borderRadius: 4,
    height: 8,
    marginTop: spacing.md,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
  },
  suggestion: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  metaLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  metaValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  actions: {
    marginTop: spacing.lg,
  },
  actionButton: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  actionButtonPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  actionButtonSecondary: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  actionLabel: {
    fontSize: 15,
    fontWeight: '800',
  },
  actionLabelPrimary: {
    color: colors.surface,
  },
  actionLabelSecondary: {
    color: colors.text,
  },
  footer: {
    color: colors.muted,
    fontSize: 12,
    marginTop: spacing.md,
  },
});
