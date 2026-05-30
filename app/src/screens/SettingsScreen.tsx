import { Linking, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import appJson from '../../app.json';
import { useProgressStore } from '../store/progressStore';
import { colors, spacing } from '../theme';

const SUPPORT_EMAIL = 'support@timrx.live';
const PRIVACY_URL = 'https://timrx.live/legal/nia/privacy';
const TERMS_URL = 'https://timrx.live/legal/nia/terms';
const REFUND_URL = 'https://timrx.live/legal/nia/refunds';
const EULA_URL = 'https://timrx.live/legal/nia/eula';

const appVersion = appJson.expo.version;

export function SettingsScreen() {
  const crashReportingOptOut = useProgressStore((state) => state.crashReportingOptOut);
  const setCrashReportingOptOut = useProgressStore((state) => state.setCrashReportingOptOut);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.body}>
        Network Infrastructure Trainer is an independent offline study aid for the UK Network Infrastructure
        Awareness Assessment.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>App information</Text>
        <Row label="Version" value={appVersion} />
        <Row label="Build" value="Production" />
        <Row label="Data" value="Stored only on this device" />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Support</Text>
        <LinkRow
          label="Email support"
          value={SUPPORT_EMAIL}
          onPress={() => Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=NIA Trainer support`)}
        />
        <LinkRow label="Privacy policy" value={PRIVACY_URL} onPress={() => Linking.openURL(PRIVACY_URL)} />
        <LinkRow label="Terms of use" value={TERMS_URL} onPress={() => Linking.openURL(TERMS_URL)} />
        <LinkRow label="Refund policy" value={REFUND_URL} onPress={() => Linking.openURL(REFUND_URL)} />
        <LinkRow label="EULA" value={EULA_URL} onPress={() => Linking.openURL(EULA_URL)} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Privacy controls</Text>
        <View style={styles.toggleRow}>
          <View style={styles.toggleText}>
            <Text style={styles.toggleLabel}>Send anonymous crash reports</Text>
            <Text style={styles.toggleSub}>
              Helps us fix crashes. No personal data, no usage tracking. Off here means no crash data leaves
              your device.
            </Text>
          </View>
          <Switch
            accessibilityLabel="Send anonymous crash reports"
            onValueChange={(value) => setCrashReportingOptOut(!value)}
            value={!crashReportingOptOut}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Disclaimer</Text>
        <Text style={styles.cardText}>
          This app is an independent study aid. It is not affiliated with, endorsed by, or sponsored by The
          JIB or the Electrotechnical Certification Scheme. "ECS" is a trademark of The JIB.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Deep links</Text>
        <Text style={styles.cardText}>networktrainer://practice/fire-regulations</Text>
        <Text style={styles.cardText}>networktrainer://practice/focus/weakest</Text>
        <Text style={styles.cardText}>networktrainer://mock-exam</Text>
      </View>

      <Text style={styles.footer}>© {new Date().getFullYear()} Network Infrastructure Trainer</Text>
    </ScrollView>
  );
}

type RowProps = {
  label: string;
  value: string;
};

function Row({ label, value }: RowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

type LinkRowProps = RowProps & {
  onPress: () => void;
};

function LinkRow({ label, value, onPress }: LinkRowProps) {
  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={`${label}: ${value}`}
      onPress={onPress}
      style={styles.row}
    >
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, styles.rowLink]}>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flexGrow: 1,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
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
    lineHeight: 22,
    marginTop: spacing.xs,
  },
  row: {
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  rowLabel: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700',
    paddingRight: spacing.md,
  },
  rowValue: {
    color: colors.text,
    flex: 1,
    fontSize: 14,
    textAlign: 'right',
  },
  rowLink: {
    color: colors.primary,
    fontWeight: '700',
  },
  footer: {
    color: colors.muted,
    fontSize: 12,
    marginTop: spacing.xl,
    textAlign: 'center',
  },
  toggleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  toggleText: {
    flex: 1,
  },
  toggleLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  toggleSub: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: spacing.xs,
  },
});
