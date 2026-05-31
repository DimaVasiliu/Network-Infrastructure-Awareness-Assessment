export type QuestionSection =
  | 'Product Selection'
  | 'Containment Systems'
  | 'Cable Laying'
  | 'Cable Dressing'
  | 'Fire Regulations'
  | 'Safe Cable Installation'
  | 'Personal Safety'
  | 'Other Services'
  | 'Waste Management';

export type AnswerChoice = 'A' | 'B' | 'C' | 'D';

export type Question = {
  id: string;
  section: QuestionSection;
  question: string;
  choices: Record<AnswerChoice, string>;
  correctAnswer: AnswerChoice;
  explanation: string;
  standardRef?: string;
};

/**
 * Localized overlay for a question. By design only the EXPLANATION is
 * translated — question text and answer choices stay in English to match the
 * real (English-only) assessment. id, section, correctAnswer and standardRef
 * are unaffected.
 */
export type QuestionTranslation = {
  explanation: string;
};
