// types/index.ts
export interface Card {
  id: string;
  stage: number;
  type: 'letter' | 'word' | 'sentence' | 'listening' | 'quranic' | 'listening_letter' | 'listening_syllable' | 'listening_word' | 'listening_sentence' | 'listening_context' | 'dictation_letter' | 'dictation_syllable' | 'dictation_word' | 'dictation_sentence';
  arabic?: string;
  letter?: string;
  transliteration: string;
  meaning?: string;
  sound?: string;
  description?: string;
  question?: string;
  correctAnswer?: string;
  options?: string[];
  audio: string;
  mastery: 0 | 1;
  streak: number;
  lastReviewed?: string;
  nextReview?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  easeFactor?: number;
  interval?: number;
}

export interface Stage {
  id: number;
  name: string;
  description: string;
  icon: string;
  cards: Card[];
  masteryRequired: number;
  unlockCondition: number;
}

export interface UserProgress {
  currentStage: number;
  totalMastered: number;
  totalCards: number;
  accuracy: number;
  timeSpent: number;
  badges: string[];
  currentStreak: number;
  stageMastery: number;
  stageTime: number;
}

export interface GameState {
  mainDeck: Card[];
  wrongStack: Card[];
  currentCard: Card | null;
  feedback: string;
  score: number;
  attempts: number;
  showHint: boolean;
  sessionComplete: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  showDifficultySelector: boolean;
  stage: string;
  selectedAnswer: string | null;
  isCorrectAnswer: boolean | null;
}

export interface AudioManager {
  preloadStageAudio: (stageId: string) => Promise<void>;
  playAudio: (url: string) => void;
  preloaded: boolean;
}

export interface SpacedRepetitionResult {
  interval: number;
  easeFactor: number;
  nextReview: Date;
}
