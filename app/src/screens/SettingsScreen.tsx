import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '../theme';

export function SettingsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.body}>Network Infrastructure Trainer is an independent offline study aid.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>About</Text>
        <Text style={styles.cardText}>
          Practice questions, mock exams, and attempt history stay on this device. The app is not affiliated with,
          endorsed by, or sponsored by The JIB or the Electrotechnical Certification Scheme.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Deep links</Text>
        <Text style={styles.cardText}>networktrainer://practice/fire-regulations</Text>
      </View>
    </ScrollView>
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
  },
});
