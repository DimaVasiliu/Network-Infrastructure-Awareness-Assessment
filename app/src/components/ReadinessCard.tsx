import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useT, type Translations } from '../i18n';
import { useProgressStore } from '../store/progressStore';
import { colors, spacing } from '../theme';
import { computeReadiness, mockReadyThreshold } from '../utils/readiness';
import type { ReadinessReport } from '../utils/readiness';

function localisedSuggestion(report: ReadinessReport, s: Translations['readiness']['suggestions']): string {
  const { overall, weakest, mockReady } = report;
  if (weakest === null) return s.start;
  if (mockReady) return s.mockReady;
  if (weakest.score < 50) return s.weakWeakest.replace('{section}', weakest.section);
  if (weakest.score < mockReadyThreshold) {
    return s.nearlyWeakest
      .replace('{section}', weakest.section)
      .replace('{threshold}', String(mockReadyThreshold));
  }
  if (overall < mockReadyThreshold) return s.keepPracticing;
  return s.solid;
}

type ReadinessCardProps = {
  onPracticeWeakest: () => void;
  onStartMock: () => void;
  onOpenPractice: () => void;
};

export function ReadinessCard({ onPracticeWeakest, onStartMock, onOpenPractice }: ReadinessCardProps) {
  const t = useT();
  const stats = useProgressStore((state) => state.stats);
  const report = useMemo(() => computeReadiness(stats), [stats]);

  const tint = scoreColor(report.overall);
  const hasData = report.weakest !== null;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.eyebrow}>{t.readiness.eyebrow}</Text>
        <Text style={[styles.scoreValue, { color: tint }]}>{report.overall}%</Text>
      </View>

      <View style={styles.barTrack}>
        <View style={[styles.barFill, { backgroundColor: tint, width: `${report.overall}%` }]} />
      </View>

      <Text style={styles.suggestion}>{localisedSuggestion(report, t.readiness.suggestions)}</Text>

      {hasData ? (
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>{t.readiness.weakestTopic}</Text>
          <Text style={styles.metaValue}>
            {report.weakest!.section} · {report.weakest!.score}%
          </Text>
        </View>
      ) : null}

      <View style={styles.actions}>
        {pickAction(report, { onPracticeWeakest, onStartMock, onOpenPractice }, t.readiness)}
      </View>

      <Text style={styles.footer}>{t.readiness.footer}</Text>
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
  labels: Translations['readiness'],
) {
  if (report.weakest === null) {
    return <ActionButton label={labels.openPractice} onPress={actions.onOpenPractice} />;
  }
  if (report.mockReady) {
    return <ActionButton label={labels.takeMock} onPress={actions.onStartMock} primary />;
  }
  return <ActionButton label={labels.do10Weakest} onPress={actions.onPracticeWeakest} primary />;
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
