import React from 'react';
import { useAudioMotor } from '../../context/AudioMotorContext';
import './GameDashboard.css';

const GameDashboard: React.FC = () => {
  const { games, startGame } = useAudioMotor();

  return (
    <div className="game-dashboard">
      <h1 className="dashboard-title">AudioMotor</h1>
      
      <div className="filter-bar">
        <select className="difficulty-filter">
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        
        <select className="type-filter">
          <option value="all">All Types</option>
          <option value="frequency">Frequency</option>
          <option value="pitch">Pitch</option>
          <option value="rhythm">Rhythm</option>
        </select>
      </div>

      <div className="games-grid">
        {games.map((game) => (
          <div key={game.id} className={`game-card ${game.isLocked ? 'locked' : ''}`}>
            <h3>{game.name}</h3>
            <p>{game.description}</p>
            <div className="game-meta">
              <span className="difficulty">{game.difficulty}</span>
              <span className="type">{game.type}</span>
            </div>
            {!game.isLocked ? (
              <button 
                className="play-button"
                onClick={() => startGame(game.id)}
              >
                Play
              </button>
            ) : (
              <button className="locked-button" disabled>
                Locked
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameDashboard; 