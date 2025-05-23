import React from 'react';
import { AudioMotorProvider } from '../context/AudioMotorContext';
import AudioMotor from '../components/AudioMotor/AudioMotor';

const AudioMotorPage: React.FC = () => {
  return (
    <div className="audio-motor-page">
      <AudioMotorProvider>
        <AudioMotor />
      </AudioMotorProvider>
    </div>
  );
};

export default AudioMotorPage; 