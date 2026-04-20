export type Subject = 'physics' | 'chemistry' | 'maths';

export interface Topic {
  id: string;
  name: string;
  subject: Subject;
  progress: number; // 0 to 100
  questionsAttempted: number;
  accuracy: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: Subject;
  topic: string;
}

export interface TestSession {
  id: string;
  startTime: string;
  endTime?: string;
  score: number;
  totalQuestions: number;
  answers: Record<string, number>;
}
