import React, { useState, useEffect, useRef } from 'react';
import './FindTheFreq.css';
import { playFrequency, formatFrequency, calculateTolerance, isWithinTolerance } from './audioUtils';

interface GameState {
  currentRound: number;
  totalRounds: number;
  currentLevel: number;
  score: number;
  isPlaying: boolean;
  selectedFrequency: number | null;
  targetFrequency: number;
  tolerance: number;
  frequencyBand: {
    min: number;
    max: number;
  };
  showTarget: boolean;
  startTime: number | null;
  totalTime: number;
  correctAnswers: number;
  isGameComplete: boolean;
  isGameOver: boolean;
  isGameStarted: boolean;
  isPaused: boolean;
  showInstructions: boolean;
  showRoundComplete: boolean;
}

// Logarithmic scale for frequencies from 20Hz to 20kHz
const MIN_FREQ = 20;
const MAX_FREQ = 20000;
const FREQUENCY_LABELS = [
  20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000
];

// Level-wise frequency band configurations
const LEVEL_BANDS = [
  { min: 500, max: 5000 },    // Level 1: 1/4 range
  { min: 600, max: 4000 },    // Level 2
  { min: 700, max: 3000 },    // Level 3
  { min: 800, max: 2500 },    // Level 4
  { min: 900, max: 2000 },    // Level 5
  { min: 1000, max: 1800 },   // Level 6
  { min: 1100, max: 1600 },   // Level 7
  { min: 1200, max: 1500 },   // Level 8
  { min: 1250, max: 1450 },   // Level 9
  { min: 1300, max: 1400 }    // Level 10
];

const FindTheFreq: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentRound: 1,
    totalRounds: 10,
    currentLevel: 1,
    score: 0,
    isPlaying: false,
    selectedFrequency: null,
    targetFrequency: 0,
    tolerance: 200,
    frequencyBand: LEVEL_BANDS[0],
    showTarget: false,
    startTime: null,
    totalTime: 0,
    correctAnswers: 0,
    isGameComplete: false,
    isGameOver: false,
    isGameStarted: false,
    isPaused: false,
    showInstructions: false,
    showRoundComplete: false
  });

  const [indicatorPosition, setIndicatorPosition] = useState<number>(0);
  const [currentFrequency, setCurrentFrequency] = useState<number>(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const spectrumRef = useRef<HTMLDivElement | null>(null);

  // Convert linear position (0-1) to logarithmic frequency
  const positionToFrequency = (position: number): number => {
    const minLog = Math.log10(MIN_FREQ);
    const maxLog = Math.log10(MAX_FREQ);
    const logFreq = minLog + (maxLog - minLog) * position;
    return Math.round(Math.pow(10, logFreq));
  };

  // Convert frequency to linear position (0-1)
  const frequencyToPosition = (frequency: number): number => {
    const minLog = Math.log10(MIN_FREQ);
    const maxLog = Math.log10(MAX_FREQ);
    const logFreq = Math.log10(frequency);
    return (logFreq - minLog) / (maxLog - minLog);
  };

  // Get frequency band for current level
  const getFrequencyBand = (level: number) => {
    const index = Math.min(level - 1, LEVEL_BANDS.length - 1);
    return LEVEL_BANDS[index];
  };

  // Calculate cursor width based on current frequency and band
  const calculateCursorWidth = (frequency: number) => {
    const { min, max } = gameState.frequencyBand;
    const bandWidth = max - min;
    const cursorWidth = (bandWidth / (MAX_FREQ - MIN_FREQ)) * 100;
    return Math.max(1, Math.min(100, cursorWidth)); // Ensure width is between 1% and 100%
  };

  // Generate frequency band based on level
  const generateFrequencyBand = (level: number) => {
    const baseMin = 20;
    const baseMax = 20000;
    const bandSize = Math.pow(2, level - 1); // Each level halves the frequency range
    
    const centerFreq = Math.sqrt(baseMin * baseMax);
    const minFreq = Math.max(baseMin, centerFreq / bandSize);
    const maxFreq = Math.min(baseMax, centerFreq * bandSize);
    
    return { min: minFreq, max: maxFreq };
  };

  // Generate a random frequency within the current band
  const generateTargetFrequency = () => {
    const { min, max } = gameState.frequencyBand;
    const position = Math.random();
    return Math.round(min + (max - min) * position);
  };

  // Start a new round
  const startNewRound = async () => {
    const newFrequencyBand = getFrequencyBand(gameState.currentLevel);
    const newTargetFrequency = generateTargetFrequency();
    const newTolerance = calculateTolerance(gameState.currentLevel);
    
    // Update state but keep showTarget as false
    setGameState(prev => ({
      ...prev,
      targetFrequency: newTargetFrequency,
      selectedFrequency: null,
      tolerance: newTolerance,
      isPlaying: false,
      frequencyBand: newFrequencyBand,
      showTarget: false, // Ensure target is hidden at start of round
      startTime: prev.startTime || Date.now()
    }));

    // Play the sound after state is updated
    setTimeout(async () => {
      try {
        setGameState(prev => ({ ...prev, isPlaying: true }));
        await playFrequency(newTargetFrequency); // Use the new target frequency directly
        setGameState(prev => ({ ...prev, isPlaying: false }));
      } catch (error) {
        console.error('Error playing frequency:', error);
        setGameState(prev => ({ ...prev, isPlaying: false }));
      }
    }, 500);
  };

  // Play the current target frequency
  const playCurrentFrequency = async () => {
    if (gameState.isPlaying) return;
    
    try {
      setGameState(prev => ({ ...prev, isPlaying: true }));
      await playFrequency(gameState.targetFrequency);
      setGameState(prev => ({ ...prev, isPlaying: false }));
    } catch (error) {
      console.error('Error playing frequency:', error);
      setGameState(prev => ({ ...prev, isPlaying: false }));
    }
  };

  // Check if it's possible to achieve required score
  const checkGameOver = (correctAnswers: number, currentRound: number) => {
    const remainingRounds = gameState.totalRounds - currentRound + 1;
    const requiredCorrect = 6 - correctAnswers;
    return remainingRounds < requiredCorrect;
  };

  // Handle frequency selection
  const handleFrequencySelect = (frequency: number) => {
    // Only show target frequency after user clicks
    setGameState(prev => ({
      ...prev,
      selectedFrequency: frequency,
      showTarget: true // Show target only after click
    }));

    // Use log-based cursor edges for correctness
    const edges = calculateCursorEdges(frequency);
    const isCorrect = gameState.targetFrequency >= edges.min && gameState.targetFrequency <= edges.max;
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    // Update score and correct answers
    const newCorrectAnswers = isCorrect ? gameState.correctAnswers + 1 : gameState.correctAnswers;
    const newScore = isCorrect ? gameState.score + 1 : gameState.score;

    // Check if game over
    if (checkGameOver(newCorrectAnswers, gameState.currentRound)) {
      setGameState(prev => ({
        ...prev,
        score: newScore,
        correctAnswers: newCorrectAnswers,
        isGameOver: true
      }));
      return;
    }

    // Check for level completion
    if (isCorrect && newCorrectAnswers >= 6) {
      if (gameState.currentLevel === 5) {
        setGameState(prev => ({
          ...prev,
          score: newScore,
          correctAnswers: newCorrectAnswers,
          isGameComplete: true
        }));
        return;
      }

      // Move to next level
      setTimeout(() => {
        const nextLevel = gameState.currentLevel + 1;
        const newFrequencyBand = getFrequencyBand(nextLevel);
        
        setGameState(prev => ({
          ...prev,
          currentLevel: nextLevel,
          currentRound: 1,
          correctAnswers: 0,
          score: newScore,
          frequencyBand: newFrequencyBand, // Update band immediately
          targetFrequency: 0, // Reset target frequency
          selectedFrequency: null,
          showTarget: false
        }));
        startNewRound();
      }, 2000);
      return;
    }

    // Move to next round
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        currentRound: prev.currentRound + 1,
        selectedFrequency: null,
        showTarget: false,
        score: newScore,
        correctAnswers: newCorrectAnswers
      }));
      startNewRound();
    }, 2000);
  };

  // Handle quit game
  const handleQuitGame = () => {
    window.location.reload();
  };

  // Calculate frequency from mouse position
  const calculateFrequency = (clientX: number) => {
    if (!spectrumRef.current) return 0;
    
    const rect = spectrumRef.current.getBoundingClientRect();
    const position = (clientX - rect.left) / rect.width;
    return positionToFrequency(position);
  };

  // Handle mouse move over spectrum
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!spectrumRef.current) return;
    
    const rect = spectrumRef.current.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const frequency = calculateFrequency(e.clientX);
    
    setIndicatorPosition(position * 100);
    setCurrentFrequency(frequency);
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  // Handle mouse click on spectrum
  const handleClick = (e: React.MouseEvent) => {
    const frequency = calculateFrequency(e.clientX);
    handleFrequencySelect(frequency);
  };

  // Calculate cursor edges (logarithmic, clamped)
  const calculateCursorEdges = (frequency: number) => {
    // Cursor width in log space (as a fraction of the log scale)
    const cursorWidthPercent = calculateCursorWidth(frequency);
    const minLog = Math.log10(MIN_FREQ);
    const maxLog = Math.log10(MAX_FREQ);
    const freqLog = Math.log10(frequency);
    const halfWidth = ((maxLog - minLog) * cursorWidthPercent) / 200; // half width in log units
    let minFreq = Math.pow(10, Math.max(minLog, freqLog - halfWidth));
    let maxFreq = Math.pow(10, Math.min(maxLog, freqLog + halfWidth));
    // Clamp
    minFreq = Math.max(MIN_FREQ, minFreq);
    maxFreq = Math.min(MAX_FREQ, maxFreq);
    return {
      min: minFreq,
      max: maxFreq,
      minPosition: frequencyToPosition(minFreq) * 100,
      maxPosition: frequencyToPosition(maxFreq) * 100
    };
  };

  // Timer effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (gameState.startTime && !gameState.isGameComplete && !gameState.isGameOver && !gameState.isPaused) {
      timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          totalTime: Date.now() - (prev.startTime || Date.now())
        }));
      }, 100);
    }
    return () => clearInterval(timer);
  }, [gameState.startTime, gameState.isGameComplete, gameState.isGameOver, gameState.isPaused]);

  // Format time display
  const formatTime = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Start game
  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      isGameStarted: true,
      startTime: Date.now()
    }));
    startNewRound();
  };

  // Toggle instructions
  const toggleInstructions = () => {
    setGameState(prev => ({
      ...prev,
      showInstructions: !prev.showInstructions,
      isPaused: !prev.showInstructions // Pause game when showing instructions
    }));
  };

  return (
    <div className="find-the-freq">
      {!gameState.isGameStarted ? (
        <div className="start-game-screen">
          <div className="start-game-content">
            <h2>Find The Frequency</h2>
            <div className="instructions">
              <h3>How to Play:</h3>
              <ul>
                <li>Listen to the sound sample by clicking "Play Sample"</li>
                <li>Find the matching frequency on the spectrum</li>
                <li>You need 6 correct answers to complete each level</li>
                <li>Complete all 5 levels to win</li>
                <li>Time is running, so be quick!</li>
              </ul>
            </div>
            <button 
              className="start-game-button"
              onClick={startGame}
            >
              Start Game
            </button>
          </div>
        </div>
      ) : gameState.isGameComplete ? (
        <div className="congratulations-screen">
          <div className="congratulations-content">
            <h2>Congratulations! 🎉</h2>
            <p>You've completed all 5 levels!</p>
            <div className="final-stats">
              <div className="stat-item">
                <span>Total Score</span>
                <span>{gameState.score}</span>
              </div>
              <div className="stat-item">
                <span>Total Time</span>
                <span>{formatTime(gameState.totalTime)}</span>
              </div>
              <div className="stat-item">
                <span>Levels Completed</span>
                <span>5/5</span>
              </div>
              <div className="stat-item">
                <span>Average Time per Level</span>
                <span>{formatTime(gameState.totalTime / 5)}</span>
              </div>
            </div>
            <button 
              className="next-round-button"
              onClick={() => window.location.reload()}
            >
              Play Again
            </button>
          </div>
        </div>
      ) : gameState.isGameOver ? (
        <div className="congratulations-screen">
          <div className="congratulations-content">
            <h2>Game Over! 😢</h2>
            <p>Not enough rounds left to complete the level.</p>
            <div className="final-stats">
              <div className="stat-item">
                <span>Current Level</span>
                <span>{gameState.currentLevel}</span>
              </div>
              <div className="stat-item">
                <span>Correct Answers</span>
                <span>{gameState.correctAnswers}/6</span>
              </div>
              <div className="stat-item">
                <span>Total Score</span>
                <span>{gameState.score}</span>
              </div>
              <div className="stat-item">
                <span>Time Played</span>
                <span>{formatTime(gameState.totalTime)}</span>
              </div>
            </div>
            <div className="game-over-buttons">
              <button 
                className="next-round-button"
                onClick={() => window.location.reload()}
              >
                Play Again
              </button>
              <button 
                className="retry-level-button"
                onClick={() => {
                  const currentTime = gameState.totalTime;
                  setGameState(prev => ({
                    ...prev,
                    currentRound: 1,
                    correctAnswers: 0,
                    isGameOver: false,
                    startTime: Date.now() - currentTime // Preserve elapsed time
                  }));
                  startNewRound();
                }}
              >
                Retry Level
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="game-header">
            <h2>Level {gameState.currentLevel} of 5</h2>
            <div className="game-stats">
              <div className="round-info">
                Round {gameState.currentRound} of {gameState.totalRounds}
              </div>
              <div className="score">Score: {gameState.score}</div>
              <div className="timer">Time: {formatTime(gameState.totalTime)}</div>
              <div className="correct-answers">
                Correct Answers: {gameState.correctAnswers}/6
              </div>
            </div>
            <div className="header-controls">
              <button 
                className="instructions-button"
                onClick={toggleInstructions}
              >
                <i className="fas fa-info-circle"></i>
              </button>
            </div>
            <div className="frequency-band-info">
              Range: {formatFrequency(gameState.frequencyBand.min)} - {formatFrequency(gameState.frequencyBand.max)}
            </div>
          </div>

          {gameState.showInstructions && (
            <div className="instructions-overlay">
              <div className="instructions-content">
                <h3>Game Instructions</h3>
                <ul>
                  <li>Listen to the sound sample by clicking "Play Sample"</li>
                  <li>Find the matching frequency on the spectrum</li>
                  <li>You need 6 correct answers to complete each level</li>
                  <li>Complete all 5 levels to win</li>
                  <li>Time is running, so be quick!</li>
                </ul>
                <button 
                  className="close-instructions-button"
                  onClick={toggleInstructions}
                >
                  Got it!
                </button>
              </div>
            </div>
          )}

          <div className="frequency-spectrum" 
               ref={spectrumRef}
               onMouseMove={handleMouseMove}
               onClick={handleClick}>
            <div className="spectrum-background">
              <div className="spectrum-gradient" />
            </div>
            <div 
              className="frequency-indicator"
              style={{ 
                left: `${indicatorPosition}%`,
                width: `${calculateCursorWidth(currentFrequency)}%`
              }}
            />
            {currentFrequency > 0 && (
              <>
                <div 
                  className="cursor-edge-marker"
                  style={{ 
                    left: `${calculateCursorEdges(currentFrequency).minPosition}%`,
                    backgroundColor: 'rgba(255, 0, 0, 0.8)'
                  }}
                >
                  {formatFrequency(Math.round(calculateCursorEdges(currentFrequency).min))}
                </div>
                <div 
                  className="cursor-edge-marker"
                  style={{ 
                    left: `${calculateCursorEdges(currentFrequency).maxPosition}%`,
                    backgroundColor: 'rgba(255, 0, 0, 0.8)'
                  }}
                >
                  {formatFrequency(Math.round(calculateCursorEdges(currentFrequency).max))}
                </div>
              </>
            )}
          
            <div className="frequency-labels">
              {FREQUENCY_LABELS.map(freq => (
                <div key={freq} className="frequency-label-container" style={{ left: `${frequencyToPosition(freq) * 100}%` }}>
                  <div className="frequency-tick" />
                  <span className="frequency-value">{formatFrequency(freq)}</span>
                </div>
              ))}
            </div>
            <div 
              className="frequency-display"
              style={{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y - 30}px`,
                opacity: currentFrequency ? 1 : 0
              }}
            >
              {formatFrequency(currentFrequency)}
            </div>
            {gameState.showTarget && (
              <div 
                className={`target-frequency-marker ${gameState.selectedFrequency && calculateCursorEdges(gameState.selectedFrequency).min <= gameState.targetFrequency && gameState.targetFrequency <= calculateCursorEdges(gameState.selectedFrequency).max ? 'correct' : ''}`}
                style={{ 
                  left: `${frequencyToPosition(gameState.targetFrequency) * 100}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                Target: {formatFrequency(gameState.targetFrequency)}
              </div>
            )}
          </div>

          <div className="controls">
            <button 
              onClick={() => playCurrentFrequency()}
              disabled={gameState.isPlaying}
            >
              {gameState.isPlaying ? 'Playing...' : 'Play Sample'}
            </button>
          </div>

          {feedback && (
            <div className={`feedback ${feedback}`}>
              {feedback === 'correct' ? 'Correct!' : 'Try again!'}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FindTheFreq; 