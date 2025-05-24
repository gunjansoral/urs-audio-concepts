import { useAudioMotor } from '../../context/AudioMotorContext';
import GameDashboard from './GameDashboard';
import GamePlay from './GamePlay';
import PauseOverlay from './PauseOverlay';
import FindTheFreq from './FindTheFreq/FindTheFreq';

const AudioMotor: React.FC = () => {
  const { currentGame, gameState } = useAudioMotor();

  return (
    <div className="audio-motor">
      {!currentGame ? (
        <GameDashboard />
      ) : currentGame.id === 'findTheFreq' ? (
        <FindTheFreq />
      ) : (
        <>
          <GamePlay />
          {gameState.isPaused && <PauseOverlay />}
        </>
      )}
    </div>
  );
};

export default AudioMotor; 