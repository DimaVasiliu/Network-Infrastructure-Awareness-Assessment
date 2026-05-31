import { Linking, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import appJson from '../../app.json';
import { languageNames, useLanguage, useSetLanguage, useT, type Language } from '../i18n';
import { useProgressStore } from '../store/progressStore';
import { colors, spacing } from '../theme';

const SUPPORT_EMAIL = 'support@timrx.live';
const PRIVACY_URL = 'https://timrx.live/legal/nia/privacy';
const TERMS_URL = 'https://timrx.live/legal/nia/terms';
const REFUND_URL = 'https://timrx.live/legal/nia/refunds';
const EULA_URL = 'https://timrx.live/legal/nia/eula';

const appVersion = appJson.expo.version;
const LANGUAGE_ORDER: Language[] = ['en', 'ro', 'ru'];

export function SettingsScreen() {
  const t = useT();
  const language = useLanguage();
  const setLanguage = useSetLanguage();
  const crashReportingOptOut = useProgressStore((state) => state.crashReportingOptOut);
  const setCrashReportingOptOut = useProgressStore((state) => state.setCrashReportingOptOut);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>{t.settings.aboutTitle}</Text>
      <Text style={styles.body}>{t.settings.aboutBody}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t.settings.languageTitle}</Text>
        <Text style={styles.cardText}>{t.settings.languageSub}</Text>
        <View style={styles.languageRow}>
          {LANGUAGE_ORDER.map((item) => {
            const isActive = item === language;
            return (
              <Pressable
                key={item}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
                accessibilityLabel={languageNames[item]}
                onPress={() => setLanguage(item)}
                style={[styles.languageButton, isActive && styles.activeLanguageButton]}
              >
                <Text style={[styles.languageLabel, isActive && styles.activeLanguageLabel]}>
                  {languageNames[item]}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t.settings.appInfoTitle}</Text>
        <Row label={t.settings.version} value={appVersion} />
        <Row label={t.settings.build} value={t.settings.buildValue} />
        <Row label={t.settings.data} value={t.settings.dataValue} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t.settings.supportTitle}</Text>
        <LinkRow
          label={t.settings.emailSupport}
          value={SUPPORT_EMAIL}
          onPress={() => Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=NIA Trainer support`)}
        />
        <LinkRow
          label={t.settings.privacyPolicy}
          value={PRIVACY_URL}
          onPress={() => Linking.openURL(PRIVACY_URL)}
        />
        <LinkRow label={t.settings.termsOfUse} value={TERMS_URL} onPress={() => Linking.openURL(TERMS_URL)} />
        <LinkRow
          label={t.settings.refundPolicy}
          value={REFUND_URL}
          onPress={() => Linking.openURL(REFUND_URL)}
        />
        <LinkRow label={t.settings.eula} value={EULA_URL} onPress={() => Linking.openURL(EULA_URL)} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t.settings.privacyControlsTitle}</Text>
        <View style={styles.toggleRow}>
          <View style={styles.toggleText}>
            <Text style={styles.toggleLabel}>{t.settings.crashLabel}</Text>
            <Text style={styles.toggleSub}>{t.settings.crashSub}</Text>
          </View>
          <Switch
            accessibilityLabel={t.settings.crashLabel}
            onValueChange={(value) => setCrashReportingOptOut(!value)}
            value={!crashReportingOptOut}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t.settings.disclaimerTitle}</Text>
        <Text style={styles.cardText}>{t.settings.disclaimerText}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t.settings.deepLinksTitle}</Text>
        <Text style={styles.cardText}>networktrainer://practice/fire-regulations</Text>
        <Text style={styles.cardText}>networktrainer://practice/focus/weakest</Text>
        <Text style={styles.cardText}>networktrainer://mock-exam</Text>
      </View>

      <Text style={styles.footer}>
        © {new Date().getFullYear()} {t.settings.footer}
      </Text>
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
  languageRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  languageButton: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    paddingVertical: spacing.sm,
  },
  activeLanguageButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  languageLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  activeLanguageLabel: {
    color: colors.background,
  },
});
