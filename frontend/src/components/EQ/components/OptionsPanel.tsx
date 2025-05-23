import React, { useState } from "react";
import type { Band, BandType } from "../types";
import { BypassIcon, DeleteIcon } from "./Icons";
import Knob from "./Knob";
import {
  HANDLE_COLOR_BYPASSED,
  HANDLE_COLOR_SELECTED,
  HANDLE_COLOR_DESELECTED,
} from "../constants";

interface OptionsPanelProps {
  band: Band;
  selectedBand: string | null;
  gainRange: number;
  onBypass: () => void;
  onTypeChange: (type: BandType) => void;
  onSlopeChange: (slope: string) => void;
  onDelete: () => void;
  onFrequencyChange: (value: number) => void;
  onGainChange: (value: number) => void;
  onQChange: (value: number) => void;
}

const OptionsPanel: React.FC<OptionsPanelProps> = ({
  band,
  selectedBand,
  gainRange,
  onBypass,
  onTypeChange,
  onSlopeChange,
  onDelete,
  onFrequencyChange,
  onGainChange,
  onQChange,
}) => {
  const [hoverStates, setHoverStates] = useState({
    bypass: false,
    delete: false,
    stereo: false,
  });

  // Format gain value to show dB
  const formatGain = (value: number) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(1)}dB`;
  };

  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        background: "rgba(25,25,35,0.95)",
        borderRadius: 28,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)",
        backdropFilter: "blur(20px)",
        border: `2px solid ${
          band.bypass
            ? HANDLE_COLOR_BYPASSED
            : selectedBand === band.id
            ? HANDLE_COLOR_SELECTED
            : HANDLE_COLOR_DESELECTED
        }88`,
        zIndex: 30,
        padding: "36px 44px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "all",
        gap: 32,
        boxSizing: "border-box",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      className="band-options"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={onBypass}
          onMouseEnter={() =>
            setHoverStates((prev) => ({ ...prev, bypass: true }))
          }
          onMouseLeave={() =>
            setHoverStates((prev) => ({ ...prev, bypass: false }))
          }
          style={{
            background: "rgba(35,35,45,0.9)",
            border: "none",
            borderRadius: "50%",
            padding: 0,
            width: 52,
            height: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: hoverStates.bypass
              ? `0 0 0 3px ${
                  band.bypass ? HANDLE_COLOR_BYPASSED : HANDLE_COLOR_SELECTED
                }`
              : `0 0 0 2px ${
                  band.bypass ? HANDLE_COLOR_BYPASSED : HANDLE_COLOR_SELECTED
                }88`,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            flexShrink: 0,
            transform: hoverStates.bypass ? "scale(1.05)" : "scale(1)",
          }}
          title="Bypass"
        >
          <BypassIcon
            active={!!band.bypass}
            color={band.bypass ? HANDLE_COLOR_BYPASSED : HANDLE_COLOR_SELECTED}
          />
        </button>
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <select
            value={band.type}
            onChange={(e) => onTypeChange(e.target.value as BandType)}
            style={{
              background: "rgba(35,35,45,0.9)",
              color: band.bypass
                ? HANDLE_COLOR_BYPASSED
                : selectedBand === band.id
                ? HANDLE_COLOR_SELECTED
                : HANDLE_COLOR_DESELECTED,
              border: "none",
              borderRadius: 16,
              fontWeight: 600,
              fontSize: 16,
              padding: "14px 24px",
              boxShadow: `0 4px 16px ${
                band.bypass
                  ? HANDLE_COLOR_BYPASSED
                  : selectedBand === band.id
                  ? HANDLE_COLOR_SELECTED
                  : HANDLE_COLOR_DESELECTED
              }44`,
              minWidth: 160,
              backdropFilter: "blur(8px)",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 16px center",
              backgroundSize: "16px",
              paddingRight: "48px",
            }}
          >
            <option value="bell">Bell</option>
            <option value="high-shelf">High Shelf</option>
            <option value="low-shelf">Low Shelf</option>
            <option value="high-cut">High Cut</option>
            <option value="low-cut">Low Cut</option>
          </select>
          <select
            value={band.slope || "12"}
            onChange={(e) => onSlopeChange(e.target.value)}
            style={{
              background: "rgba(35,35,45,0.9)",
              color: "#fff",
              border: "none",
              borderRadius: 16,
              fontWeight: 600,
              fontSize: 15,
              padding: "12px 20px",
              minWidth: 120,
              backdropFilter: "blur(8px)",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 16px center",
              backgroundSize: "16px",
              paddingRight: "48px",
            }}
          >
            <option value="12">12 dB/oct</option>
            <option value="24">24 dB/oct</option>
            <option value="48">48 dB/oct</option>
          </select>
          <button
            onMouseEnter={() =>
              setHoverStates((prev) => ({ ...prev, stereo: true }))
            }
            onMouseLeave={() =>
              setHoverStates((prev) => ({ ...prev, stereo: false }))
            }
            style={{
              background: hoverStates.stereo
                ? "rgba(45,45,55,0.95)"
                : "rgba(35,35,45,0.9)",
              border: "none",
              borderRadius: 16,
              padding: "12px 24px",
              color: "#FFD600",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: hoverStates.stereo
                ? "0 6px 20px rgba(255, 214, 0, 0.3)"
                : "0 4px 16px rgba(255, 214, 0, 0.2)",
              transform: hoverStates.stereo
                ? "translateY(-1px)"
                : "translateY(0)",
            }}
          >
            Stereo
          </button>
        </div>
        <button
          onClick={onDelete}
          onMouseEnter={() =>
            setHoverStates((prev) => ({ ...prev, delete: true }))
          }
          onMouseLeave={() =>
            setHoverStates((prev) => ({ ...prev, delete: false }))
          }
          style={{
            background: "rgba(35,35,45,0.9)",
            border: "none",
            borderRadius: "50%",
            padding: 0,
            width: 52,
            height: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: hoverStates.delete
              ? "0 0 0 3px #FF4081"
              : "0 0 0 2px #FF408188",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            flexShrink: 0,
            transform: hoverStates.delete ? "scale(1.05)" : "scale(1)",
          }}
          title="Delete"
        >
          <DeleteIcon color="#FF4081" />
        </button>
      </div>
      <div
        style={{
          display: "flex",
          gap: 64,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <Knob
          value={band.frequency}
          min={20}
          max={20000}
          step={1}
          onChange={onFrequencyChange}
          onDoubleClick={() => {}}
          label="FREQ"
          isFrequency={true}
        />
        <Knob
          value={band.gain}
          min={-gainRange}
          max={gainRange}
          step={0.1}
          onChange={onGainChange}
          onDoubleClick={() => {}}
          label="GAIN"
          formatValue={formatGain}
        />
        <Knob
          value={band.q}
          min={0.1}
          max={10}
          step={0.01}
          onChange={onQChange}
          onDoubleClick={() => {}}
          label="Q"
        />
      </div>
    </div>
  );
};

export default OptionsPanel;
