import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563EB", // Modern Blue
      light: "#60A5FA",
      dark: "#1E40AF",
      contrastText: "#fff",
    },
    secondary: {
      main: "#7C3AED", // Modern Purple
      light: "#A78BFA",
      dark: "#5B21B6",
      contrastText: "#fff",
    },
    background: {
      default: "#F8FAFC", // Light Gray
      paper: "#FFFFFF",
    },
    success: {
      main: "#10B981", // Modern Green
      light: "#34D399",
      dark: "#059669",
    },
    warning: {
      main: "#F59E0B", // Modern Orange
      light: "#FBBF24",
      dark: "#D97706",
    },
    error: {
      main: "#EF4444", // Modern Red
      light: "#F87171",
      dark: "#DC2626",
    },
    info: {
      main: "#3B82F6", // Info Blue
      light: "#60A5FA",
      dark: "#2563EB",
    },
    text: {
      primary: "#1E293B",
      secondary: "#64748B",
    },
  },
  typography: {
    fontFamily: "Inter, Poppins, Roboto, Arial, sans-serif",
    h1: { 
      fontWeight: 800,
      color: "#1E293B",
    },
    h2: { 
      fontWeight: 700,
      color: "#1E293B",
    },
    h3: { 
      fontWeight: 700,
      color: "#1E293B",
    },
    h4: { 
      fontWeight: 600,
      color: "#1E293B",
    },
    h5: { 
      fontWeight: 600,
      color: "#1E293B",
    },
    h6: { 
      fontWeight: 600,
      color: "#1E293B",
    },
    button: { 
      textTransform: "none", 
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#FFFFFF",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          borderRadius: 16,
          border: "1px solid rgba(226, 232, 240, 0.8)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "#FFFFFF",
          border: "1px solid rgba(226, 232, 240, 0.8)",
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#FFFFFF",
          borderRight: "1px solid rgba(226, 232, 240, 0.8)",
          boxShadow: "4px 0 6px -1px rgb(0 0 0 / 0.1), 2px 0 4px -2px rgb(0 0 0 / 0.1)",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 4px rgb(0 0 0 / 0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          padding: "8px 16px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          },
        },
        contained: {
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2563EB",
            },
          },
        },
      },
    },
  },
});

export default theme;
