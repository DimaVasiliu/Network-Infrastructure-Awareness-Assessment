import { questions } from './questionBank';
import type { AnswerChoice } from '../types/question';

const ANSWER_CHOICES: AnswerChoice[] = ['A', 'B', 'C', 'D'];

describe('question bank', () => {
  describe('schema integrity', () => {
    it('contains at least 145 questions', () => {
      expect(questions.length).toBeGreaterThanOrEqual(145);
    });

    it('has a unique id on every question', () => {
      const ids = questions.map((q) => q.id);
      const unique = new Set(ids);
      expect(unique.size).toBe(questions.length);
    });

    it('uses the nia-NN-NNN id format', () => {
      const pattern = /^nia-\d{2}-\d{3}$/;
      for (const q of questions) {
        expect(q.id).toMatch(pattern);
      }
    });

    it('gives every question a non-empty question stem', () => {
      for (const q of questions) {
        expect(typeof q.question).toBe('string');
        expect(q.question.trim().length).toBeGreaterThan(10);
      }
    });

    it('gives every question exactly four labelled choices (A–D)', () => {
      for (const q of questions) {
        const keys = Object.keys(q.choices).sort();
        expect(keys).toEqual(ANSWER_CHOICES);
        for (const key of ANSWER_CHOICES) {
          expect(typeof q.choices[key]).toBe('string');
          expect(q.choices[key].trim().length).toBeGreaterThan(1);
        }
      }
    });

    it('has a correctAnswer that exists in the choices map', () => {
      for (const q of questions) {
        expect(ANSWER_CHOICES).toContain(q.correctAnswer);
        expect(q.choices[q.correctAnswer]).toBeDefined();
        expect(q.choices[q.correctAnswer].length).toBeGreaterThan(0);
      }
    });

    it('has no duplicate choices within a single question', () => {
      for (const q of questions) {
        const values = ANSWER_CHOICES.map((c) => q.choices[c]);
        const unique = new Set(values);
        expect(unique.size).toBe(4);
      }
    });

    it('has a non-empty explanation on every question', () => {
      for (const q of questions) {
        expect(typeof q.explanation).toBe('string');
        expect(q.explanation.trim().length).toBeGreaterThan(10);
      }
    });

    it('has a standardRef on every question', () => {
      for (const q of questions) {
        expect(typeof q.standardRef).toBe('string');
        expect((q.standardRef ?? '').trim().length).toBeGreaterThan(0);
      }
    });
  });

  describe('per-section coverage for the mock-exam blueprint', () => {
    const required: Record<string, number> = {
      'Product Selection': 3,
      'Containment Systems': 4,
      'Cable Laying': 4,
      'Cable Dressing': 4,
      'Fire Regulations': 3,
      'Safe Cable Installation': 4,
      'Personal Safety': 4,
      'Other Services': 3,
      'Waste Management': 1,
    };

    it.each(Object.entries(required))(
      'has at least %s questions in section "%s"',
      (sectionName, minCount) => {
        const have = questions.filter((q) => q.section === sectionName).length;
        expect(have).toBeGreaterThanOrEqual(Number(minCount));
      },
    );

    it('covers all nine assessment sections', () => {
      const present = new Set<string>(questions.map((q) => q.section));
      expect(present.size).toBe(9);
      for (const section of Object.keys(required)) {
        expect(present.has(section)).toBe(true);
      }
    });
  });

  describe('correct-answer letter distribution', () => {
    it('is not all the same letter (the rotateCorrectAnswer regression)', () => {
      const distribution: Record<AnswerChoice, number> = { A: 0, B: 0, C: 0, D: 0 };
      for (const q of questions) {
        distribution[q.correctAnswer] += 1;
      }
      // every letter has at least 10% representation — guards against
      // a regression where ids hash all to the same letter
      const min = Math.min(...Object.values(distribution));
      expect(min).toBeGreaterThan(questions.length * 0.1);
    });

    it('is not perfectly cyclic A→B→C→D (the original audit regression)', () => {
      let cyclic = true;
      for (let i = 0; i < questions.length; i += 1) {
        const expected = ANSWER_CHOICES[i % 4];
        if (questions[i].correctAnswer !== expected) {
          cyclic = false;
          break;
        }
      }
      expect(cyclic).toBe(false);
    });
  });
});
