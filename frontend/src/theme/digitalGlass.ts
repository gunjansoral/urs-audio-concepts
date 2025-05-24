import { createTheme } from "@mui/material/styles";

const digitalGlassTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2D7FF9", // Digital Blue
      contrastText: "#fff",
    },
    secondary: {
      main: "#7B61FF", // Digital Purple
      contrastText: "#ffffff",
    },
    background: {
      default: "#0A0D14", // Deep Dark
      paper: "#131722", // Slightly lighter dark
    },
    success: {
      main: "#00E5A3", // Digital Green
    },
    warning: {
      main: "#FFB547", // Digital Orange
    },
    error: {
      main: "#FF4B4B", // Digital Red
    },
    info: {
      main: "#2D7FF9", // Matching primary
    },
    text: {
      primary: "#E4E6F0",
      secondary: "#8B8FA3",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 700,
      letterSpacing: -0.5,
    },
    h2: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 700,
      letterSpacing: -0.25,
    },
    h3: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 700,
      letterSpacing: 0,
    },
    h4: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 700,
      letterSpacing: 0.25,
    },
    h5: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 700,
      letterSpacing: 0,
    },
    h6: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 700,
      letterSpacing: 0.15,
    },
    button: {
      fontFamily: "'Inter', sans-serif",
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: 0.5,
    },
    body1: { fontWeight: 500 },
    body2: { fontWeight: 500 },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500 },
    caption: { fontWeight: 500 },
    overline: { fontWeight: 500 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#0A0D14",
          color: "#E4E6F0",
          fontFamily: "'Inter', 'Roboto', sans-serif",
          fontWeight: 500,
          margin: 0,
          padding: 0,
        },
        a: {
          color: "#2D7FF9",
          textDecoration: "none",
          "&:hover": {
            color: "#7B61FF",
          },
        },
        input: {
          backgroundColor: "rgba(19, 23, 34, 0.7)",
          color: "#E4E6F0",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 8,
          padding: "8px 12px",
          "&:focus": {
            outline: "none",
            borderColor: "#2D7FF9",
          },
        },
        button: {
          backgroundColor: "#2D7FF9",
          color: "#ffffff",
          border: "none",
          borderRadius: 8,
          padding: "8px 16px",
          cursor: "pointer",
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "#7B61FF",
          },
        },
        "h1, h2, h3, h4, h5, h6": {
          color: "#E4E6F0",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(19, 23, 34, 0.7)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          borderRadius: 12,
          border: "none",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "rgba(19, 23, 34, 0.8)",
          border: "none",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "rgba(19, 23, 34, 0.95)",
          borderRight: "none",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          border: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          borderRadius: 8,
          fontWeight: 600,
          border: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
  },
});

export default digitalGlassTheme;
