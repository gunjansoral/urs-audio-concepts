declare module "react-knob" {
  import { Component } from "react";

  interface KnobProps {
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
    width?: number;
    height?: number;
    thickness?: number;
    lineCap?: "butt" | "round";
    bgColor?: string;
    fgColor?: string;
    inputColor?: string;
    font?: string;
    cursor?: number;
    stopper?: boolean;
    angleArc?: number;
    angleOffset?: number;
    disableTextInput?: boolean;
    displayInput?: boolean;
    displayCustom?: () => React.ReactNode;
  }

  const Knob: React.FC<KnobProps>;
  export default Knob;
}
