import React, { useContext, useEffect, useState } from "react";
import { Icon } from "@/components/atoms";
import { NightThemeProviderContext } from "@/app/providers/CustomThemeProvider";
import { Pressable } from "react-native";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface BackButtonProps {
  onPress: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  const themeHandler = useContext(NightThemeProviderContext);

  const [theme, setTheme] = useState(themeHandler.night.getTheme());

  useEffect(() => {
    setTheme(themeHandler.night.getTheme());
  }, [themeHandler.night.isNight]);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Icon.FontAwesome
        icon={faArrowLeft}
        color={theme.colors.texts.primary}
        size={25}
      />
    </Pressable>
  );
};

const styles = {
  container: {
    padding: 10,
  },
};

export default BackButton;
