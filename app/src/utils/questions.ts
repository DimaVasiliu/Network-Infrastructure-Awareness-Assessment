import { questions as questionBank } from '../data/questionBank';
import type { Question, QuestionSection } from '../types/question';
import type { QuestionStat } from '../types/progress';

export const questions = questionBank;

export const sections = Array.from(
  new Set(questions.map((question) => question.section)),
) as QuestionSection[];

export const questionMap: Record<string, Question> = Object.fromEntries(
  questions.map((question) => [question.id, question]),
);

export const mockExamBlueprint: { section: QuestionSection; count: number }[] = [
  { section: 'Product Selection', count: 3 },
  { section: 'Containment Systems', count: 4 },
  { section: 'Cable Laying', count: 4 },
  { section: 'Cable Dressing', count: 4 },
  { section: 'Fire Regulations', count: 3 },
  { section: 'Safe Cable Installation', count: 4 },
  { section: 'Personal Safety', count: 4 },
  { section: 'Other Services', count: 3 },
  { section: 'Waste Management', count: 1 },
];

export const mockExamQuestionCount = mockExamBlueprint.reduce((total, item) => total + item.count, 0);
export const mockExamDurationSeconds = 45 * 60;
export const mockExamPassMark = 24;
export const weakestPracticeSize = 10;

export function questionsForSection(section: QuestionSection) {
  return questions.filter((question) => question.section === section);
}

export function shuffleQuestions(source: Question[]) {
  const shuffled = [...source];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export function buildMockExam() {
  return shuffleQuestions(
    mockExamBlueprint.flatMap(({ section, count }) =>
      shuffleQuestions(questionsForSection(section)).slice(0, count),
    ),
  );
}

export function sectionCounts() {
  return sections.map((section) => ({
    section,
    count: questionsForSection(section).length,
  }));
}

export function questionsByIds(ids: string[]): Question[] {
  return ids.map((id) => questionMap[id]).filter((q): q is Question => Boolean(q));
}

export function wrongAnsweredQuestions(stats: Record<string, QuestionStat>): Question[] {
  const ids = Object.entries(stats)
    .filter(([, stat]) => stat.seen > 0 && !stat.lastWasCorrect)
    .sort((a, b) => (a[1].lastSeenAt > b[1].lastSeenAt ? -1 : 1))
    .map(([id]) => id);
  return questionsByIds(ids);
}

export function weakestQuestions(
  stats: Record<string, QuestionStat>,
  limit = weakestPracticeSize,
): Question[] {
  const ranked = Object.entries(stats)
    .filter(([, stat]) => stat.seen > 0)
    .map(([id, stat]) => {
      const accuracy = stat.correct / stat.seen;
      return { id, accuracy, seen: stat.seen };
    })
    .sort((a, b) => {
      if (a.accuracy !== b.accuracy) return a.accuracy - b.accuracy;
      return b.seen - a.seen;
    })
    .slice(0, limit)
    .map((row) => row.id);
  return questionsByIds(ranked);
}

export type SectionAccuracy = {
  section: QuestionSection;
  seen: number;
  correct: number;
  accuracy: number | null;
};

export function sectionAccuracy(stats: Record<string, QuestionStat>): SectionAccuracy[] {
  const totals: Record<string, { seen: number; correct: number }> = {};
  for (const [id, stat] of Object.entries(stats)) {
    const question = questionMap[id];
    if (!question) continue;
    const bucket = totals[question.section] ?? { seen: 0, correct: 0 };
    bucket.seen += stat.seen;
    bucket.correct += stat.correct;
    totals[question.section] = bucket;
  }
  return sections.map((section) => {
    const data = totals[section];
    if (!data || data.seen === 0) {
      return { section, seen: 0, correct: 0, accuracy: null };
    }
    return {
      section,
      seen: data.seen,
      correct: data.correct,
      accuracy: Math.round((data.correct / data.seen) * 100),
    };
  });
}
