import { act, fireEvent, render } from '@testing-library/react-native';

import { QuizRunner } from './QuizRunner';
import type { Question } from '../types/question';

// Regression guard for the mock-exam "Maximum update depth exceeded" crash.
// Root cause was an unstable onSnapshot identity in a QuizRunner effect's deps
// combined with MockExamRunScreen subscribing reactively to mockSession, which
// re-rendered → new snapshot → re-render, looping forever. This test mounts the
// runner in mock mode with a timer and an onSnapshot spy, then exercises answer
// selection + timer ticks. If the loop returns, React throws during render and
// these assertions fail.

const questions: Question[] = [
  {
    id: 'q1',
    section: 'Personal Safety',
    question: 'First question?',
    choices: { A: 'Alpha', B: 'Bravo', C: 'Charlie', D: 'Delta' },
    correctAnswer: 'A',
    explanation: 'Because A.',
  },
  {
    id: 'q2',
    section: 'Cable Laying',
    question: 'Second question?',
    choices: { A: 'Alpha', B: 'Bravo', C: 'Charlie', D: 'Delta' },
    correctAnswer: 'B',
    explanation: 'Because B.',
  },
];

function renderMockRunner(onSnapshot: jest.Mock) {
  return render(
    <QuizRunner
      mode="mockExam"
      questions={questions}
      timerSeconds={120}
      passMark={1}
      onExit={jest.fn()}
      onComplete={jest.fn()}
      onSnapshot={onSnapshot}
    />,
  );
}

describe('QuizRunner mock exam', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('mounts in mock mode without an infinite update loop', () => {
    const onSnapshot = jest.fn();
    expect(() => renderMockRunner(onSnapshot)).not.toThrow();
  });

  it('does not snapshot unboundedly while idle (no render loop)', () => {
    const onSnapshot = jest.fn();
    renderMockRunner(onSnapshot);

    // Let the 1s timer tick a handful of times. A render loop would fire
    // snapshots far in excess of the elapsed seconds.
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(onSnapshot.mock.calls.length).toBeLessThan(20);
  });

  it('records the answer and emits a snapshot on selection', () => {
    const onSnapshot = jest.fn();
    const screen = renderMockRunner(onSnapshot);

    act(() => {
      fireEvent.press(screen.getByText('Alpha'));
    });

    const last = onSnapshot.mock.calls.at(-1)?.[0];
    expect(last?.answers).toEqual({ q1: 'A' });
  });
});
