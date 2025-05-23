import React, { useRef, useEffect } from "react";
import type { Band } from "../types";
import { CANVAS_SIZE } from "../constants";
import { freqToX, xToFreq, calculateBandResponse } from "../utils";

interface CanvasProps {
  bands: Band[];
  selectedBand: string | null;
  isGlobalBypass: boolean;
  gainRange: number;
  onDoubleClick: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onClick: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

const Canvas: React.FC<CanvasProps> = ({
  bands,
  selectedBand,
  isGlobalBypass,
  gainRange,
  onDoubleClick,
  onMouseDown,
  onMouseMove,
  onClick,
  onMouseUp,
  onMouseLeave,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // --- FabFilter-like background gradient ---
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, "#23233a");
    grad.addColorStop(1, "#181825");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // --- Grid lines ---
    ctx.save();
    ctx.strokeStyle = "rgba(200,200,255,0.07)";
    ctx.lineWidth = 1;
    // Vertical grid (logarithmic)
    const frequencies = [20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000];
    frequencies.forEach((freq) => {
      const x = freqToX(freq, canvas.width);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
      // Frequency labels
      ctx.save();
      ctx.fillStyle = "rgba(180,180,220,0.18)";
      ctx.font = "12px Inter, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        freq >= 1000 ? `${freq / 1000}k` : freq.toString(),
        x,
        canvas.height - 8
      );
      ctx.restore();
    });
    // Horizontal grid (gain)
    const step = gainRange <= 12 ? 3 : gainRange <= 24 ? 6 : 12;
    for (let i = -gainRange; i <= gainRange; i += step) {
      const y = canvas.height / 2 + (i * canvas.height) / (gainRange * 2);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
      // Gain labels
      ctx.save();
      ctx.fillStyle = "rgba(180,180,220,0.18)";
      ctx.font = "12px Inter, Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`${i}dB`, 8, y - 2);
      ctx.restore();
    }
    ctx.restore();

    // --- Main EQ curve (thick, glowing) ---
    const points = [];
    for (let x = 0; x < canvas.width; x += 1) {
      const freq = xToFreq(x, canvas.width);
      let totalGain = 0;
      if (!isGlobalBypass) {
        bands.forEach((band) => {
          totalGain += calculateBandResponse(band, freq);
        });
      }
      const y =
        canvas.height / 2 - (totalGain * canvas.height) / (gainRange * 2);
      points.push({ x, y });
    }
    ctx.save();
    ctx.shadowColor = "#4CAF50";
    ctx.shadowBlur = 16;
    ctx.strokeStyle = "rgba(76,175,80,0.95)";
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    points.forEach((point, i) => {
      if (i === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
    ctx.restore();

    // --- Handles (FabFilter style) ---
    bands.forEach((band) => {
      const x = freqToX(band.frequency, canvas.width);
      const y =
        canvas.height / 2 - (band.gain * canvas.height) / (gainRange * 2);
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, selectedBand === band.id ? 15 : 11, 0, Math.PI * 2);
      if (band.bypass) {
        ctx.shadowColor = "#FF4081";
        ctx.shadowBlur = 16;
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "#FF4081";
      } else if (selectedBand === band.id) {
        ctx.shadowColor = "#4CAF50";
        ctx.shadowBlur = 32;
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#4CAF50";
      } else {
        ctx.shadowColor = "#2196F3";
        ctx.shadowBlur = 12;
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "#2196F3";
      }
      ctx.fill();
      ctx.restore();
      // Draw white border for selected
      if (selectedBand === band.id) {
        ctx.beginPath();
        ctx.arc(x, y, 17, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.9)";
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }
    });
  }, [bands, selectedBand, isGlobalBypass, gainRange]);

  return (
    <div
      className="eq-canvas-container"
      style={{
        position: "relative",
        width: "100%",
        margin: "0 auto",
        background: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        boxSizing: "border-box",
      }}
    >
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE.width}
        height={CANVAS_SIZE.height}
        onDoubleClick={onDoubleClick}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onClick={onClick}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        className="eq-canvas"
        style={{
          background: "rgba(30,30,40,0.7)",
          borderRadius: 18,
          boxShadow: "0 4px 32px rgba(0,0,0,0.25)",
          width: "100%",
          maxWidth: CANVAS_SIZE.width,
          height: "auto",
          aspectRatio: `${CANVAS_SIZE.width} / ${CANVAS_SIZE.height}`,
          display: "block",
          margin: "0 auto",
        }}
      />
      <div
        className="eq-help"
        style={{
          textAlign: "center",
          color: "rgba(180,180,220,0.6)",
          fontSize: "14px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <p style={{ margin: 0 }}>
          Double-click to add band • Drag to adjust • Arrow keys for fine
          control • G for global bypass • R to reset
        </p>
      </div>
    </div>
  );
};

export default Canvas;
