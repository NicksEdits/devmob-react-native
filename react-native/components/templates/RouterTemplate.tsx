import { NightThemeProviderContext } from "@/app/providers/CustomThemeProvider";
import { Stack } from "expo-router";
import React, { useContext, useEffect, useState } from "react";

const RouterTemplate: Reactx.FC = () => {
  const themeHandler = useContext(NightThemeProviderContext);

  const [theme, setTheme] = useState(themeHandler.night.getTheme());

  useEffect(() => {
    setTheme(themeHandler.night.getTheme());
  }, [themeHandler.night.isNight]);

  return (
    <Stack>
      <Stack.Screen
        name="(app)"
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.pages.primary,
          },
        }}
      />
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: true,
          contentStyle: {
            backgroundColor: theme.colors.pages.primary,
          },
          headerTitle: "Super Voisin",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.colors.containers.primary,
            borderBottomColor: theme.colors.containers.border,
          },
          headerTintColor: theme.colors.texts.primary,
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default RouterTemplate;
