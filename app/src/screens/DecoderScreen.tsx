import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { cableCodes, searchCableCodes } from '../data/cableCodes';
import type { CableCode } from '../data/cableCodes';
import { colors, spacing } from '../theme';

const CATEGORY_LABELS: Record<CableCode['category'], string> = {
  EuroClass: 'EuroClass',
  Fibre: 'Fibre',
  Channel: 'Channel',
  Ethernet: 'Ethernet',
  Standard: 'Standard',
  Regulation: 'Regulation',
  Bonding: 'Bonding',
};

export function DecoderScreen() {
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const results = useMemo(() => searchCableCodes(query), [query]);

  function toggleOpen(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  function revealAnswer(key: string) {
    setRevealed((prior) => ({ ...prior, [key]: true }));
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Code Decoder</Text>
      <Text style={styles.body}>
        Look up cable codes, standards and regulations. Each entry breaks down what every part of the code
        means, then gives 3 quick questions to test you.
      </Text>

      <TextInput
        accessibilityLabel="Search cable codes"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setQuery}
        placeholder='Try "Cca-s1b", "50/125", "Class EA", "HD 60364"…'
        placeholderTextColor={colors.muted}
        style={styles.search}
        value={query}
      />

      {results.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            No match for "{query.trim()}". Try a shorter term, the cable category letter, or a standard
            number.
          </Text>
        </View>
      ) : (
        results.map((code) => {
          const isOpen = openId === code.id;
          return (
            <View key={code.id} style={styles.card}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ expanded: isOpen }}
                onPress={() => toggleOpen(code.id)}
                style={styles.cardHeader}
              >
                <View style={styles.cardHeaderText}>
                  <Text style={styles.codePill}>{code.codeExample}</Text>
                  <Text style={styles.cardTitle}>{code.title}</Text>
                  <Text style={styles.cardSummary}>{code.summary}</Text>
                </View>
                <View style={styles.cardHeaderRight}>
                  <Text style={styles.categoryTag}>{CATEGORY_LABELS[code.category]}</Text>
                  <Text style={styles.chevron}>{isOpen ? '−' : '+'}</Text>
                </View>
              </Pressable>

              {isOpen ? (
                <View style={styles.cardBody}>
                  <SectionHeading>Parts of the code</SectionHeading>
                  <View style={styles.partsList}>
                    {code.parts.map((part) => (
                      <View key={part.label} style={styles.partRow}>
                        <Text style={styles.partLabel}>{part.label}</Text>
                        <Text style={styles.partMeaning}>{part.meaning}</Text>
                      </View>
                    ))}
                  </View>

                  <SectionHeading>What it means</SectionHeading>
                  <Text style={styles.paragraph}>{code.whatItMeans}</Text>

                  <SectionHeading>Typical use</SectionHeading>
                  <Text style={styles.paragraph}>{code.typicalUse}</Text>

                  <SectionHeading>Watch out</SectionHeading>
                  <Text style={styles.paragraph}>{code.watchOuts}</Text>

                  <Text style={styles.standardRef}>Reference: {code.standardRef}</Text>

                  <SectionHeading>Quick check</SectionHeading>
                  {code.quiz.map((q, index) => {
                    const key = `${code.id}-q${index}`;
                    const isOpen = Boolean(revealed[key]);
                    return (
                      <View key={key} style={styles.quizCard}>
                        <Text style={styles.quizQuestion}>
                          {index + 1}. {q.question}
                        </Text>
                        {isOpen ? (
                          <>
                            <Text style={styles.quizAnswer}>{q.answer}</Text>
                            <Text style={styles.quizWhy}>{q.why}</Text>
                          </>
                        ) : (
                          <Pressable
                            accessibilityRole="button"
                            onPress={() => revealAnswer(key)}
                            style={styles.quizReveal}
                          >
                            <Text style={styles.quizRevealText}>Show answer</Text>
                          </Pressable>
                        )}
                      </View>
                    );
                  })}
                </View>
              ) : null}
            </View>
          );
        })
      )}

      <Text style={styles.footer}>
        {cableCodes.length} entries in the decoder · facts and standards only · no copyrighted assessment
        content
      </Text>
    </ScrollView>
  );
}

function SectionHeading({ children }: { children: string }) {
  return <Text style={styles.sectionHeading}>{children}</Text>;
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
    fontSize: 15,
    lineHeight: 22,
  },
  search: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    fontSize: 15,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  empty: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginTop: spacing.lg,
    padding: spacing.lg,
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginTop: spacing.md,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    padding: spacing.lg,
  },
  cardHeaderText: {
    flex: 1,
    paddingRight: spacing.md,
  },
  cardHeaderRight: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  codePill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primarySoft,
    borderRadius: 4,
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    marginTop: spacing.xs,
  },
  cardSummary: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: spacing.xs,
  },
  categoryTag: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  chevron: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: '900',
  },
  cardBody: {
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  sectionHeading: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: spacing.xs,
    marginTop: spacing.md,
    textTransform: 'uppercase',
  },
  partsList: {
    gap: spacing.sm,
  },
  partRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  partLabel: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
    minWidth: 56,
  },
  partMeaning: {
    color: colors.text,
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  paragraph: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21,
  },
  standardRef: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    marginTop: spacing.md,
  },
  quizCard: {
    backgroundColor: colors.background,
    borderRadius: 6,
    marginTop: spacing.sm,
    padding: spacing.md,
  },
  quizQuestion: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  quizReveal: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
  },
  quizRevealText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
  },
  quizAnswer: {
    color: colors.success,
    fontSize: 14,
    fontWeight: '800',
    marginTop: spacing.sm,
  },
  quizWhy: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: spacing.xs,
  },
  footer: {
    color: colors.muted,
    fontSize: 12,
    marginTop: spacing.xl,
    textAlign: 'center',
  },
});
