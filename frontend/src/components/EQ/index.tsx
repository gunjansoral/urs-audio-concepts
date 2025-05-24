import React, { useRef, useState, useEffect } from "react";
import type { Band, BandType, EQProps } from "./types";
import { BAND_COLORS } from "./constants";
import { freqToX, xToFreq } from "./utils";
import Header from "./components/Header";
import Presets from "./components/Presets";
import Canvas from "./components/Canvas";
import OptionsPanel from "./components/OptionsPanel";
import "./EQ.css";
import * as Tone from "tone";

// BandType to Tone.js filter type mapping
const mapBandTypeToToneType = (type: BandType): string => {
  switch (type) {
    case "bell":
      return "peaking";
    case "high-shelf":
      return "highshelf";
    case "low-shelf":
      return "lowshelf";
    case "high-cut":
      return "highpass";
    case "low-cut":
      return "lowpass";
    default:
      return "peaking";
  }
};

const EQ: React.FC<EQProps> = ({ audio, onEqChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Tone.Player | null>(null);
  const filterRefs = useRef<Tone.Filter[]>([]);
  const [bands, setBands] = useState<Band[]>([]);
  const [selectedBand, setSelectedBand] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isGlobalBypass, setIsGlobalBypass] = useState(false);
  // const [showOptions, setShowOptions] = useState(false);
  const [gainRange, setGainRange] = useState(12); // Default to ±12dB range
  const [isLoaded, setIsLoaded] = useState(false);

  // Assign color to new band
  const getNextColor = () => {
    const usedColors = bands.map((b) => b.color);
    return BAND_COLORS.find((c) => !usedColors.includes(c)) || BAND_COLORS[0];
  };

  // On double click, add band with color
  const handleDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const freq = xToFreq(x, canvas.width);
    const newBand = {
      id: Math.random().toString(36).substr(2, 9),
      frequency: Math.round(freq),
      gain: 0,
      q: 1,
      type: "bell" as BandType,
      bypass: false,
      color: getNextColor(),
      solo: false,
      slope: "12",
    };
    setBands([...bands, newBand]);
    setSelectedBand(newBand.id);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicking on a band
    let clickedBand = false;
    bands.forEach((band) => {
      const bandX = freqToX(band.frequency, canvas.width);
      const bandY =
        canvas.height / 2 - (band.gain * canvas.height) / (gainRange * 2);
      const distance = Math.sqrt(
        Math.pow(x - bandX, 2) + Math.pow(y - bandY, 2)
      );

      if (distance < 10) {
        setSelectedBand(band.id);
        setIsDragging(true);
        setDragStart({ x, y });
        clickedBand = true;
      }
    });

    if (!clickedBand) {
      setSelectedBand(null);
      // setShowOptions(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedBand) return;

    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const selectedBandData = bands.find((band) => band.id === selectedBand);
    if (!selectedBandData) return;

    const newBands = bands.map((band) => {
      if (band.id === selectedBand) {
        const dx = x - dragStart.x;
        const dy = y - dragStart.y;

        // Update frequency (horizontal movement)
        const newFreq = xToFreq(
          freqToX(band.frequency, canvas.width) + dx,
          canvas.width
        );

        // Update gain (vertical movement)
        const newGain = band.gain - dy / (canvas.height / (gainRange * 2));

        return {
          ...band,
          frequency: Math.round(newFreq),
          gain: Math.max(-gainRange, Math.min(gainRange, newGain)),
        };
      }
      return band;
    });

    setBands(newBands);
    setDragStart({ x, y });
    onEqChange?.(newBands);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    let found = null;
    bands.forEach((band) => {
      const bandX = freqToX(band.frequency, canvas.width);
      const bandY =
        canvas.height / 2 - (band.gain * canvas.height) / (gainRange * 2);
      const distance = Math.sqrt(
        Math.pow(x - bandX, 2) + Math.pow(y - bandY, 2)
      );
      if (distance < 14) found = band.id;
    });
    if (found) {
      // If shift key is pressed, toggle selection of this band
      if (e.shiftKey) {
        setSelectedBand(selectedBand === found ? null : found);
      } else {
        // If shift is not pressed, just select this band
        setSelectedBand(found);
      }
    } else {
      // If clicking empty space and shift is not pressed, deselect all
      if (!e.shiftKey) {
        setSelectedBand(null);
      }
    }
  };

  const handleTypeChange = (type: BandType) => {
    if (!selectedBand) return;

    const newBands = bands.map((band) => {
      if (band.id === selectedBand) {
        return {
          ...band,
          type,
        };
      }
      return band;
    });

    setBands(newBands);
    onEqChange?.(newBands);
  };

  const handleDeleteBand = () => {
    if (!selectedBand) return;
    const newBands = bands.filter((band) => band.id !== selectedBand);
    setBands(newBands);
    setSelectedBand(null);
    onEqChange?.(newBands);
  };

  const handleBypassBand = () => {
    if (!selectedBand) return;
    const newBands = bands.map((band) => {
      if (band.id === selectedBand) {
        return {
          ...band,
          bypass: !band.bypass,
        };
      }
      return band;
    });
    setBands(newBands);
    onEqChange?.(newBands);
  };

  const handleReset = () => {
    setBands([]);
    setSelectedBand(null);
    setIsGlobalBypass(false);
    onEqChange?.([]);
  };

  const handlePreset = (preset: string) => {
    switch (preset) {
      case "flat":
        setBands([]);
        break;
      case "bass-boost":
        setBands([
          {
            id: Math.random().toString(36).substr(2, 9),
            frequency: 60,
            gain: 6,
            q: 1,
            type: "bell" as BandType,
            bypass: false,
            color: getNextColor(),
            solo: false,
            slope: "12",
          },
          {
            id: Math.random().toString(36).substr(2, 9),
            frequency: 120,
            gain: 3,
            q: 1,
            type: "bell" as BandType,
            bypass: false,
            color: getNextColor(),
            solo: false,
            slope: "12",
          },
        ]);
        break;
      case "treble-boost":
        setBands([
          {
            id: Math.random().toString(36).substr(2, 9),
            frequency: 8000,
            gain: 4,
            q: 1,
            type: "bell" as BandType,
            bypass: false,
            color: getNextColor(),
            solo: false,
            slope: "12",
          },
          {
            id: Math.random().toString(36).substr(2, 9),
            frequency: 12000,
            gain: 6,
            q: 1,
            type: "bell" as BandType,
            bypass: false,
            color: getNextColor(),
            solo: false,
            slope: "12",
          },
        ]);
        break;
      case "vocal-boost":
        setBands([
          {
            id: Math.random().toString(36).substr(2, 9),
            frequency: 2000,
            gain: 3,
            q: 1,
            type: "bell" as BandType,
            bypass: false,
            color: getNextColor(),
            solo: false,
            slope: "12",
          },
          {
            id: Math.random().toString(36).substr(2, 9),
            frequency: 5000,
            gain: 2,
            q: 1,
            type: "bell" as BandType,
            bypass: false,
            color: getNextColor(),
            solo: false,
            slope: "12",
          },
        ]);
        break;
    }
    onEqChange?.(bands);
  };

  // Setup Tone.js Player and Filters
  useEffect(() => {
    setIsLoaded(false);
    if (playerRef.current) {
      playerRef.current.disconnect();
      playerRef.current.dispose();
      playerRef.current = null;
    }
    filterRefs.current.forEach((f) => {
      f.disconnect();
      f.dispose();
    });
    filterRefs.current = [];

    // Use onload callback in constructor
    const player = new Tone.Player(audio, () => setIsLoaded(true));
    playerRef.current = player;

    // Create filters
    const filters: Tone.Filter[] = [];
    bands.forEach((band) => {
      if (band.bypass) return;
      const filter = new Tone.Filter({
        type: mapBandTypeToToneType(band.type) as any,
        frequency: band.frequency,
      });
      filter.Q.value = band.q;
      filter.gain.value = band.gain;
      filters.push(filter);
    });
    filterRefs.current = filters;

    // Chain player -> ...filters -> Destination
    if (filters.length > 0) {
      player.chain(...filters, Tone.Destination);
    } else {
      player.connect(Tone.Destination);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.disconnect();
        playerRef.current.dispose();
        playerRef.current = null;
      }
      filterRefs.current.forEach((f) => {
        f.disconnect();
        f.dispose();
      });
      filterRefs.current = [];
    };
  }, [audio, bands]);

  useEffect(() => {
    filterRefs.current.forEach((filter, i) => {
      const band = bands[i];
      if (band && filter) {
        filter.set({
          type: mapBandTypeToToneType(band.type) as any,
          frequency: band.frequency,
        });
        filter.Q.value = band.q;
        filter.gain.value = band.gain;
      }
    });
  }, [bands]);

  // Play/Pause controls
  const handlePlay = async () => {
    await Tone.start();
    if (playerRef.current && isLoaded) {
      playerRef.current.stop();
      playerRef.current.seek(0);
      playerRef.current.start();
      setIsPlaying(true);
    }
  };
  const handlePause = () => {
    if (playerRef.current) {
      playerRef.current.stop();
      setIsPlaying(false);
    }
  };

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const container = containerRef.current;

      // Don't do anything if clicking inside the container
      if (container?.contains(target)) {
        return;
      }

      // Only deselect if clicking outside the container
      if (selectedBand) {
        setSelectedBand(null);
        // setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedBand]);

  // Auto-select first band if none is selected and bands exist
  useEffect(() => {
    if (!selectedBand && bands.length > 0) {
      setSelectedBand(bands[0].id);
    }
  }, [bands, selectedBand]);

  const selectedBandData = bands.find((band) => band.id === selectedBand);

  return (
    <div
      className="eq-container"
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        boxSizing: "border-box",
      }}
    >
      {/* Audio Player */}
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={isPlaying ? handlePause : handlePlay}
          disabled={!isLoaded}
        >
          {isPlaying ? "Pause" : isLoaded ? "Play" : "Loading..."}
        </button>
      </div>

      <Header
        isGlobalBypass={isGlobalBypass}
        onGlobalBypass={() => setIsGlobalBypass(!isGlobalBypass)}
        onReset={handleReset}
        gainRange={gainRange}
        onGainRangeChange={setGainRange}
      />

      <Presets onPresetSelect={handlePreset} />

      <Canvas
        bands={bands}
        selectedBand={selectedBand}
        isGlobalBypass={isGlobalBypass}
        gainRange={gainRange}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onClick={handleCanvasClick}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      />

      <OptionsPanel
        band={
          selectedBandData || {
            id: "",
            frequency: 0,
            gain: 0,
            q: 1,
            type: "bell",
            bypass: false,
            color: "",
            solo: false,
            slope: "12",
          }
        }
        selectedBand={selectedBand}
        gainRange={gainRange}
        onBypass={handleBypassBand}
        onTypeChange={handleTypeChange}
        onSlopeChange={(slope) => {
          if (!selectedBand) return;
          const newBands = bands.map((band) =>
            band.id === selectedBand ? { ...band, slope } : band
          );
          setBands(newBands);
          onEqChange?.(newBands);
        }}
        onDelete={handleDeleteBand}
        onFrequencyChange={(value) => {
          if (!selectedBand) return;
          const newBands = bands.map((band) =>
            band.id === selectedBand ? { ...band, frequency: value } : band
          );
          setBands(newBands);
          onEqChange?.(newBands);
        }}
        onGainChange={(value) => {
          if (!selectedBand) return;
          const newBands = bands.map((band) =>
            band.id === selectedBand ? { ...band, gain: value } : band
          );
          setBands(newBands);
          onEqChange?.(newBands);
        }}
        onQChange={(value) => {
          if (!selectedBand) return;
          const newBands = bands.map((band) =>
            band.id === selectedBand ? { ...band, q: value } : band
          );
          setBands(newBands);
          onEqChange?.(newBands);
        }}
      />
    </div>
  );
};

export default EQ;
