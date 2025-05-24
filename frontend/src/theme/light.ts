import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#213547",
      secondary: "#5a5a5a",
    },
  },
  typography: {
    fontFamily: "Montserrat, Poppins, Roboto, Arial, sans-serif",
  },
});

export default lightTheme;
