export type BandType =
  | "bell"
  | "high-shelf"
  | "low-shelf"
  | "high-cut"
  | "low-cut";

export interface Band {
  id: string;
  frequency: number;
  gain: number;
  q: number;
  type: BandType;
  bypass?: boolean;
  color?: string;
  solo: boolean;
  slope?: string;
}

export interface EQProps {
  audio: string;
  onEqChange?: (values: Band[]) => void;
}

export interface KnobProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  onDoubleClick?: () => void;
  label?: string;
}

export interface ProKnobProps extends KnobProps {
  arcColor?: string;
  arcRange?: [number, number];
}
