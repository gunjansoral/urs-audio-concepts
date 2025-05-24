import audioFile from '../../../assets/audio.wav';

let audioContext: AudioContext | null = null;
let audioBuffer: AudioBuffer | null = null;
let currentSource: AudioBufferSourceNode | null = null;

export const initializeAudio = async (): Promise<void> => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  
  if (!audioBuffer) {
    const response = await fetch(audioFile);
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  }
};

export const stopCurrentSound = (): void => {
  if (currentSource) {
    currentSource.stop();
    currentSource = null;
  }
};

export const playFrequency = async (frequency: number, duration: number = 10): Promise<void> => {
  if (!audioContext || !audioBuffer) {
    await initializeAudio();
  }

  if (!audioContext || !audioBuffer) {
    throw new Error('Audio context or buffer not initialized');
  }

  // Stop any currently playing sound
  stopCurrentSound();

  const source = audioContext.createBufferSource();
  currentSource = source;
  source.buffer = audioBuffer;

  // Create multiple filters for stronger effect
  const filter1 = audioContext.createBiquadFilter();
  filter1.type = 'peaking';
  filter1.frequency.value = frequency;
  filter1.Q.value = 5; // Increased Q for more precise boost
  filter1.gain.value = 20; // Strong boost

  const filter2 = audioContext.createBiquadFilter();
  filter2.type = 'peaking';
  filter2.frequency.value = frequency;
  filter2.Q.value = 4; // Increased Q for more precise boost
  filter2.gain.value = 15; // Additional boost

  // Create a gain node for volume control
  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0.35; // Reduced by 3dB (from 0.7 to 0.35)

  // Connect the nodes in series
  source.connect(filter1);
  filter1.connect(filter2);
  filter2.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Start playback
  source.start();
  
  // Stop after duration
  setTimeout(() => {
    if (currentSource === source) {
      source.stop();
      currentSource = null;
    }
  }, duration * 1000);
};

export const formatFrequency = (frequency: number): string => {
  if (frequency >= 1000) {
    return `${(frequency / 1000).toFixed(1)}kHz`;
  }
  return `${frequency}Hz`;
};

export const calculateTolerance = (level: number): number => {
  // Decrease tolerance as level increases
  return Math.max(25, 200 - (level - 1) * 25);
};

export const isWithinTolerance = (selected: number, target: number, tolerance: number): boolean => {
  return Math.abs(selected - target) <= tolerance;
}; 