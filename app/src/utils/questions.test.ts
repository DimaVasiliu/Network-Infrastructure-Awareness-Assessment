import {
  buildMockExam,
  mockExamBlueprint,
  mockExamDurationSeconds,
  mockExamPassMark,
  mockExamQuestionCount,
  questionMap,
  questions,
  questionsByIds,
  questionsForSection,
  sectionAccuracy,
  shuffleQuestions,
  weakestPracticeSize,
  weakestQuestions,
  wrongAnsweredQuestions,
} from './questions';
import type { QuestionStat } from '../types/progress';

const now = '2026-05-29T12:00:00.000Z';

function stat(seen: number, correct: number, lastWasCorrect: boolean): QuestionStat {
  return { seen, correct, lastSeenAt: now, lastWasCorrect };
}

describe('utils/questions', () => {
  describe('mock exam constants', () => {
    it('blueprint totals match the published format', () => {
      expect(mockExamQuestionCount).toBe(30);
      expect(mockExamBlueprint.reduce((sum, b) => sum + b.count, 0)).toBe(30);
      expect(mockExamPassMark).toBe(24);
      expect(mockExamDurationSeconds).toBe(45 * 60);
    });

    it('weakestPracticeSize is sensible', () => {
      expect(weakestPracticeSize).toBeGreaterThan(0);
      expect(weakestPracticeSize).toBeLessThanOrEqual(50);
    });
  });

  describe('buildMockExam', () => {
    it('returns the expected number of questions', () => {
      const exam = buildMockExam();
      expect(exam).toHaveLength(mockExamQuestionCount);
    });

    it('respects the per-section blueprint', () => {
      const exam = buildMockExam();
      for (const { section, count } of mockExamBlueprint) {
        const have = exam.filter((q) => q.section === section).length;
        expect(have).toBe(count);
      }
    });

    it('contains no duplicate question IDs', () => {
      const exam = buildMockExam();
      const ids = new Set(exam.map((q) => q.id));
      expect(ids.size).toBe(exam.length);
    });

    it('returns a different ordering between subsequent calls (probabilistic)', () => {
      const a = buildMockExam()
        .map((q) => q.id)
        .join(',');
      const b = buildMockExam()
        .map((q) => q.id)
        .join(',');
      // Not strictly guaranteed, but with 30 items from 155 the odds of two
      // identical sequences are vanishingly small.
      expect(a).not.toBe(b);
    });
  });

  describe('questionsForSection', () => {
    it('only returns questions from the requested section', () => {
      const subset = questionsForSection('Fire Regulations');
      expect(subset.length).toBeGreaterThan(0);
      for (const q of subset) {
        expect(q.section).toBe('Fire Regulations');
      }
    });
  });

  describe('questionMap and questionsByIds', () => {
    it('maps every question by id', () => {
      expect(Object.keys(questionMap)).toHaveLength(questions.length);
    });

    it('returns questions in the requested id order', () => {
      const sample = [questions[3].id, questions[10].id, questions[1].id];
      const looked = questionsByIds(sample);
      expect(looked.map((q) => q.id)).toEqual(sample);
    });

    it('silently drops unknown ids', () => {
      const looked = questionsByIds(['definitely-not-a-real-id', questions[0].id]);
      expect(looked).toHaveLength(1);
      expect(looked[0].id).toBe(questions[0].id);
    });
  });

  describe('shuffleQuestions', () => {
    it('does not mutate the input array', () => {
      const input = questions.slice(0, 10);
      const before = input.map((q) => q.id);
      shuffleQuestions(input);
      const after = input.map((q) => q.id);
      expect(after).toEqual(before);
    });

    it('returns the same set of questions (just reordered)', () => {
      const input = questions.slice(0, 20);
      const shuffled = shuffleQuestions(input);
      expect(new Set(shuffled.map((q) => q.id))).toEqual(new Set(input.map((q) => q.id)));
    });
  });

  describe('wrongAnsweredQuestions', () => {
    it('returns only questions whose latest answer was wrong', () => {
      const stats: Record<string, QuestionStat> = {
        [questions[0].id]: stat(3, 1, false),
        [questions[1].id]: stat(3, 3, true),
        [questions[2].id]: stat(1, 0, false),
      };
      const wrong = wrongAnsweredQuestions(stats);
      expect(wrong.map((q) => q.id).sort()).toEqual([questions[0].id, questions[2].id].sort());
    });

    it('returns an empty array when nothing is wrong', () => {
      const stats: Record<string, QuestionStat> = {
        [questions[0].id]: stat(3, 3, true),
      };
      expect(wrongAnsweredQuestions(stats)).toHaveLength(0);
    });
  });

  describe('weakestQuestions', () => {
    it('orders by lowest accuracy first', () => {
      const stats: Record<string, QuestionStat> = {
        [questions[0].id]: stat(10, 9, true), // 90%
        [questions[1].id]: stat(10, 2, false), // 20%
        [questions[2].id]: stat(10, 5, true), // 50%
      };
      const ranked = weakestQuestions(stats, 3);
      expect(ranked.map((q) => q.id)).toEqual([questions[1].id, questions[2].id, questions[0].id]);
    });

    it('respects the requested limit', () => {
      const stats: Record<string, QuestionStat> = {};
      for (let i = 0; i < 20; i += 1) {
        stats[questions[i].id] = stat(5, i, false); // increasing accuracy
      }
      expect(weakestQuestions(stats, 10)).toHaveLength(10);
      expect(weakestQuestions(stats, 5)).toHaveLength(5);
    });

    it('ignores questions never seen', () => {
      const stats: Record<string, QuestionStat> = {
        [questions[0].id]: { seen: 0, correct: 0, lastSeenAt: now, lastWasCorrect: false },
        [questions[1].id]: stat(2, 1, false),
      };
      const ranked = weakestQuestions(stats, 5);
      expect(ranked.map((q) => q.id)).toEqual([questions[1].id]);
    });
  });

  describe('sectionAccuracy', () => {
    it('reports null accuracy for sections with no data', () => {
      const result = sectionAccuracy({});
      for (const row of result) {
        expect(row.accuracy).toBeNull();
        expect(row.seen).toBe(0);
      }
    });

    it('rolls per-question stats up to the section', () => {
      const fire = questions.filter((q) => q.section === 'Fire Regulations').slice(0, 2);
      const stats: Record<string, QuestionStat> = {
        [fire[0].id]: stat(4, 3, true),
        [fire[1].id]: stat(2, 0, false),
      };
      const row = sectionAccuracy(stats).find((r) => r.section === 'Fire Regulations')!;
      expect(row.seen).toBe(6);
      expect(row.correct).toBe(3);
      expect(row.accuracy).toBe(50); // 3/6 = 50%
    });
  });
});
