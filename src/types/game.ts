export type GameStatus = "START" | "PLAYING" | "GAME_OVER" | "VICTORY";

export type QuestionType = "CHOICE" | "DRAG_DROP";

export interface Question {
  id: string;
  type: QuestionType;
  level: number;
  content: string; // The question text, e.g., "1 + 1 = ?"
  options?: string[]; // Multiple choice options
  correctAnswer: string;
  imageUrl?: string; // Optional image for the question
}

export interface GameState {
  status: GameStatus;
  currentLevel: number;
  score: number;
  lives: number;
  currentQuestionIndex: number;
  questions: Question[];
}
