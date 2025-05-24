interface IconProps {
  active?: boolean;
  color: string;
}

export const BypassIcon: React.FC<IconProps> = ({ active, color }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ filter: active ? `drop-shadow(0 0 8px ${color})` : "none" }}
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke={color}
      fill={active ? color : "none"}
      opacity={active ? 0.15 : 0.5}
    />
    <path d="M12 7v5" />
    <path d="M12 17h.01" />
  </svg>
);

export const DeleteIcon: React.FC<Omit<IconProps, "active">> = ({ color }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ filter: `drop-shadow(0 0 8px ${color})` }}
  >
    <rect x="5" y="7" width="14" height="12" rx="2" fill="none" />
    <path d="M10 11v4M14 11v4" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    <path d="M3 7h18" />
  </svg>
);
