import React from 'react';
import { useAudioMotor } from '../../context/AudioMotorContext';
import './PauseOverlay.css';

const PauseOverlay: React.FC = () => {
  const { resumeGame, exitGame } = useAudioMotor();

  return (
    <div className="pause-overlay">
      <div className="pause-content">
        <h2>Game Paused</h2>
        <div className="pause-actions">
          <button className="resume-button" onClick={resumeGame}>
            Resume
          </button>
          <button className="exit-button" onClick={exitGame}>
            Exit to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PauseOverlay; 