import React, { useContext, useEffect, useState } from "react";
import { Icon } from "@/components/atoms";
import { NightThemeProviderContext } from "@/app/providers/CustomThemeProvider";
import { Pressable } from "react-native";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

interface NightThemeToggleProps {
  style?: any;
}

const NightThemeToggle: React.FC<NightThemeToggleProps> = ({ style = {} }) => {
  const themeHandler = useContext(NightThemeProviderContext);

  const [theme, setTheme] = useState(themeHandler.night.getTheme());

  useEffect(() => {
    setTheme(themeHandler.night.getTheme());
  }, [themeHandler.night.isNight]);

  return (
    <Pressable onPress={themeHandler.night.toggle} style={style}>
      <Icon.FontAwesome
        icon={themeHandler.night.isNight ? faSun : faMoon}
        color={theme.colors.texts.primary}
        size={25}
      />
    </Pressable>
  );
};

export default NightThemeToggle;
