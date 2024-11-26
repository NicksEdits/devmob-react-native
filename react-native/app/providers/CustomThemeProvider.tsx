import useThemeColor from "@/hooks/useThemeColor";
import React, { createContext, useState } from "react";
import { ThemeProvider } from "styled-components/native";

const NightThemeProviderContext = createContext({});

const CustomThemeProvider = ({ ...props }) => {
  const [isNight, setIsNight] = useState(true);
  const [theme, setTheme] = useThemeColor({
    colors: {
      primary: "black",
      secondary: "#666",
      card: "#333",
      error: "red",
    },
    pages: {
      primary: "rgb(242, 242, 242)",
    },
    containers: {
      primary: "rgb(242, 242, 242)",
      secondary: "rgb(255, 255, 255)",
      border: "rgb(200, 200, 200)",
    },
  });
  const [nightTheme, setNightTheme] = useThemeColor({
    colors: {
      primary: "white",
      secondary: "#CCC",
      card: "#333",
      error: "red",
    },
    pages: {
      primary: "#212121",
    },
    containers: {
      primary: "#212121",
      secondary: "#000",
      border: "#000",
    },
  });

  const themeHandler = {
    default: { switch: () => setIsNight(false), set: (p) => setTheme(p) },
    night: {
      switch: () => setIsNight(true),
      toggle: () => setIsNight(!isNight),
      isNight: isNight,
      set: (p) => setNightTheme(p),
      getTheme: () => (isNight ? nightTheme : theme),
    },
  };

  return (
    <ThemeProvider theme={isNight ? nightTheme : theme}>
      <NightThemeProviderContext.Provider
        value={themeHandler}
        {...props}
      ></NightThemeProviderContext.Provider>
    </ThemeProvider>
  );
};

export { NightThemeProviderContext, CustomThemeProvider };
