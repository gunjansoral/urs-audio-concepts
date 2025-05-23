import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Game, GameState, AudioMotorContextType } from '../types/audioMotor';

const initialGameState: GameState = {
  currentRound: 1,
  totalRounds: 10,
  difficulty: 'easy',
  isPaused: false,
  isGameOver: false,
  score: 0,
};

const initialGames: Game[] = [
  {
    id: 'findTheFreq',
    name: 'Find The Frequency',
    description: 'Identify and select the correct frequency from the audio',
    difficulty: 'easy',
    isLocked: false,
    type: 'frequency',
  },
  // Add more games here
];

const AudioMotorContext = createContext<AudioMotorContextType | undefined>(undefined);

export const AudioMotorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [games] = useState<Game[]>(initialGames);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const startGame = useCallback((gameId: string) => {
    const game = games.find((g: Game) => g.id === gameId);
    if (game) {
      setCurrentGame(game);
      setGameState((prev: GameState) => ({ ...prev, currentRound: 1, isGameOver: false, score: 0 }));
    }
  }, [games]);

  const pauseGame = useCallback(() => {
    setGameState((prev: GameState) => ({ ...prev, isPaused: true }));
  }, []);

  const resumeGame = useCallback(() => {
    setGameState((prev: GameState) => ({ ...prev, isPaused: false }));
  }, []);

  const exitGame = useCallback(() => {
    setCurrentGame(null);
    setGameState(initialGameState);
  }, []);

  const nextRound = useCallback(() => {
    setGameState((prev: GameState) => {
      if (prev.currentRound >= prev.totalRounds) {
        return { ...prev, isGameOver: true };
      }
      return { ...prev, currentRound: prev.currentRound + 1 };
    });
  }, []);

  const submitAnswer = useCallback((answer: any) => {
    // Implement game-specific answer validation here
    console.log('Answer submitted:', answer);
  }, []);

  const value: AudioMotorContextType = {
    games,
    currentGame,
    gameState,
    setCurrentGame,
    startGame,
    pauseGame,
    resumeGame,
    exitGame,
    nextRound,
    submitAnswer,
  };

  return (
    <AudioMotorContext.Provider value={value}>
      {children}
    </AudioMotorContext.Provider>
  );
};

export const useAudioMotor = () => {
  const context = useContext(AudioMotorContext);
  if (context === undefined) {
    throw new Error('useAudioMotor must be used within an AudioMotorProvider');
  }
  return context;
}; 