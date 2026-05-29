import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '../theme';
import type { AnswerChoice, Question, QuestionSection } from '../types/question';
import type { AttemptAnswer, QuizAttempt, QuizMode } from '../types/progress';
import { PrimaryButton } from './PrimaryButton';

type QuizRunnerProps = {
  mode: QuizMode;
  questions: Question[];
  section?: QuestionSection;
  showImmediateFeedback?: boolean;
  timerSeconds?: number;
  passMark?: number;
  onExit: () => void;
  onComplete: (attempt: QuizAttempt) => void;
};

type QuizStatus = 'answering' | 'review';

const choices: AnswerChoice[] = ['A', 'B', 'C', 'D'];

export function QuizRunner({
  mode,
  questions,
  section,
  showImmediateFeedback = false,
  timerSeconds,
  passMark,
  onExit,
  onComplete,
}: QuizRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerChoice>>({});
  const [status, setStatus] = useState<QuizStatus>('answering');
  const [startedAt] = useState(() => Date.now());
  const [remainingSeconds, setRemainingSeconds] = useState(timerSeconds);
  const answersRef = useRef<Record<string, AnswerChoice>>({});
  const hasFinishedRef = useRef(false);
  const onExitRef = useRef(onExit);
  const currentQuestion = questions[currentIndex];
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
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

  useEffect(() => {
    onExitRef.current = onExit;
  }, [onExit]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onExitRef.current();
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
        <Text style={styles.title}>No questions available</Text>
        <PrimaryButton onPress={onExit}>Back</PrimaryButton>
      </View>
    );
  }

  if (status === 'review') {
    const correct = attemptAnswers.filter((answer) => answer.isCorrect).length;
    const score = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
    const requiredScore = mode === 'mockExam' ? passMark : undefined;

    return (
      <ScrollView contentContainerStyle={styles.reviewContent} style={styles.container}>
        <Text style={styles.kicker}>{mode === 'mockExam' ? 'Mock exam complete' : 'Practice complete'}</Text>
        <Text style={styles.score}>{correct}/{questions.length}</Text>
        <Text style={styles.scoreLabel}>
          {score}% {requiredScore ? (correct >= requiredScore ? 'Pass' : `Pass mark ${requiredScore}`) : 'answered correctly'}
        </Text>

        <View style={styles.reviewList}>
          {questions.map((question, index) => {
            const answer = answers[question.id];
            const isCorrect = answer === question.correctAnswer;

            return (
              <View key={question.id} style={styles.reviewCard}>
                <Text style={styles.reviewMeta}>Question {index + 1}</Text>
                <Text style={styles.reviewQuestion}>{question.question}</Text>
                <Text style={[styles.reviewAnswer, isCorrect ? styles.correctText : styles.incorrectText]}>
                  Your answer: {answer ?? 'No answer'} {isCorrect ? 'correct' : 'incorrect'}
                </Text>
                {!isCorrect ? <Text style={styles.reviewAnswer}>Correct answer: {question.correctAnswer}</Text> : null}
                <Text style={styles.explanation}>{question.explanation}</Text>
              </View>
            );
          })}
        </View>

        <PrimaryButton onPress={onExit}>Done</PrimaryButton>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.kicker}>
          {currentIndex + 1} of {questions.length}
        </Text>
        {remainingSeconds !== undefined ? <Text style={styles.timer}>{formatTime(remainingSeconds)}</Text> : null}
      </View>

      <Text style={styles.section}>{currentQuestion.section}</Text>
      <Text style={styles.title}>{currentQuestion.question}</Text>

      <View style={styles.choiceList}>
        {choices.map((choice) => {
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
          <Text style={selectedAnswer === currentQuestion.correctAnswer ? styles.correctText : styles.incorrectText}>
            {selectedAnswer === currentQuestion.correctAnswer ? 'Correct' : 'Incorrect'}
          </Text>
          <Text style={styles.explanation}>{currentQuestion.explanation}</Text>
        </View>
      ) : null}

      <View style={styles.actions}>
        <PrimaryButton disabled={!selectedAnswer && mode === 'practice'} onPress={goNext}>
          {isLastQuestion ? 'Finish' : 'Next'}
        </PrimaryButton>
        <PrimaryButton onPress={onExit} variant="secondary">
          Exit
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
