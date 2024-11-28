import useThemeColor from "@/hooks/useThemeColor";
import {
  setDefaultTheme,
  setNightTheme as setNightThemeRedux,
  toggleIsNight,
} from "@/store/theme";
import React, { createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components/native";

const NightThemeProviderContext = createContext({});

const CustomThemeProvider = ({ ...props }) => {
  const dispatch = useDispatch();

  const toggleNight = () => dispatch(toggleIsNight(null));
  const setDefault = () => dispatch(setDefaultTheme(null));
  const setNight = () => dispatch(setNightThemeRedux(null));

  const { isNight } = useSelector((state) => state.theme);

  const [theme, setTheme] = useThemeColor({
    texts: {
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
    buttons: {
      color: "#1cb98f",
      text: "#FFF",
    },
  });
  const [nightTheme, setNightTheme] = useThemeColor({
    texts: {
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
    buttons: {
      color: "#1cb98f",
      text: "#FFF",
    },
  });

  const themeHandler = {
    default: { switch: () => setDefault(), set: (p) => setTheme(p) },
    night: {
      switch: () => setNight(),
      toggle: () => toggleNight(),
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
