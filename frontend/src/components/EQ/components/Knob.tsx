import React, {
  useRef,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import type { KnobProps } from "../types";

interface KnobStyle {
  size?: number;
  strokeWidth?: number;
  arcColor?: string;
  labelColor?: string;
  valueColor?: string;
  backgroundColor?: string;
  activeColor?: string;
  disabledColor?: string;
}

const DEFAULT_STYLE: KnobStyle = {
  size: 92,
  strokeWidth: 6,
  arcColor: "#ffe082",
  labelColor: "#ffe082",
  valueColor: "#fff",
  backgroundColor: "rgba(22,22,28,0.92)",
  activeColor: "#ffb300",
  disabledColor: "#666",
};

// Utility functions for log scale mapping
const FREQ_MIN = 20;
const FREQ_MAX = 20000;
const LOG_RANGE = Math.log10(FREQ_MAX / FREQ_MIN);

function freqToNorm(freq: number) {
  // Map frequency (20-20000) to normalized value (0-1)
  return Math.log10(freq / FREQ_MIN) / LOG_RANGE;
}
function normToFreq(norm: number) {
  // Map normalized value (0-1) to frequency (20-20000)
  return FREQ_MIN * Math.pow(FREQ_MAX / FREQ_MIN, norm);
}

const Knob: React.FC<
  KnobProps & {
    style?: KnobStyle;
    disabled?: boolean;
    showValue?: boolean;
    snapToStep?: boolean;
    onValueChangeStart?: () => void;
    onValueChangeEnd?: () => void;
    isFrequency?: boolean;
    formatValue?: (value: number) => string;
  }
> = ({
  value,
  min,
  max,
  step,
  onChange,
  onDoubleClick = () => {},
  label,
  style = {},
  disabled = false,
  showValue = true,
  snapToStep = true,
  onValueChangeStart,
  onValueChangeEnd,
  isFrequency = false,
  formatValue,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);
  const [lastValue, setLastValue] = useState(value);

  // Merge default style with custom style
  const mergedStyle = useMemo(() => ({ ...DEFAULT_STYLE, ...style }), [style]);
  const {
    size = DEFAULT_STYLE.size!,
    strokeWidth = DEFAULT_STYLE.strokeWidth!,
    arcColor = DEFAULT_STYLE.arcColor!,
    labelColor = DEFAULT_STYLE.labelColor!,
    valueColor = DEFAULT_STYLE.valueColor!,
    backgroundColor = DEFAULT_STYLE.backgroundColor!,
    activeColor = DEFAULT_STYLE.activeColor!,
    disabledColor = DEFAULT_STYLE.disabledColor!,
  } = mergedStyle;

  // Memoize constants
  const constants = useMemo(() => {
    const radius = (size - strokeWidth) / 2;
    const center = size / 2;
    const angleRange = 270;
    const startAngle = 135;
    const endAngle = startAngle + angleRange;
    return { radius, center, angleRange, startAngle, endAngle };
  }, [size, strokeWidth]);

  const { radius, center, angleRange, startAngle, endAngle } = constants;

  // Memoize angle calculations
  const angleToCoord = useCallback(
    (angle: number, customRadius = radius) => {
      const rad = (angle * Math.PI) / 180;
      return {
        x: center + customRadius * Math.cos(rad),
        y: center + customRadius * Math.sin(rad),
      };
    },
    [center, radius]
  );

  // For frequency, use log scale for percent
  const percent = useMemo(() => {
    if (isFrequency) {
      return freqToNorm(value);
    }
    return (value - min) / (max - min);
  }, [isFrequency, value, min, max]);

  const arcPercent = useMemo(() => {
    if (Math.abs(percent - 1) < 1e-6) return 0.9999;
    if (Math.abs(percent - 0.5) < 1e-6) return 0.5001;
    return percent;
  }, [percent]);

  const angle = startAngle + arcPercent * angleRange;

  // Memoize arc path
  const arcPath = useMemo(() => {
    if (percent <= 0) return "";
    const start = angleToCoord(startAngle);
    const end = angleToCoord(angle);
    const largeArc = Math.abs(angle - startAngle) > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  }, [angle, angleToCoord, percent, radius, startAngle]);

  // Memoize pointer coordinates
  const pointerCoords = useMemo(() => {
    const pointerLength = radius - 8;
    const pointerAngle = startAngle + percent * angleRange;
    const start = angleToCoord(pointerAngle, center - 6);
    const end = angleToCoord(pointerAngle, center - 6 + pointerLength);
    return { start, end };
  }, [angleToCoord, center, percent, radius, startAngle, angleRange]);

  // Handle value changes with snap and callbacks
  const handleValueChange = useCallback(
    (newValue: number) => {
      if (disabled) return;
      let clampedValue = newValue;
      if (isFrequency) {
        // Clamp to freq range
        clampedValue = Math.max(FREQ_MIN, Math.min(FREQ_MAX, clampedValue));
        // Snap to step if needed
        if (snapToStep) {
          // Step in Hz, round to nearest step
          clampedValue = Math.round(clampedValue / step) * step;
        }
      } else {
        // Snap and clamp for linear
        clampedValue = snapToStep
          ? Math.round(newValue / step) * step
          : Number(newValue.toFixed(2));
        clampedValue = Math.max(min, Math.min(max, clampedValue));
      }
      if (clampedValue !== lastValue) {
        setLastValue(clampedValue);
        onChange(clampedValue);
      }
    },
    [disabled, lastValue, max, min, onChange, snapToStep, step, isFrequency]
  );

  // Handle keyboard navigation (log scale for frequency)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      let newValue = value;
      if (isFrequency) {
        // Use normalized value for log scale
        let norm = freqToNorm(value);
        const stepNorm = step > 0 ? freqToNorm(value + step) - norm : 0.01;
        switch (e.key) {
          case "ArrowUp":
          case "ArrowRight":
            norm = Math.min(1, norm + (e.shiftKey ? stepNorm * 10 : stepNorm));
            break;
          case "ArrowDown":
          case "ArrowLeft":
            norm = Math.max(0, norm - (e.shiftKey ? stepNorm * 10 : stepNorm));
            break;
          case "Home":
            norm = 0;
            break;
          case "End":
            norm = 1;
            break;
          default:
            return;
        }
        newValue = normToFreq(norm);
      } else {
        const stepSize = e.shiftKey ? step * 10 : step;
        switch (e.key) {
          case "ArrowUp":
          case "ArrowRight":
            newValue = Math.min(max, value + stepSize);
            break;
          case "ArrowDown":
          case "ArrowLeft":
            newValue = Math.max(min, value - stepSize);
            break;
          case "Home":
            newValue = min;
            break;
          case "End":
            newValue = max;
            break;
          default:
            return;
        }
      }
      e.preventDefault();
      handleValueChange(newValue);
      if (navigator.vibrate) {
        navigator.vibrate(5);
      }
    },
    [disabled, handleValueChange, max, min, step, value, isFrequency]
  );

  // Handle drag interaction (log scale for frequency)
  const handlePointerDown = useCallback(
    (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
      if (disabled) return;
      e.preventDefault();
      setIsDragging(true);
      onValueChangeStart?.();
      const startY =
        "touches" in e
          ? (e as React.TouchEvent).touches[0].clientY
          : (e as React.MouseEvent).clientY;
      const startValue = value;
      const startNorm = isFrequency ? freqToNorm(startValue) : null;
      const move = (ev: MouseEvent | TouchEvent) => {
        const y =
          "touches" in ev
            ? (ev as TouchEvent).touches[0].clientY
            : (ev as MouseEvent).clientY;
        let delta = startY - y;
        let newValue;
        if (isFrequency) {
          // Move in normalized space, then map to freq
          let norm = (startNorm ?? 0) + delta / 150;
          norm = Math.max(0, Math.min(1, norm));
          newValue = normToFreq(norm);
        } else {
          newValue = startValue + (delta * (max - min)) / 100;
        }
        handleValueChange(newValue);
      };
      const up = () => {
        setIsDragging(false);
        onValueChangeEnd?.();
        window.removeEventListener("mousemove", move);
        window.removeEventListener("touchmove", move);
        window.removeEventListener("mouseup", up);
        window.removeEventListener("touchend", up);
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("touchmove", move);
      window.addEventListener("mouseup", up);
      window.addEventListener("touchend", up);
    },
    [
      disabled,
      handleValueChange,
      max,
      min,
      onValueChangeEnd,
      onValueChangeStart,
      value,
      isFrequency,
    ]
  );

  // Handle tooltip
  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 30,
      });
    }
  }, []);

  // Update lastValue when value prop changes
  useEffect(() => {
    setLastValue(value);
  }, [value]);

  const currentColor = disabled
    ? disabledColor
    : isFocused
    ? activeColor
    : arcColor;
  const currentLabelColor = disabled ? disabledColor : labelColor;
  const currentValueColor = disabled ? disabledColor : valueColor;

  // Format frequency value
  const formatFrequency = useCallback((freq: number) => {
    if (freq >= 1000) {
      return `${(freq / 1000).toFixed(1)}kHz`;
    }
    return `${Math.round(freq)}Hz`;
  }, []);

  // Format display value
  const formatDisplayValue = useCallback(
    (val: number) => {
      if (formatValue) {
        return formatValue(val);
      }
      if (isFrequency) {
        return formatFrequency(val);
      }
      return Number(val).toFixed(2);
    },
    [isFrequency, formatFrequency, formatValue]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        userSelect: "none",
        padding: 12,
        background: backgroundColor,
        borderRadius: 22,
        boxShadow: isFocused
          ? `0 6px 24px 0 #000b, 0 1.5px 0 ${currentColor} inset`
          : "0 6px 24px 0 #000b, 0 1.5px 0 #fff1 inset",
        minWidth: size + 20,
        maxWidth: size + 40,
        position: "relative",
        opacity: disabled ? 0.7 : 1,
        transition: "all 0.2s ease",
      }}
    >
      <svg
        ref={svgRef}
        width={size}
        height={size}
        style={{
          cursor: disabled ? "not-allowed" : "pointer",
          display: "block",
          transform: isDragging ? "scale(0.98)" : "scale(1)",
          transition: "transform 0.1s ease",
          filter: isFocused ? `drop-shadow(0 0 8px ${currentColor}88)` : "none",
        }}
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        onKeyDown={handleKeyDown}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={label}
        aria-disabled={disabled}
      >
        {/* Outer shadow */}
        <circle
          cx={center}
          cy={center}
          r={radius + 3.5}
          fill="#000"
          opacity={0.18}
        />
        {/* Knob face with radial gradient */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="url(#knobFace)"
          stroke={isFocused ? currentColor : "#18181c"}
          strokeWidth={strokeWidth + 2}
          filter="url(#innerShadow)"
        />
        {/* Glassy highlight */}
        <ellipse
          cx={center}
          cy={center - 14}
          rx={radius * 0.7}
          ry={radius * 0.19}
          fill="rgba(255,255,255,0.16)"
        />
        {/* Arc background */}
        <path
          d={`M ${angleToCoord(startAngle).x} ${
            angleToCoord(startAngle).y
          } A ${radius} ${radius} 0 1 1 ${angleToCoord(endAngle).x} ${
            angleToCoord(endAngle).y
          }`}
          stroke="#23232a"
          strokeWidth={strokeWidth}
          fill="none"
          opacity={0.85}
          strokeLinecap="round"
        />
        {/* Value arc from min to pointer */}
        {percent > 0 && (
          <path
            d={arcPath}
            stroke={currentColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            filter={
              isFocused ? `drop-shadow(0 0 8px ${currentColor}99)` : "none"
            }
          />
        )}
        {/* Pointer (sharp line) */}
        <line
          x1={pointerCoords.start.x}
          y1={pointerCoords.start.y}
          x2={pointerCoords.end.x}
          y2={pointerCoords.end.y}
          stroke={currentValueColor}
          strokeWidth={2.5}
          strokeLinecap="round"
          filter={isFocused ? "drop-shadow(0 0 3px #fff8)" : "none"}
        />
        {/* Center dot */}
        <circle
          cx={center}
          cy={center}
          r={2.5}
          fill={currentValueColor}
          opacity={0.18}
        />
        {/* SVG defs for gradients and inner shadow */}
        <defs>
          <radialGradient id="knobFace" cx="50%" cy="38%" r="70%">
            <stop offset="0%" stopColor="#44444c" />
            <stop offset="100%" stopColor="#23232a" />
          </radialGradient>
          <linearGradient id="arcGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={currentColor} />
            <stop offset="100%" stopColor={currentColor} />
          </linearGradient>
          <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feOffset dx="0" dy="2" />
            <feGaussianBlur stdDeviation="2.5" result="offset-blur" />
            <feComposite
              operator="out"
              in="SourceGraphic"
              in2="offset-blur"
              result="inverse"
            />
            <feFlood floodColor="#000" floodOpacity="0.18" result="color" />
            <feComposite
              operator="in"
              in="color"
              in2="inverse"
              result="shadow"
            />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>
        {/* Tooltip */}
        {showTooltip && !disabled && (
          <g
            transform={`translate(${tooltipPosition.x}, ${tooltipPosition.y})`}
          >
            <rect
              x="-30"
              y="-20"
              width="60"
              height="20"
              rx="4"
              fill="rgba(0,0,0,0.8)"
            />
            <text
              x="0"
              y="-5"
              textAnchor="middle"
              fill={currentValueColor}
              fontSize="12"
            >
              {formatDisplayValue(value)}
            </text>
          </g>
        )}
      </svg>
      <div
        style={{
          marginTop: 12,
          fontSize: 15,
          color: currentLabelColor,
          fontWeight: 800,
          letterSpacing: 1.2,
          textShadow: "0 1px 2px #000a",
          textTransform: "uppercase",
          transition: "color 0.2s ease",
        }}
      >
        {label}
      </div>
      {showValue && (
        <div
          style={{
            fontWeight: 800,
            color: currentValueColor,
            cursor: disabled ? "not-allowed" : "pointer",
            fontSize: 17,
            marginTop: 4,
            padding: "4px 14px",
            background: "rgba(255,255,255,0.13)",
            borderRadius: 7,
            letterSpacing: 0.7,
            boxShadow: "0 1px 2px #0003",
            textShadow: "0 1px 2px #000a",
            transition: "all 0.2s ease",
            opacity: disabled ? 0.7 : 1,
          }}
          onDoubleClick={disabled ? undefined : onDoubleClick}
        >
          {formatDisplayValue(value)}
        </div>
      )}
    </div>
  );
};

export default Knob;
