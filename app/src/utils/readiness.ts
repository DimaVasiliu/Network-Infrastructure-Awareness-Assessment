/**
 * Exam readiness model.
 *
 * The app already tracks per-question stats (seen + correct). The readiness
 * model rolls those up into a single 0–100 "ready" score plus a per-section
 * breakdown, the weakest section, a suggestion for what to do next and a
 * boolean for whether the user is ready to attempt a mock exam.
 *
 * Design choices:
 *  - Weight each section by its mock-exam blueprint count (Containment
 *    Systems counts more than Waste Management).
 *  - Penalise sections you have barely touched: until you have seen at least
 *    `minSeenForFullCredit` questions in a section, accuracy is multiplied by
 *    a coverage factor < 1.
 *  - Mock-ready means: every section has both enough coverage AND at least
 *    `mockReadyThreshold` accuracy.
 *  - "Weakest" is the lowest score among sections that have any data; if no
 *    section has been touched, weakest is null and the suggestion is to start
 *    practising.
 *
 * Pure function. No React, no Zustand, no side effects.
 */
import type { QuestionStat } from '../types/progress';
import type { Question, QuestionSection } from '../types/question';
import { mockExamBlueprint, questionMap, sections } from './questions';

export const mockReadyThreshold = 75;

export type SectionReadiness = {
  section: QuestionSection;
  seen: number;
  correct: number;
  accuracy: number;
  coverageRatio: number; // 0–1
  score: number; // 0–100, the section's contribution to readiness
  meetsMockBar: boolean;
};

export type ReadinessReport = {
  overall: number; // 0–100
  perSection: SectionReadiness[];
  weakest: SectionReadiness | null;
  mockReady: boolean;
  suggestion: string;
};

const MIN_SEEN_FOR_FULL_CREDIT = (blueprintCount: number) => Math.max(5, blueprintCount * 2);

function aggregateBySection(stats: Record<string, QuestionStat>) {
  const totals: Partial<Record<QuestionSection, { seen: number; correct: number }>> = {};
  for (const [id, stat] of Object.entries(stats)) {
    const question: Question | undefined = questionMap[id];
    if (!question) continue;
    const bucket = totals[question.section] ?? { seen: 0, correct: 0 };
    bucket.seen += stat.seen;
    bucket.correct += stat.correct;
    totals[question.section] = bucket;
  }
  return totals;
}

export function computeReadiness(stats: Record<string, QuestionStat>): ReadinessReport {
  const aggregated = aggregateBySection(stats);
  const blueprintMap = new Map(mockExamBlueprint.map((row) => [row.section, row.count]));

  const perSection: SectionReadiness[] = sections.map((section) => {
    const data = aggregated[section];
    const seen = data?.seen ?? 0;
    const correct = data?.correct ?? 0;
    const accuracy = seen === 0 ? 0 : (correct / seen) * 100;
    const blueprintCount = blueprintMap.get(section) ?? 1;
    const targetSeen = MIN_SEEN_FOR_FULL_CREDIT(blueprintCount);
    const coverageRatio = seen === 0 ? 0 : Math.min(1, seen / targetSeen);
    const score = Math.round(accuracy * coverageRatio);
    const meetsMockBar = coverageRatio >= 1 && accuracy >= mockReadyThreshold;
    return { section, seen, correct, accuracy, coverageRatio, score, meetsMockBar };
  });

  const totalWeight = mockExamBlueprint.reduce((sum, row) => sum + row.count, 0);
  const weightedSum = perSection.reduce((sum, row) => {
    const weight = blueprintMap.get(row.section) ?? 1;
    return sum + row.score * weight;
  }, 0);
  const overall = totalWeight === 0 ? 0 : Math.round(weightedSum / totalWeight);

  const touched = perSection.filter((row) => row.seen > 0);
  const weakest =
    touched.length === 0
      ? null
      : touched.reduce((lowest, row) => (row.score < lowest.score ? row : lowest), touched[0]);

  const mockReady = perSection.every((row) => row.meetsMockBar);
  const suggestion = buildSuggestion({ overall, perSection, touched, weakest, mockReady });

  return { overall, perSection, weakest, mockReady, suggestion };
}

function buildSuggestion(args: {
  overall: number;
  perSection: SectionReadiness[];
  touched: SectionReadiness[];
  weakest: SectionReadiness | null;
  mockReady: boolean;
}): string {
  const { overall, touched, weakest, mockReady } = args;
  if (touched.length === 0) {
    return 'Start with Practice — open a section and answer a few questions to build a readiness score.';
  }
  if (mockReady) {
    return 'You are mock-ready. Take a mock exam and aim for 24/30 (80%).';
  }
  if (weakest && weakest.score < 50) {
    return `Weakest area: ${weakest.section}. Try the "10 weakest questions" focus next.`;
  }
  if (weakest && weakest.score < mockReadyThreshold) {
    return `Nearly there. Bring ${weakest.section} above ${mockReadyThreshold}% accuracy.`;
  }
  if (overall < mockReadyThreshold) {
    return 'Keep practising across sections to push every topic above 75%.';
  }
  return 'Solid coverage. Try a mock exam to test under timed conditions.';
}
