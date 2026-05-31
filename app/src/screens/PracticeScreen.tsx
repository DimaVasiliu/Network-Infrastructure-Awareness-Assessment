import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { QuizRunner } from '../components/QuizRunner';
import { useLanguage, useT, type Translations } from '../i18n';
import { localizeExplanation } from '../i18n/questionContent';
import type { PracticeStackParamList } from '../navigation/AppTabs';
import { useProgressStore } from '../store/progressStore';
import { colors, spacing } from '../theme';
import type { Question } from '../types/question';
import type { QuizAttempt } from '../types/progress';
import {
  questionsByIds,
  questionsForSection,
  sectionCounts,
  shuffleQuestions,
  weakestPracticeSize,
  weakestQuestions,
  wrongAnsweredQuestions,
} from '../utils/questions';

type PracticeHomeProps = NativeStackScreenProps<PracticeStackParamList, 'PracticeHome'>;
type PracticeSectionProps = NativeStackScreenProps<PracticeStackParamList, 'PracticeSection'>;
type PracticeQuizProps = NativeStackScreenProps<PracticeStackParamList, 'PracticeQuiz'>;
type PracticeAnswersProps = NativeStackScreenProps<PracticeStackParamList, 'PracticeAnswers'>;
type PracticeFocusProps = NativeStackScreenProps<PracticeStackParamList, 'PracticeFocus'>;

export function PracticeScreen({ navigation }: PracticeHomeProps) {
  const t = useT();
  const bookmarks = useProgressStore((state) => state.bookmarks);
  const stats = useProgressStore((state) => state.stats);
  const [isFocusOpen, setIsFocusOpen] = useState(false);

  const wrongCount = useMemo(() => wrongAnsweredQuestions(stats).length, [stats]);
  const weakestCount = useMemo(() => weakestQuestions(stats, weakestPracticeSize).length, [stats]);
  const bookmarkCount = useMemo(() => questionsByIds(bookmarks).length, [bookmarks]);
  const focusTotal = wrongCount + weakestCount + bookmarkCount;

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>{t.practice.title}</Text>
      <Text style={styles.body}>{t.practice.intro}</Text>

      <Text style={styles.subheading}>{t.practice.bySection}</Text>
      <View style={styles.sectionList}>
        {sectionCounts().map(({ section, count }) => (
          <Pressable
            accessibilityRole="button"
            key={section}
            onPress={() => navigation.navigate('PracticeSection', { section })}
            style={styles.sectionCard}
          >
            <View style={styles.sectionCardText}>
              <Text style={styles.sectionTitle}>{section}</Text>
              <Text style={styles.sectionMeta}>{count} {t.practice.questions}</Text>
            </View>
            <Text style={styles.arrow}>{t.common.start}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: isFocusOpen }}
        onPress={() => setIsFocusOpen((value) => !value)}
        style={styles.focusToggle}
      >
        <View style={styles.focusToggleText}>
          <Text style={styles.focusToggleTitle}>{t.practice.focusedPractice}</Text>
          <Text style={styles.focusToggleSubtitle}>
            {focusTotal === 0
              ? t.practice.focusEmptyHint
              : (focusTotal === 1 ? t.practice.focusItemsOne : t.practice.focusItemsMany).replace(
                  '{n}',
                  String(focusTotal),
                )}
          </Text>
        </View>
        <Text style={styles.focusChevron}>{isFocusOpen ? '-' : '+'}</Text>
      </Pressable>

      {isFocusOpen ? (
        <View style={styles.focusList}>
          <FocusCard
            title={t.practice.reviewWrongTitle}
            subtitle={
              wrongCount === 0 ? t.practice.noWrongYet : t.practice.toRevisit.replace('{n}', String(wrongCount))
            }
            enabled={wrongCount > 0}
            onPress={() => navigation.navigate('PracticeFocus', { focus: 'wrong' })}
          />
          <FocusCard
            title={t.practice.weakestTitle}
            subtitle={
              weakestCount === 0
                ? t.practice.weakestEmptyHint
                : (weakestCount === 1
                    ? t.practice.weakestByAccuracyOne
                    : t.practice.weakestByAccuracyMany
                  ).replace('{n}', String(weakestCount))
            }
            enabled={weakestCount > 0}
            onPress={() => navigation.navigate('PracticeFocus', { focus: 'weakest' })}
          />
          <FocusCard
            title={t.practice.bookmarkedTitle}
            subtitle={
              bookmarkCount === 0
                ? t.practice.bookmarksEmptyHint
                : t.practice.savedCount.replace('{n}', String(bookmarkCount))
            }
            enabled={bookmarkCount > 0}
            onPress={() => navigation.navigate('PracticeFocus', { focus: 'bookmarks' })}
          />
        </View>
      ) : null}
    </ScrollView>
  );
}

export function PracticeSectionScreen({ navigation, route }: PracticeSectionProps) {
  const t = useT();
  const { section } = route.params;
  const count = questionsForSection(section).length;

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>{section}</Text>
      <Text style={styles.body}>{t.practice.sectionIntro}</Text>

      <View style={styles.modeList}>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate('PracticeQuiz', { section })}
          style={styles.modeCard}
        >
          <Text style={styles.modeTitle}>{t.practice.quizPractice}</Text>
          <Text style={styles.modeBody}>{t.practice.quizPracticeBody}</Text>
          <Text style={styles.modeAction}>{t.practice.startQuiz}</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate('PracticeAnswers', { section })}
          style={styles.modeCard}
        >
          <Text style={styles.modeTitle}>{t.practice.studyCorrect}</Text>
          <Text style={styles.modeBody}>{t.practice.studyCorrectBody.replace('{count}', String(count))}</Text>
          <Text style={styles.modeAction}>{t.practice.openAnswers}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export function PracticeQuizScreen({ navigation, route }: PracticeQuizProps) {
  const { section } = route.params;
  const sessionQuestions = useMemo(() => shuffleQuestions(questionsForSection(section)), [section]);
  const addAttempt = useProgressStore((state) => state.addAttempt);

  function completeAttempt(attempt: QuizAttempt) {
    addAttempt(attempt);
  }

  return (
    <QuizRunner
      mode="practice"
      onComplete={completeAttempt}
      onExit={() => navigation.goBack()}
      questions={sessionQuestions}
      section={section}
      showImmediateFeedback
    />
  );
}

export function PracticeFocusScreen({ navigation, route }: PracticeFocusProps) {
  const t = useT();
  const { focus } = route.params;
  const addAttempt = useProgressStore((state) => state.addAttempt);
  const bookmarks = useProgressStore((state) => state.bookmarks);
  const stats = useProgressStore((state) => state.stats);

  const sessionQuestions = useMemo(() => {
    let source: Question[] = [];
    if (focus === 'wrong') source = wrongAnsweredQuestions(stats);
    else if (focus === 'weakest') source = weakestQuestions(stats, weakestPracticeSize);
    else if (focus === 'bookmarks') source = questionsByIds(bookmarks);
    return shuffleQuestions(source);
    // session captured once on mount so live bookmark toggles don't restart the quiz
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (sessionQuestions.length === 0) {
    return (
      <ScrollView contentContainerStyle={styles.screen}>
        <Text style={styles.title}>{titleForFocus(focus, t.practice)}</Text>
        <Text style={styles.body}>{emptyMessageForFocus(focus, t.practice)}</Text>
        <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{t.practice.backToPractice}</Text>
        </Pressable>
      </ScrollView>
    );
  }

  return (
    <QuizRunner
      mode="practice"
      onComplete={addAttempt}
      onExit={() => navigation.goBack()}
      questions={sessionQuestions}
      showImmediateFeedback
    />
  );
}

function titleForFocus(focus: 'wrong' | 'bookmarks' | 'weakest', p: Translations['practice']) {
  if (focus === 'wrong') return p.reviewWrongTitle;
  if (focus === 'bookmarks') return p.bookmarkedTitle;
  return p.weakestTitle;
}

function emptyMessageForFocus(focus: 'wrong' | 'bookmarks' | 'weakest', p: Translations['practice']) {
  if (focus === 'wrong') return p.wrongEmpty;
  if (focus === 'bookmarks') return p.bookmarksEmpty;
  return p.weakestEmpty;
}

export function PracticeAnswerStudyScreen({ navigation, route }: PracticeAnswersProps) {
  const t = useT();
  const language = useLanguage();
  const { section } = route.params;
  const questions = questionsForSection(section);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>{section}</Text>
      <Text style={styles.body}>{t.practice.answersIntro}</Text>

      <View style={styles.answerList}>
        {questions.map((question, index) => {
          const orderedChoices = getOrderedChoices(question);

          return (
            <View key={question.id} style={styles.answerCard}>
              <Text style={styles.questionMeta}>{t.quiz.question} {index + 1}</Text>
              <Text style={styles.answerQuestion}>{question.question}</Text>

              <View style={styles.choiceList}>
                {orderedChoices.map((choice) => {
                  const isCorrect = choice === question.correctAnswer;

                  return (
                    <View
                      key={choice}
                      style={[styles.studyChoice, isCorrect ? styles.studyCorrect : styles.studyWrong]}
                    >
                      <Text
                        style={[
                          styles.studyMark,
                          isCorrect ? styles.studyCorrectText : styles.studyWrongText,
                        ]}
                      >
                        {isCorrect ? 'V' : 'X'}
                      </Text>
                      <Text style={styles.studyChoiceText}>{question.choices[choice]}</Text>
                    </View>
                  );
                })}
              </View>

              <Text style={styles.explanation}>{localizeExplanation(question, language)}</Text>
              {question.standardRef ? (
                <Text style={styles.standardRef}>{t.quiz.reference} {question.standardRef}</Text>
              ) : null}
            </View>
          );
        })}
      </View>

      <Pressable accessibilityRole="button" onPress={() => navigation.popToTop()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{t.practice.backToSections}</Text>
      </Pressable>
    </ScrollView>
  );
}

function getOrderedChoices(question: Question) {
  const choices = ['A', 'B', 'C', 'D'] as const;
  return [question.correctAnswer, ...choices.filter((choice) => choice !== question.correctAnswer)];
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
  focusList: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
  focusToggle: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    padding: spacing.lg,
  },
  focusToggleText: {
    flex: 1,
    paddingRight: spacing.md,
  },
  focusToggleTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  focusToggleSubtitle: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: spacing.xs,
  },
  focusChevron: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '900',
  },
  focusCard: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  focusCardDisabled: {
    backgroundColor: colors.surface,
    opacity: 0.7,
  },
  focusCardText: {
    flex: 1,
    paddingRight: spacing.md,
  },
  focusTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
  },
  focusSubtitle: {
    color: colors.muted,
    fontSize: 14,
    marginTop: spacing.xs,
  },
  subheading: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginTop: spacing.xl,
  },
  sectionList: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
  modeList: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  sectionCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  sectionCardText: {
    flex: 1,
    paddingRight: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
  },
  sectionMeta: {
    color: colors.muted,
    fontSize: 14,
    marginTop: spacing.xs,
  },
  arrow: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '900',
  },
  arrowDisabled: {
    color: colors.muted,
  },
  modeCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: spacing.lg,
  },
  modeTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: spacing.sm,
  },
  modeBody: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  modeAction: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '900',
    marginTop: spacing.md,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: spacing.xl,
    minHeight: 48,
    justifyContent: 'center',
  },
  backButtonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  answerList: {
    gap: spacing.lg,
    marginTop: spacing.xl,
  },
  answerCard: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.lg,
  },
  questionMeta: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  answerQuestion: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  choiceList: {
    gap: spacing.sm,
  },
  studyChoice: {
    borderRadius: 8,
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
  },
  studyCorrect: {
    backgroundColor: colors.successSoft,
  },
  studyWrong: {
    backgroundColor: colors.dangerSoft,
  },
  studyMark: {
    fontSize: 15,
    fontWeight: '900',
    width: 18,
  },
  studyCorrectText: {
    color: colors.success,
  },
  studyWrongText: {
    color: colors.danger,
  },
  studyChoiceText: {
    color: colors.text,
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
  },
  explanation: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.md,
  },
  standardRef: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
});

type FocusCardProps = {
  title: string;
  subtitle: string;
  enabled: boolean;
  onPress: () => void;
};

function FocusCard({ title, subtitle, enabled, onPress }: FocusCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !enabled }}
      disabled={!enabled}
      onPress={onPress}
      style={[styles.focusCard, !enabled && styles.focusCardDisabled]}
    >
      <View style={styles.focusCardText}>
        <Text style={styles.focusTitle}>{title}</Text>
        <Text style={styles.focusSubtitle}>{subtitle}</Text>
      </View>
      <Text style={[styles.arrow, !enabled && styles.arrowDisabled]}>{enabled ? 'Start' : '—'}</Text>
    </Pressable>
  );
}
