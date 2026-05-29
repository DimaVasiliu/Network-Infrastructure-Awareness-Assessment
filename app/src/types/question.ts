export type QuestionSection =
  | 'Standards and Regulations'
  | 'Network Topologies'
  | 'Copper Cabling'
  | 'Fibre Optic Cabling'
  | 'Containment and Installation'
  | 'Testing and Certification'
  | 'Health and Safety'
  | 'Fire Safety'
  | 'Documentation';

export type AnswerChoice = 'A' | 'B' | 'C' | 'D';

export type Question = {
  id: string;
  section: QuestionSection;
  question: string;
  choices: Record<AnswerChoice, string>;
  correctAnswer: AnswerChoice;
  explanation: string;
};

