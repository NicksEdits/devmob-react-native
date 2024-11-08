import React from "react";
import { Text, StyleSheet } from "react-native";

interface CommonProps {
  children: string;
  style?: any;
}

const Common: React.FC<CommonProps> = ({ children, style, ...props }) => (
  <Text style={[styles.description, style]} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    color: "#000",
  },
});

export default Common;
