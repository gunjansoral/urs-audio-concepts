import type { Band } from "./types";

// Convert frequency to x position
export const freqToX = (freq: number, width: number) => {
  const minFreq = 20;
  const maxFreq = 20000;
  return (
    ((Math.log10(freq) - Math.log10(minFreq)) /
      (Math.log10(maxFreq) - Math.log10(minFreq))) *
    width
  );
};

// Convert x position to frequency
export const xToFreq = (x: number, width: number) => {
  const minFreq = 20;
  const maxFreq = 20000;
  return Math.pow(
    10,
    (x / width) * (Math.log10(maxFreq) - Math.log10(minFreq)) +
      Math.log10(minFreq)
  );
};

// Calculate band response at a given frequency
export const calculateBandResponse = (band: Band, freq: number) => {
  if (band.bypass) return 0;

  const centerFreq = band.frequency;
  const q = band.q;
  const gain = band.gain;
  const slope = parseFloat(band.slope || "12");

  switch (band.type) {
    case "bell": {
      const logFreq = Math.log2(freq);
      const logCenterFreq = Math.log2(centerFreq);
      const bw = 1 / q; // Bandwidth in octaves
      const x = (logFreq - logCenterFreq) / bw;
      return gain * Math.exp(-x * x);
    }
    case "high-shelf": {
      const normalizedFreq = freq / centerFreq;
      const slopeFactor = slope / 12; // Convert to octaves
      const response = gain * (1 - Math.exp(-normalizedFreq * slopeFactor));
      return response;
    }
    case "low-shelf": {
      const normalizedFreq = centerFreq / freq;
      const slopeFactor = slope / 12; // Convert to octaves
      const response = gain * (1 - Math.exp(-normalizedFreq * slopeFactor));
      return response;
    }
    case "high-cut": {
      const normalizedFreq = freq / centerFreq;
      const slopeFactor = slope / 12; // Convert to octaves
      return -gain * (1 - Math.exp(-normalizedFreq * slopeFactor));
    }
    case "low-cut": {
      const normalizedFreq = centerFreq / freq;
      const slopeFactor = slope / 12; // Convert to octaves
      return -gain * (1 - Math.exp(-normalizedFreq * slopeFactor));
    }
  }
};
