export const generateBellFrequency = (frequency: number, duration: number = 2): AudioBuffer => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const sampleRate = audioContext.sampleRate;
  const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
  const data = buffer.getChannelData(0);

  // Generate a bell-like sound using additive synthesis
  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate;
    // Main frequency
    data[i] = Math.sin(2 * Math.PI * frequency * t);
    // Add harmonics
    data[i] += 0.5 * Math.sin(2 * Math.PI * frequency * 2 * t);
    data[i] += 0.25 * Math.sin(2 * Math.PI * frequency * 3 * t);
    // Apply envelope
    const envelope = Math.exp(-3 * t);
    data[i] *= envelope;
  }

  return buffer;
};

export const playFrequency = async (frequency: number, duration: number = 2): Promise<void> => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const buffer = generateBellFrequency(frequency, duration);
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();
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