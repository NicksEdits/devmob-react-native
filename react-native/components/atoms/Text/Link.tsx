import React from "react";
import { Text, StyleSheet } from "react-native";

interface LinkProps {
  children: string;
  style?: any;
}

const Link: React.FC<LinkProps> = ({ children, style, ...props }) => (
  <Text style={[styles.description, style]} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  description: {
    color: "#000",
    textDecorationLine: "underline",
  },
});

export default Link;
