import React from "react";
import { View as ViewRN, StyleSheet, ViewStyle } from "react-native";

interface ViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const View: React.FC<ViewProps> = ({ children, style }) => {
  return <ViewRN style={style}>{children}</ViewRN>;
};

export default View;
