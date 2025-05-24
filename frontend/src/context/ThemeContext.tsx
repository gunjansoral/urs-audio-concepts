import React, { createContext, useContext, useState } from "react";
import digitalGlassTheme from "../theme/digitalGlass";
import darkTheme from "../theme/dark";
import lightTheme from "../theme/light";

type ThemeName = 'digitalGlass' | 'dark' | 'light';

const themes = {
  digitalGlass: digitalGlassTheme,
  dark: darkTheme,
  light: lightTheme,
} as const;

const ThemeContext = createContext({
  themeName: "digitalGlass" as ThemeName,
  setThemeName: (_name: ThemeName | ((prev: ThemeName) => ThemeName)) => {},
  availableThemes: Object.keys(themes) as ThemeName[],
  muiTheme: digitalGlassTheme,
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [themeName, setThemeName] = useState<ThemeName>("digitalGlass");
  const muiTheme = themes[themeName];
  return (
    <ThemeContext.Provider
      value={{
        themeName,
        setThemeName,
        availableThemes: Object.keys(themes) as ThemeName[],
        muiTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
