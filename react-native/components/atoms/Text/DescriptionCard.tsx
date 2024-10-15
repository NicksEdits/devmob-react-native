import React from "react";
import { Text, StyleSheet } from "react-native";

interface DescriptionCardProps {
  children: string;
  style?: any;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({
  children,
  style,
  ...props
}) => (
  <Text style={[styles.description, style]} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    color: "#666",
  },
});

export default DescriptionCard;
