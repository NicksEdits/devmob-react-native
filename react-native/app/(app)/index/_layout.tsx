import { NightThemeProviderContext } from "@/app/providers/CustomThemeProvider";
import { ThemeMolecule } from "@/components/molecules";
import { router, Stack } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-native";

const PostLayout = () => {
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
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="posts/[postId]"
        options={{
          headerShown: true,
          headerTitle: "Post",
          headerBackVisible: false,
          headerLeft: () => (
            <ThemeMolecule.BackButton onPress={() => router.push("/")} />
          ),
        }}
      />
    </Stack>
  );
};

export default PostLayout;
