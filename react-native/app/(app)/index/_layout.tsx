import { NightThemeProviderContext } from "@/app/providers/CustomThemeProvider";
import { Stack } from "expo-router";
import React, { useContext, useEffect, useState } from "react";

const PostLayout = () => {
  const themeHandler = useContext(NightThemeProviderContext);

  const [theme, setTheme] = useState(themeHandler.night.getTheme());

  useEffect(() => {
    setTheme(themeHandler.night.getTheme());
  }, [themeHandler.night.isNight]);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,

          contentStyle: {
            backgroundColor: theme.colors.pages.primary,
          },
        }}
      />
      <Stack.Screen
        name="post/[postId]"
        options={{
          headerShown: true,
          headerTitle: "Post",
          contentStyle: {
            backgroundColor: theme.colors.pages.primary,
          },
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.containers.primary,
            borderBottomColor: theme.colors.containers.border,
          },
          headerTintColor: theme.colors.texts.primary,
        }}
      />
    </Stack>
  );
};

export default PostLayout;