import React from "react";
import type { ProKnobProps } from "../types";

const ProKnob: React.FC<ProKnobProps> = ({
  value,
  min,
  max,
  step,
  onChange,
  label,
  arcColor = "#4CAF50",
  arcRange,
}) => {
  const size = 72;
  const radius = 28;
  const angleRange = 270;
  const startAngle = 135;
  const percent = (value - min) / (max - min);
  const angle = startAngle + percent * angleRange;
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const knobX = size / 2 + radius * Math.cos(rad(angle));
  const knobY = size / 2 + radius * Math.sin(rad(angle));

  // Arc for gain
  let arcStart = startAngle;
  let arcEnd = angle;
  if (arcRange) {
    arcStart = startAngle + ((arcRange[0] - min) / (max - min)) * angleRange;
    arcEnd = startAngle + ((arcRange[1] - min) / (max - min)) * angleRange;
  }

  const arcPath = (a1: number, a2: number) => {
    const r = radius + 7;
    const x1 = size / 2 + r * Math.cos(rad(a1));
    const y1 = size / 2 + r * Math.sin(rad(a1));
    const x2 = size / 2 + r * Math.cos(rad(a2));
    const y2 = size / 2 + r * Math.sin(rad(a2));
    const largeArc = a2 - a1 > 180 ? 1 : 0;
    return `M${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2}`;
  };

  const handlePointerDown = (
    e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>
  ) => {
    e.preventDefault();
    const startY =
      "touches" in e
        ? (e as React.TouchEvent).touches[0].clientY
        : (e as React.MouseEvent).clientY;
    const startValue = value;
    const move = (ev: MouseEvent | TouchEvent) => {
      const y =
        "touches" in ev
          ? (ev as TouchEvent).touches[0].clientY
          : (ev as MouseEvent).clientY;
      let delta = startY - y;
      let newValue = startValue + (delta * (max - min)) / 100;
      newValue = Math.max(
        min,
        Math.min(max, Math.round(newValue / step) * step)
      );
      onChange(Number(newValue.toFixed(2)));
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        userSelect: "none",
        minWidth: 90,
      }}
    >
      <svg
        width={size}
        height={size}
        style={{ cursor: "pointer", filter: "drop-shadow(0 2px 8px #0008)" }}
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
      >
        {/* Glassy knob base */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius + 7}
          fill="#23233a"
          stroke="#444"
          strokeWidth="2.5"
        />
        {/* Arc for gain */}
        {arcRange && (
          <path
            d={arcPath(arcStart, arcEnd)}
            stroke={arcColor}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
        )}
        {/* Main knob */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="#2a2a2a"
          stroke="#888"
          strokeWidth="2.5"
        />
        {/* Indicator */}
        <path
          d={`M${size / 2},${size / 2} L${knobX},${knobY}`}
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Value inside knob */}
        <text
          x={size / 2}
          y={size / 2 + 7}
          textAnchor="middle"
          fontSize="18"
          fontWeight="bold"
          fill="#fff"
          style={{ filter: "drop-shadow(0 1px 2px #0008)" }}
        >
          {Number(value).toFixed(2)}
        </text>
      </svg>
      <div
        style={{
          marginTop: 8,
          fontSize: 15,
          color: "#bbb",
          fontWeight: 600,
          letterSpacing: 1,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default ProKnob;
