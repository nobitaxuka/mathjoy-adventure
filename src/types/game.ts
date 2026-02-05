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
  category: "CALCULATION" | "NUMBER_RECOGNITION";
  tags: {
    ageGroup: "3-4" | "5-6" | "7+";
    difficulty: "EASY" | "MEDIUM" | "HARD";
  };
}

export type AgeGroup = "3-4" | "5-6" | "7+";

export interface GameState {
  status: GameStatus;
  currentLevel: number;
  score: number;
  lives: number;
  currentQuestionIndex: number;
  questions: Question[];
  selectedAgeGroup: AgeGroup | null;
}
