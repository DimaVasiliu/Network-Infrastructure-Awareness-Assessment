import { questions as questionBank } from '../data/questionBank';
import type { Question, QuestionSection } from '../types/question';

export const questions = questionBank;

export const sections = Array.from(new Set(questions.map((question) => question.section))) as QuestionSection[];

export const mockExamBlueprint: Array<{ section: QuestionSection; count: number }> = [
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
    mockExamBlueprint.flatMap(({ section, count }) => shuffleQuestions(questionsForSection(section)).slice(0, count)),
  );
}

export function sectionCounts() {
  return sections.map((section) => ({
    section,
    count: questionsForSection(section).length,
  }));
}
