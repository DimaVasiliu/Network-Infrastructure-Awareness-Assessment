import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { QuizRunner } from '../components/QuizRunner';
import { useProgressStore } from '../store/progressStore';
import { colors, spacing } from '../theme';
import type { Question } from '../types/question';
import type { QuestionSection } from '../types/question';
import type { QuizAttempt } from '../types/progress';
import { questionsForSection, sectionCounts, shuffleQuestions } from '../utils/questions';

type PracticeMode = 'quiz' | 'answers';

export function PracticeScreen() {
  const [activeSection, setActiveSection] = useState<QuestionSection | null>(null);
  const [activeMode, setActiveMode] = useState<PracticeMode | null>(null);
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const addAttempt = useProgressStore((state) => state.addAttempt);

  function chooseSection(section: QuestionSection) {
    setActiveSection(section);
  }

  function startQuiz(section: QuestionSection) {
    setActiveMode('quiz');
    setSessionQuestions(shuffleQuestions(questionsForSection(section)));
  }

  function startAnswerStudy(section: QuestionSection) {
    setActiveMode('answers');
    setSessionQuestions(questionsForSection(section));
  }

  function exitSection() {
    setActiveSection(null);
    setActiveMode(null);
    setSessionQuestions([]);
  }

  function completeAttempt(attempt: QuizAttempt) {
    addAttempt(attempt);
  }

  if (activeSection && activeMode === 'quiz') {
    return (
      <QuizRunner
        mode="practice"
        onComplete={completeAttempt}
        onExit={exitSection}
        questions={sessionQuestions}
        section={activeSection}
        showImmediateFeedback
      />
    );
  }

  if (activeSection && activeMode === 'answers') {
    return <AnswerStudyView onExit={exitSection} questions={sessionQuestions} section={activeSection} />;
  }

  if (activeSection) {
    const count = questionsForSection(activeSection).length;

    return (
      <ScrollView contentContainerStyle={styles.screen}>
        <Text style={styles.title}>{activeSection}</Text>
        <Text style={styles.body}>Choose how you want to practise this section.</Text>

        <View style={styles.modeList}>
          <Pressable accessibilityRole="button" onPress={() => startQuiz(activeSection)} style={styles.modeCard}>
            <Text style={styles.modeTitle}>Quiz practice</Text>
            <Text style={styles.modeBody}>Answer one question at a time, then review the explanation.</Text>
            <Text style={styles.modeAction}>Start quiz</Text>
          </Pressable>

          <Pressable accessibilityRole="button" onPress={() => startAnswerStudy(activeSection)} style={styles.modeCard}>
            <Text style={styles.modeTitle}>Study correct answers</Text>
            <Text style={styles.modeBody}>
              Read all {count} questions with the correct answer first and wrong answers marked.
            </Text>
            <Text style={styles.modeAction}>Open answers</Text>
          </Pressable>
        </View>

        <Pressable accessibilityRole="button" onPress={exitSection} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back to sections</Text>
        </Pressable>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Practice</Text>
      <Text style={styles.body}>Choose a section, then select quiz practice or answer study.</Text>

      <View style={styles.sectionList}>
        {sectionCounts().map(({ section, count }) => (
          <Pressable
            accessibilityRole="button"
            key={section}
            onPress={() => chooseSection(section)}
            style={styles.sectionCard}
          >
            <View style={styles.sectionCardText}>
              <Text style={styles.sectionTitle}>{section}</Text>
              <Text style={styles.sectionMeta}>{count} questions</Text>
            </View>
            <Text style={styles.arrow}>Start</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

function AnswerStudyView({
  onExit,
  questions,
  section,
}: {
  onExit: () => void;
  questions: Question[];
  section: QuestionSection;
}) {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>{section}</Text>
      <Text style={styles.body}>Correct answers are shown first. Wrong answers are marked below for comparison.</Text>

      <View style={styles.answerList}>
        {questions.map((question, index) => {
          const orderedChoices = getOrderedChoices(question);

          return (
            <View key={question.id} style={styles.answerCard}>
              <Text style={styles.questionMeta}>Question {index + 1}</Text>
              <Text style={styles.answerQuestion}>{question.question}</Text>

              <View style={styles.choiceList}>
                {orderedChoices.map((choice) => {
                  const isCorrect = choice === question.correctAnswer;

                  return (
                    <View
                      key={choice}
                      style={[styles.studyChoice, isCorrect ? styles.studyCorrect : styles.studyWrong]}
                    >
                      <Text style={[styles.studyMark, isCorrect ? styles.studyCorrectText : styles.studyWrongText]}>
                        {isCorrect ? 'V' : 'X'}
                      </Text>
                      <Text style={styles.studyChoiceText}>{question.choices[choice]}</Text>
                    </View>
                  );
                })}
              </View>

              <Text style={styles.explanation}>{question.explanation}</Text>
            </View>
          );
        })}
      </View>

      <Pressable accessibilityRole="button" onPress={onExit} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back to sections</Text>
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
    paddingTop: 64,
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
  sectionList: {
    gap: spacing.md,
    marginTop: spacing.xl,
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
});
