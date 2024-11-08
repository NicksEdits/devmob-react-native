import React from "react";
import { Text, StyleSheet } from "react-native";

interface ErrorProps {
  children: string;
  style?: object;
}

const Error: React.FC<ErrorProps> = ({ children, style = {}, ...props }) => (
  <Text style={{ ...styles.error, ...style }} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});

export default Error;
