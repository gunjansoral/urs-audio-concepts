import React, { createContext, useContext, useState } from "react";
import digitalGlassTheme from "../theme/digitalGlass";
import darkTheme from "../theme/dark";
import lightTheme from "../theme/light";

const themes = {
  digitalGlass: digitalGlassTheme,
  dark: darkTheme,
  light: lightTheme,
};

const ThemeContext = createContext({
  themeName: "digitalGlass",
  setThemeName: (name: string) => {},
  availableThemes: Object.keys(themes),
  muiTheme: digitalGlassTheme,
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [themeName, setThemeName] = useState("digitalGlass");
  const muiTheme = themes[themeName] || digitalGlassTheme;
  return (
    <ThemeContext.Provider
      value={{
        themeName,
        setThemeName,
        availableThemes: Object.keys(themes),
        muiTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
