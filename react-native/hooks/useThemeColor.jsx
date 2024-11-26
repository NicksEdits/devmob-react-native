/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

// import { useColorScheme } from "react-native";

// import { Colors } from "@/constants/Colors";

// export function useTheme(
//   props: { light?: string; dark?: string },
//   colorName: keyof typeof Colors.light & keyof typeof Colors.dark
// ) {
//   const theme = useColorScheme() ?? "light";
//   const colorFromProps = props[theme];

//   if (colorFromProps) {
//     return colorFromProps;
//   } else {
//     return Colors[theme][colorName];
//   }
// }

import { useState } from "react";
const useThemeColor = ({ colors, pages, containers }) => {
  const [colorsColors, setColorsColors] = useState(colors);
  const [pagesColors, setPagesColors] = useState(pages);
  const [containersColors, setContainersColors] = useState(containers);
  const setTheme = ({ colors, pages }) => {
    setColorsColors(colors);
    setPagesColors(pages);
    setContainersColors(containers);
  };
  return [
    {
      colors: {
        colors: colorsColors,
        pages: pagesColors,
        containers: containersColors,
      },
    },
    setTheme,
  ];
};
export default useThemeColor;
