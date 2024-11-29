import { NightThemeProviderContext } from "@/app/providers/CustomThemeProvider";
import { Stack } from "expo-router";
import React, { useContext, useEffect, useState } from "react";

const RouterTemplate: React.FC = () => {
  const themeHandler = useContext(NightThemeProviderContext);

  const [theme, setTheme] = useState(themeHandler.night.getTheme());

  useEffect(() => {
    setTheme(themeHandler.night.getTheme());
  }, [themeHandler.night.isNight]);

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.colors.pages.primary,
        },
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: theme.colors.containers.primary,
          borderBottomColor: theme.colors.containers.border,
        },
        headerTintColor: theme.colors.texts.primary,
      }}
    >
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
          headerTitle: "Super Voisin",
        }}
      />
      <Stack.Screen
        name="+not-found"
        options={{
          headerShown: true,
          headerTitle: "Page Not Found",
        }}
      />
    </Stack>
  );
};

export default RouterTemplate;
