import React from "react";
import { View as ViewRN, StyleSheet, ViewStyle } from "react-native";

interface RowProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Row: React.FC<RowProps> = ({ children, style }) => {
  return <ViewRN style={[styles.row, style]}>{children}</ViewRN>;
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
});

export default Row;
