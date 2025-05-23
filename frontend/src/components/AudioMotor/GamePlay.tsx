import React, { useState, useCallback } from 'react';
import { useAudioMotor } from '../../context/AudioMotorContext';
import './GamePlay.css';

const GamePlay: React.FC = () => {
  const { currentGame, gameState, exitGame, pauseGame, nextRound, submitAnswer } = useAudioMotor();
  const [selectedFrequency, setSelectedFrequency] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFrequencySelect = useCallback((frequency: number) => {
    setSelectedFrequency(frequency);
  }, []);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
    // TODO: Implement actual audio playback
  }, [isPlaying]);

  const handleSubmit = useCallback(() => {
    if (selectedFrequency !== null) {
      submitAnswer(selectedFrequency);
      // TODO: Implement actual answer validation
      nextRound();
    }
  }, [selectedFrequency, submitAnswer, nextRound]);

  if (!currentGame) return null;

  return (
    <div className="game-play">
      <div className="game-header">
        <h2>{currentGame.name}</h2>
        <button className="exit-button" onClick={exitGame}>
          Exit
        </button>
      </div>

      <div className="game-controls">
        <button 
          className="play-pause-button"
          onClick={handlePlayPause}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        
        <div className="volume-control">
          <input 
            type="range" 
            min="0" 
            max="100" 
            defaultValue="50"
            className="volume-slider"
          />
        </div>
      </div>

      <div className="frequency-spectrum">
        {/* Frequency spectrum visualization will go here */}
        <div className="spectrum-container">
          {Array.from({ length: 20 }, (_, i) => (
            <div 
              key={i}
              className={`frequency-band ${selectedFrequency === i ? 'selected' : ''}`}
              onClick={() => handleFrequencySelect(i)}
            />
          ))}
        </div>
      </div>

      <div className="game-status">
        <div className="round-info">
          Round {gameState.currentRound} of {gameState.totalRounds}
        </div>
        <div className="difficulty-info">
          Difficulty: {gameState.difficulty}
        </div>
      </div>

      <div className="game-actions">
        <button 
          className="submit-button"
          onClick={handleSubmit}
          disabled={selectedFrequency === null}
        >
          Submit
        </button>
        <button 
          className="next-button"
          onClick={nextRound}
        >
          Next Round
        </button>
      </div>

      <div className="feedback-area">
        {/* Feedback messages will appear here */}
      </div>
    </div>
  );
};

export default GamePlay; 