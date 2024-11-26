import React, { useContext } from "react";
import { Button, Text } from "@/components/atoms";
import { NightThemeProviderContext } from "@/app/providers/CustomThemeProvider";

interface NightThemeToggleProps {}

const NightThemeToggle: React.FC<NightThemeToggleProps> = () => {
  const themeHandler = useContext(NightThemeProviderContext);

  return (
    <Button.Global onPress={themeHandler.night.toggle}>
      {themeHandler.night.isNight ? "🌞" : "🌙"}
    </Button.Global>
  );
};

export default NightThemeToggle;
