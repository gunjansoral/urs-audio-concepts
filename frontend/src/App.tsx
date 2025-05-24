import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AudioMotorPage from "./pages/AudioMotorPage";
import ControlRoom from "./pages/ControlRoom";
import { ThemeContextProvider, useThemeContext } from "./context/ThemeContext";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";

function AppContent() {
  const { muiTheme } = useThemeContext();
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <Header />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              mt: "64px",
              backgroundColor: (theme) => theme.palette.background.default,
            }}
          >
            <Routes>
              <Route path="/" element={<ControlRoom />} />
              <Route path="/audio-motor" element={<AudioMotorPage />} />
              <Route path="/users" element={<h1>Users Page</h1>} />
              <Route path="/settings" element={<h1>Settings Page</h1>} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  );
}

export default App;
