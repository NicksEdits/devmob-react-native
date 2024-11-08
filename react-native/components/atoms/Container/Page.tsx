import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface PageProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Page: React.FC<PageProps> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Page;
