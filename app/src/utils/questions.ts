import rawQuestions from '../data/questions.json';
import type { Question, QuestionSection } from '../types/question';

export const questions = rawQuestions as Question[];

export const sections = Array.from(new Set(questions.map((question) => question.section))) as QuestionSection[];

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

export function buildMockExam(limit = 50) {
  return shuffleQuestions(questions).slice(0, Math.min(limit, questions.length));
}

export function sectionCounts() {
  return sections.map((section) => ({
    section,
    count: questionsForSection(section).length,
  }));
}

