import { createTheme } from "@mui/material/styles";

const digitalGlassTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00BFFF", // Electric Blue
      contrastText: "#fff",
    },
    secondary: {
      main: "#A259FF", // Neon Purple
      contrastText: "#fff",
    },
    background: {
      default: "#181A20", // Digital dark
      paper: "#23263A",
    },
    success: {
      main: "#00FFC6", // Neon Aqua
    },
    warning: {
      main: "#FFD600", // Neon Yellow
    },
    error: {
      main: "#FF4C60", // Neon Red
    },
    info: {
      main: "#00FFC6", // Aqua
    },
    text: {
      primary: "#fff",
      secondary: "#B0B3C6",
    },
  },
  typography: {
    fontFamily: "'Montserrat', 'Poppins', 'Roboto', Arial, sans-serif",
    fontWeightRegular: 700,
    fontWeightMedium: 700,
    fontWeightBold: 800,
    h1: {
      fontFamily: "'Orbitron', 'Share Tech Mono', 'Montserrat', sans-serif",
      fontWeight: 800,
      letterSpacing: 2,
    },
    h2: {
      fontFamily: "'Orbitron', 'Share Tech Mono', 'Montserrat', sans-serif",
      fontWeight: 800,
      letterSpacing: 2,
    },
    h3: {
      fontFamily: "'Orbitron', 'Share Tech Mono', 'Montserrat', sans-serif",
      fontWeight: 800,
      letterSpacing: 1.5,
    },
    h4: {
      fontFamily: "'Orbitron', 'Share Tech Mono', 'Montserrat', sans-serif",
      fontWeight: 800,
      letterSpacing: 1.5,
    },
    h5: {
      fontFamily: "'Orbitron', 'Share Tech Mono', 'Montserrat', sans-serif",
      fontWeight: 800,
      letterSpacing: 1,
    },
    h6: {
      fontFamily: "'Orbitron', 'Share Tech Mono', 'Montserrat', sans-serif",
      fontWeight: 800,
      letterSpacing: 1,
    },
    button: {
      fontFamily: "'Orbitron', 'Share Tech Mono', 'Montserrat', sans-serif",
      textTransform: "none",
      fontWeight: 800,
      letterSpacing: 1,
    },
    body1: { fontWeight: 700 },
    body2: { fontWeight: 700 },
    subtitle1: { fontWeight: 700 },
    subtitle2: { fontWeight: 700 },
    caption: { fontWeight: 700 },
    overline: { fontWeight: 700 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(35, 38, 58, 0.55)",
          boxShadow: "0 0 10px 0 #00BFFF33, 0 2px 8px 0 #0008", // subtle glow
          borderRadius: 20,
          border: "1.5px solid rgba(0,191,255,0.18)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "rgba(35, 38, 58, 0.45)",
          border: "1.5px solid rgba(162,89,255,0.13)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "rgba(24,26,32,0.7)",
          borderRight: "1.5px solid rgba(0,191,255,0.13)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: "0 0 6px 0 #A259FF44", // subtle
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "0 0 4px 0 #00BFFF44",
          borderRadius: 8,
          fontWeight: 800,
        },
      },
    },
  },
});

export default digitalGlassTheme;
