import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useLanguage, useT } from '../i18n';
import { localizeExplanation } from '../i18n/questionContent';
import { useProgressStore } from '../store/progressStore';
import { colors, spacing } from '../theme';
import type { AnswerChoice, Question, QuestionSection } from '../types/question';
import type { AttemptAnswer, QuizAttempt, QuizMode } from '../types/progress';
import { answerChoices, buildChoiceOrderMap } from '../utils/questions';
import { PrimaryButton } from './PrimaryButton';

export type QuizSnapshot = {
  answers: Record<string, AnswerChoice>;
  choiceOrders?: Record<string, AnswerChoice[]>;
  currentIndex: number;
  remainingSeconds: number | undefined;
};

type QuizRunnerProps = {
  mode: QuizMode;
  questions: Question[];
  section?: QuestionSection;
  showImmediateFeedback?: boolean;
  timerSeconds?: number;
  passMark?: number;
  onExit: () => void;
  onComplete: (attempt: QuizAttempt) => void;
  /** Optional restart state — used by Resume mock exam. */
  resumeFrom?: QuizSnapshot;
  /** Fires whenever answers / current index / remaining seconds change. */
  onSnapshot?: (snapshot: QuizSnapshot) => void;
};

type QuizStatus = 'answering' | 'review';

export function QuizRunner({
  mode,
  questions,
  section,
  showImmediateFeedback = false,
  timerSeconds,
  passMark,
  onExit,
  onComplete,
  resumeFrom,
  onSnapshot,
}: QuizRunnerProps) {
  const language = useLanguage();
  const t = useT();
  const [currentIndex, setCurrentIndex] = useState(resumeFrom?.currentIndex ?? 0);
  const [answers, setAnswers] = useState<Record<string, AnswerChoice>>(resumeFrom?.answers ?? {});
  const [choiceOrders] = useState<Record<string, AnswerChoice[]>>(
    () => resumeFrom?.choiceOrders ?? buildChoiceOrderMap(questions),
  );
  const [status, setStatus] = useState<QuizStatus>('answering');
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const [remainingSeconds, setRemainingSeconds] = useState(resumeFrom?.remainingSeconds ?? timerSeconds);
  const answersRef = useRef<Record<string, AnswerChoice>>(resumeFrom?.answers ?? {});
  const hasFinishedRef = useRef(false);
  const onExitRef = useRef(onExit);
  const onSnapshotRef = useRef(onSnapshot);
  const bookmarks = useProgressStore((state) => state.bookmarks);
  const toggleBookmark = useProgressStore((state) => state.toggleBookmark);
  const currentQuestion = questions[currentIndex];
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const isBookmarked = currentQuestion ? bookmarks.includes(currentQuestion.id) : false;
  const isLastQuestion = currentIndex === questions.length - 1;

  const attemptAnswers = useMemo(
    () =>
      questions
        .filter((question) => answers[question.id])
        .map<AttemptAnswer>((question) => {
          const answer = answers[question.id];

          return {
            questionId: question.id,
            selectedAnswer: answer,
            correctAnswer: question.correctAnswer,
            isCorrect: answer === question.correctAnswer,
          };
        }),
    [answers, questions],
  );

  const finishQuiz = useCallback(
    (answerSnapshot: Record<string, AnswerChoice> = answersRef.current) => {
      if (hasFinishedRef.current) {
        return;
      }

      hasFinishedRef.current = true;

      const finalAnswers = questions.map<AttemptAnswer>((question) => {
        const answer = answerSnapshot[question.id];

        return {
          questionId: question.id,
          selectedAnswer: answer,
          correctAnswer: question.correctAnswer,
          isCorrect: answer === question.correctAnswer,
        };
      });
      const correct = finalAnswers.filter((answer) => answer.isCorrect).length;
      const attempt: QuizAttempt = {
        id: `${mode}-${Date.now()}`,
        mode,
        section,
        total: questions.length,
        correct,
        durationSeconds: Math.round((Date.now() - startedAt) / 1000),
        completedAt: new Date().toISOString(),
        answers: finalAnswers,
      };

      onComplete(attempt);
      setStatus('review');
    },
    [mode, onComplete, questions, section, startedAt],
  );

  const requestExit = useCallback(() => {
    // Only confirm when the user could lose an in-progress mock attempt.
    if (mode === 'mockExam' && status === 'answering' && !hasFinishedRef.current) {
      Alert.alert(t.quiz.leaveTitle, t.quiz.leaveBody, [
        { text: t.quiz.keepGoing, style: 'cancel' },
        { text: t.quiz.leave, style: 'destructive', onPress: () => onExit() },
      ]);
      return;
    }
    onExit();
  }, [mode, onExit, status, t]);

  const requestExitRef = useRef(requestExit);

  useEffect(() => {
    onExitRef.current = onExit;
    onSnapshotRef.current = onSnapshot;
    requestExitRef.current = requestExit;
  }, [onExit, onSnapshot, requestExit]);

  // Tell the parent whenever live state changes so it can persist a snapshot.
  // Skipped once the attempt has finished — the snapshot is no longer useful.
  // onSnapshot is read through a ref so an unstable callback identity from the
  // parent cannot retrigger this effect (which previously caused an update loop).
  useEffect(() => {
    if (!onSnapshotRef.current || hasFinishedRef.current || status !== 'answering') return;
    onSnapshotRef.current({ answers, choiceOrders, currentIndex, remainingSeconds });
  }, [answers, choiceOrders, currentIndex, remainingSeconds, status]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      requestExitRef.current();
      return true;
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (!timerSeconds) {
      return;
    }

    const timer = setInterval(() => {
      setRemainingSeconds((seconds) => {
        if (!seconds || hasFinishedRef.current) {
          return seconds;
        }

        if (seconds <= 1) {
          finishQuiz(answersRef.current);
          return 0;
        }

        return seconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [finishQuiz, timerSeconds]);

  function chooseAnswer(answer: AnswerChoice) {
    if (!currentQuestion || selectedAnswer) {
      return;
    }

    setAnswers((latestAnswers) => {
      const nextAnswers = {
        ...latestAnswers,
        [currentQuestion.id]: answer,
      };

      answersRef.current = nextAnswers;
      return nextAnswers;
    });
  }

  function goNext() {
    if (isLastQuestion) {
      finishQuiz();
      return;
    }

    setCurrentIndex((index) => index + 1);
  }

  if (!currentQuestion) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.title}>{t.quiz.noQuestions}</Text>
        <PrimaryButton onPress={onExit}>{t.quiz.back}</PrimaryButton>
      </View>
    );
  }

  if (status === 'review') {
    const correct = attemptAnswers.filter((answer) => answer.isCorrect).length;
    const score = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
    const requiredScore = mode === 'mockExam' ? passMark : undefined;

    return (
      <ScrollView contentContainerStyle={styles.reviewContent} style={styles.container}>
        <Text style={styles.kicker}>
          {mode === 'mockExam' ? t.quiz.mockComplete : t.quiz.practiceComplete}
        </Text>
        <Text style={styles.score}>
          {correct}/{questions.length}
        </Text>
        <Text style={styles.scoreLabel}>
          {score}%{' '}
          {requiredScore
            ? correct >= requiredScore
              ? t.quiz.pass
              : t.quiz.passMark.replace('{n}', String(requiredScore))
            : t.quiz.answeredCorrectly}
        </Text>

        <View style={styles.reviewList}>
          {questions.map((question, index) => {
            const answer = answers[question.id];
            const isCorrect = answer === question.correctAnswer;

            return (
              <View key={question.id} style={styles.reviewCard}>
                <Text style={styles.reviewMeta}>
                  {t.quiz.question} {index + 1}
                </Text>
                <Text style={styles.reviewQuestion}>{question.question}</Text>
                <Text style={[styles.reviewAnswer, isCorrect ? styles.correctText : styles.incorrectText]}>
                  {t.quiz.yourAnswer} {answer ? `${answer} — ${question.choices[answer]}` : t.quiz.noAnswer}{' '}
                  {isCorrect ? '✓' : '✗'}
                </Text>
                {!isCorrect ? (
                  <Text style={styles.reviewAnswer}>
                    {t.quiz.correctAnswer} {question.correctAnswer} —{' '}
                    {question.choices[question.correctAnswer]}
                  </Text>
                ) : null}
                <Text style={styles.explanation}>{localizeExplanation(question, language)}</Text>
                {question.standardRef ? (
                  <Text style={styles.standardRef}>
                    {t.quiz.reference} {question.standardRef}
                  </Text>
                ) : null}
              </View>
            );
          })}
        </View>

        <PrimaryButton onPress={onExit}>{t.quiz.done}</PrimaryButton>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.kicker}>
          {currentIndex + 1} {t.quiz.of} {questions.length}
        </Text>
        <View style={styles.topRowRight}>
          {remainingSeconds !== undefined ? (
            <Text style={styles.timer}>{formatTime(remainingSeconds)}</Text>
          ) : null}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isBookmarked ? t.quiz.removeBookmark : t.quiz.bookmarkQuestion}
            accessibilityState={{ selected: isBookmarked }}
            hitSlop={8}
            onPress={() => toggleBookmark(currentQuestion.id)}
            style={styles.bookmarkButton}
          >
            <Text style={[styles.bookmarkIcon, isBookmarked && styles.bookmarkIconActive]}>
              {isBookmarked ? '★' : '☆'}
            </Text>
          </Pressable>
        </View>
      </View>

      {mode === 'mockExam' ? (
        <View>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: isNavigatorOpen }}
            onPress={() => setIsNavigatorOpen((open) => !open)}
            style={styles.navToggle}
          >
            <Text style={styles.navToggleText}>
              {Object.keys(answers).length}/{questions.length} {t.quiz.answered}
            </Text>
            <Text style={styles.navToggleAction}>{isNavigatorOpen ? t.quiz.hide : t.quiz.jumpTo}</Text>
          </Pressable>
          {isNavigatorOpen ? (
            <View style={styles.navGrid}>
              {questions.map((q, idx) => {
                const isAnswered = Boolean(answers[q.id]);
                const isCurrent = idx === currentIndex;
                const isBookmarked = bookmarks.includes(q.id);
                return (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`${t.quiz.question} ${idx + 1}${isAnswered ? `, ${t.quiz.answered}` : `, ${t.quiz.unanswered}`}${isBookmarked ? `, ${t.quiz.bookmarked}` : ''}`}
                    key={q.id}
                    onPress={() => {
                      setCurrentIndex(idx);
                      setIsNavigatorOpen(false);
                    }}
                    style={[
                      styles.navCell,
                      isAnswered && styles.navCellAnswered,
                      isBookmarked && styles.navCellBookmarked,
                      isCurrent && styles.navCellCurrent,
                    ]}
                  >
                    <Text
                      style={[
                        styles.navCellLabel,
                        isAnswered && styles.navCellLabelAnswered,
                        isCurrent && styles.navCellLabelCurrent,
                      ]}
                    >
                      {idx + 1}
                    </Text>
                    {isBookmarked ? <Text style={styles.navCellStar}>★</Text> : null}
                  </Pressable>
                );
              })}
            </View>
          ) : null}
        </View>
      ) : null}

      <Text style={styles.section}>{currentQuestion.section}</Text>
      <Text style={styles.title}>{currentQuestion.question}</Text>

      <View style={styles.choiceList}>
        {(choiceOrders[currentQuestion.id] ?? answerChoices).map((choice) => {
          const isSelected = selectedAnswer === choice;
          const isCorrect = currentQuestion.correctAnswer === choice;
          const shouldShowFeedback = showImmediateFeedback && selectedAnswer;

          return (
            <Pressable
              accessibilityRole="button"
              disabled={Boolean(selectedAnswer)}
              key={choice}
              onPress={() => chooseAnswer(choice)}
              style={[
                styles.choice,
                isSelected && styles.selectedChoice,
                shouldShowFeedback && isCorrect && styles.correctChoice,
                shouldShowFeedback && isSelected && !isCorrect && styles.incorrectChoice,
              ]}
            >
              <Text style={styles.choiceLetter}>{choice}</Text>
              <Text style={styles.choiceText}>{currentQuestion.choices[choice]}</Text>
            </Pressable>
          );
        })}
      </View>

      {showImmediateFeedback && selectedAnswer ? (
        <View style={styles.feedback}>
          <Text
            style={
              selectedAnswer === currentQuestion.correctAnswer ? styles.correctText : styles.incorrectText
            }
          >
            {selectedAnswer === currentQuestion.correctAnswer ? t.quiz.correct : t.quiz.incorrect}
          </Text>
          <Text style={styles.explanation}>{localizeExplanation(currentQuestion, language)}</Text>
          {currentQuestion.standardRef ? (
            <Text style={styles.standardRef}>
              {t.quiz.reference} {currentQuestion.standardRef}
            </Text>
          ) : null}
        </View>
      ) : null}

      <View style={styles.actions}>
        <PrimaryButton disabled={!selectedAnswer && mode === 'practice'} onPress={goNext}>
          {isLastQuestion ? t.quiz.finish : t.quiz.next}
        </PrimaryButton>
        <PrimaryButton onPress={requestExit} variant="secondary">
          {t.quiz.exit}
        </PrimaryButton>
      </View>
    </ScrollView>
  );
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes}:${remaining.toString().padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  reviewContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  topRowRight: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
  bookmarkButton: {
    minHeight: 32,
    minWidth: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkIcon: {
    color: colors.muted,
    fontSize: 24,
    fontWeight: '800',
  },
  bookmarkIconActive: {
    color: colors.warning,
  },
  navToggle: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  navToggleText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  navToggleAction: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
  },
  navGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: spacing.lg,
  },
  navCell: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 6,
    borderWidth: 1,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  navCellAnswered: {
    backgroundColor: colors.successSoft,
    borderColor: colors.success,
  },
  navCellCurrent: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  navCellBookmarked: {
    borderColor: colors.warning,
  },
  navCellStar: {
    color: colors.warning,
    fontSize: 9,
    position: 'absolute',
    right: 2,
    top: 1,
  },
  navCellLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  navCellLabelAnswered: {
    color: colors.success,
  },
  navCellLabelCurrent: {
    color: colors.surface,
  },
  kicker: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  timer: {
    color: colors.warning,
    fontSize: 16,
    fontWeight: '800',
  },
  section: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 31,
    marginBottom: spacing.xl,
  },
  choiceList: {
    gap: spacing.md,
  },
  choice: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
  },
  selectedChoice: {
    borderColor: colors.primary,
  },
  correctChoice: {
    backgroundColor: colors.successSoft,
    borderColor: colors.success,
  },
  incorrectChoice: {
    backgroundColor: colors.dangerSoft,
    borderColor: colors.danger,
  },
  choiceLetter: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '900',
    width: 22,
  },
  choiceText: {
    color: colors.text,
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  feedback: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginTop: spacing.lg,
    padding: spacing.lg,
  },
  explanation: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  standardRef: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  actions: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  correctText: {
    color: colors.success,
    fontSize: 15,
    fontWeight: '800',
  },
  incorrectText: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: '800',
  },
  score: {
    color: colors.text,
    fontSize: 56,
    fontWeight: '900',
    marginTop: spacing.md,
  },
  scoreLabel: {
    color: colors.muted,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: spacing.xl,
  },
  reviewList: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  reviewCard: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.lg,
  },
  reviewMeta: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  reviewQuestion: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 23,
    marginBottom: spacing.md,
  },
  reviewAnswer: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
});
