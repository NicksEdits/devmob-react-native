import React from "react";
import { View, StyleSheet, ViewStyle, Dimensions } from "react-native";
import { ScrollBase } from ".";

interface PageProps {
  children: React.ReactNode;
  style?: ViewStyle;
  floatingElement?: React.ReactElement;
}

const Page: React.FC<PageProps> = ({ children, style, floatingElement }) => {
  const screenHeight = Dimensions.get("window").height;
  return (
    <View
      style={{
        height: screenHeight - 64 - 48,
      }}
    >
      <ScrollBase>
        <View
          style={{
            ...styles.container,
            ...style,
            minHeight: screenHeight - 64 - 48,
          }}
        >
          {children}
        </View>
      </ScrollBase>
      {floatingElement}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});

export default Page;