import { computeReadiness, mockReadyThreshold } from './readiness';
import { questions, mockExamBlueprint } from './questions';
import type { QuestionStat } from '../types/progress';

const now = '2026-05-29T12:00:00.000Z';

function stat(seen: number, correct: number, lastWasCorrect = correct >= seen): QuestionStat {
  return { seen, correct, lastSeenAt: now, lastWasCorrect };
}

function questionsBySection(section: string) {
  return questions.filter((q) => q.section === section);
}

describe('computeReadiness', () => {
  it('with no stats: overall 0, no weakest, suggestion tells user to start', () => {
    const report = computeReadiness({});
    expect(report.overall).toBe(0);
    expect(report.weakest).toBeNull();
    expect(report.mockReady).toBe(false);
    expect(report.suggestion.toLowerCase()).toContain('start');
  });

  it('with a few low-accuracy answers in one section: weakest = that section, overall is low', () => {
    const fire = questionsBySection('Fire Regulations').slice(0, 3);
    const stats: Record<string, QuestionStat> = {
      [fire[0].id]: stat(3, 0),
      [fire[1].id]: stat(3, 0),
      [fire[2].id]: stat(3, 1),
    };
    const report = computeReadiness(stats);
    expect(report.weakest?.section).toBe('Fire Regulations');
    expect(report.overall).toBeLessThan(20);
    expect(report.mockReady).toBe(false);
  });

  it('caps under-covered sections so accuracy alone cannot fake readiness', () => {
    // 100% accuracy on a single seen question in one section
    const fire = questionsBySection('Fire Regulations')[0];
    const stats: Record<string, QuestionStat> = {
      [fire.id]: stat(1, 1),
    };
    const report = computeReadiness(stats);
    const fireRow = report.perSection.find((r) => r.section === 'Fire Regulations')!;
    expect(fireRow.accuracy).toBe(100);
    expect(fireRow.coverageRatio).toBeLessThan(1);
    expect(fireRow.score).toBeLessThan(100);
    expect(report.mockReady).toBe(false);
  });

  it('mockReady becomes true only when every section meets both coverage AND accuracy', () => {
    const stats: Record<string, QuestionStat> = {};
    // Heavy coverage + perfect score in every section.
    for (const { section, count } of mockExamBlueprint) {
      const sectionQs = questionsBySection(section);
      const target = Math.max(5, count * 2);
      for (let i = 0; i < target && i < sectionQs.length; i += 1) {
        stats[sectionQs[i].id] = stat(3, 3);
      }
    }
    const report = computeReadiness(stats);
    expect(report.overall).toBeGreaterThanOrEqual(mockReadyThreshold);
    expect(report.mockReady).toBe(true);
    expect(report.suggestion.toLowerCase()).toContain('mock');
  });

  it('weights bigger sections more heavily in the overall score', () => {
    // Strong in tiny section (Waste Management, weight 1), weak in big section
    // (Containment Systems, weight 4) → overall stays low.
    const waste = questionsBySection('Waste Management').slice(0, 5);
    const containment = questionsBySection('Containment Systems').slice(0, 10);
    const stats: Record<string, QuestionStat> = {};
    for (const q of waste) stats[q.id] = stat(3, 3);
    for (const q of containment) stats[q.id] = stat(3, 0);
    const report = computeReadiness(stats);
    expect(report.overall).toBeLessThan(40);
    expect(report.weakest?.section).toBe('Containment Systems');
  });

  it('handles unknown question IDs gracefully (e.g. after a bank deletion)', () => {
    const stats: Record<string, QuestionStat> = {
      'this-id-is-gone': stat(5, 3),
    };
    const report = computeReadiness(stats);
    expect(report.overall).toBe(0);
    expect(report.weakest).toBeNull();
  });
});
