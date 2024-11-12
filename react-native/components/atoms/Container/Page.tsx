import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import ScrollBase from "@/components/atoms/Container/ScrollBase";

interface PageProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Page: React.FC<PageProps> = ({ children, style }) => {
  return (
    <ScrollBase>
      <View style={[styles.container, style]}>{children}</View>
    </ScrollBase>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Page;
