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
const useThemeColor = ({ texts, pages, containers }) => {
  const [textsColors, setTextColors] = useState(texts);
  const [pagesColors, setPagesColors] = useState(pages);
  const [containersColors, setContainersColors] = useState(containers);
  const setTheme = ({ texts, pages }) => {
    setTextColors(texts);
    setPagesColors(pages);
    setContainersColors(containers);
  };
  return [
    {
      colors: {
        texts: textsColors,
        pages: pagesColors,
        containers: containersColors,
      },
    },
    setTheme,
  ];
};
export default useThemeColor;
