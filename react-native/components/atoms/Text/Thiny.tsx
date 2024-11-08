import React from "react";
import { Text, StyleSheet } from "react-native";

interface ThinyProps {
  children: string;
  style?: any;
}

const Thiny: React.FC<ThinyProps> = ({ children, style, ...props }) => (
  <Text style={[styles.description, style]} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    color: "#000",
  },
});

export default Thiny;
