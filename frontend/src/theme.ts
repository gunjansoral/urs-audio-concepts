import { createTheme } from "@mui/material/styles";

const theme = createTheme({
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
    fontFamily: "Montserrat, Poppins, Roboto, Arial, sans-serif",
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(35, 38, 58, 0.55)",
          boxShadow: "0 0 24px 0 #00BFFF44, 0 2px 8px 0 #0008",
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
          boxShadow: "0 0 12px 0 #A259FF55",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "0 0 8px 0 #00BFFF55",
          borderRadius: 8,
          fontWeight: 700,
        },
      },
    },
  },
});

export default theme;
