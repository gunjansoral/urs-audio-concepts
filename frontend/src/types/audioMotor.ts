export interface Game {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isLocked: boolean;
  type: 'frequency' | 'pitch' | 'rhythm';
}

export interface GameState {
  currentRound: number;
  totalRounds: number;
  difficulty: 'easy' | 'medium' | 'hard';
  isPaused: boolean;
  isGameOver: boolean;
  score: number;
}

export interface AudioMotorContextType {
  games: Game[];
  currentGame: Game | null;
  gameState: GameState;
  setCurrentGame: (game: Game | null) => void;
  startGame: (gameId: string) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  exitGame: () => void;
  nextRound: () => void;
  submitAnswer: (answer: any) => void;
} 