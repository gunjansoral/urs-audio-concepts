import React from "react";

interface HeaderProps {
  isGlobalBypass: boolean;
  onGlobalBypass: () => void;
  onReset: () => void;
  gainRange: number;
  onGainRangeChange: (range: number) => void;
}

const Header: React.FC<HeaderProps> = ({
  isGlobalBypass,
  onGlobalBypass,
  onReset,
  gainRange,
  onGainRangeChange,
}) => {
  return (
    <div
      className="eq-header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 600 }}>
        Parametric EQ
      </h2>
      <div
        className="eq-controls"
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <select
          value={gainRange}
          onChange={(e) => onGainRangeChange(Number(e.target.value))}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            background: "rgba(35,35,45,0.8)",
            color: "#fff",
            cursor: "pointer",
            transition: "all 0.2s ease",
            backdropFilter: "blur(8px)",
            fontSize: "14px",
          }}
        >
          <option value={6}>±6 dB</option>
          <option value={12}>±12 dB</option>
          <option value={24}>±24 dB</option>
          <option value={48}>±48 dB</option>
        </select>
        <button
          className={`global-bypass ${isGlobalBypass ? "active" : ""}`}
          onClick={onGlobalBypass}
          title="Global Bypass (G)"
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
          {isGlobalBypass ? "Bypassed" : "Active"}
        </button>
        <button
          className="reset-eq"
          onClick={onReset}
          title="Reset EQ (R)"
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
          Reset
        </button>
      </div>
    </div>
  );
};

export default Header;
