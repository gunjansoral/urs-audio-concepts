import React from "react";

interface PresetsProps {
  onPresetSelect: (preset: string) => void;
}

const Presets: React.FC<PresetsProps> = ({ onPresetSelect }) => {
  return (
    <div
      className="eq-presets"
      style={{
        display: "flex",
        gap: "12px",
        justifyContent: "center",
        width: "100%",
        boxSizing: "border-box",
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={() => onPresetSelect("flat")}
        title="Flat Response"
        style={{
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          background: "rgba(35,35,45,0.8)",
          color: "#fff",
          cursor: "pointer",
          transition: "all 0.2s ease",
          backdropFilter: "blur(8px)",
        }}
      >
        Flat
      </button>
      <button
        onClick={() => onPresetSelect("bass-boost")}
        title="Bass Boost"
        style={{
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          background: "rgba(35,35,45,0.8)",
          color: "#fff",
          cursor: "pointer",
          transition: "all 0.2s ease",
          backdropFilter: "blur(8px)",
        }}
      >
        Bass Boost
      </button>
      <button
        onClick={() => onPresetSelect("treble-boost")}
        title="Treble Boost"
        style={{
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          background: "rgba(35,35,45,0.8)",
          color: "#fff",
          cursor: "pointer",
          transition: "all 0.2s ease",
          backdropFilter: "blur(8px)",
        }}
      >
        Treble Boost
      </button>
      <button
        onClick={() => onPresetSelect("vocal-boost")}
        title="Vocal Boost"
        style={{
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          background: "rgba(35,35,45,0.8)",
          color: "#fff",
          cursor: "pointer",
          transition: "all 0.2s ease",
          backdropFilter: "blur(8px)",
        }}
      >
        Vocal Boost
      </button>
    </div>
  );
};

export default Presets;
