import React from "react";
import { Text, StyleSheet } from "react-native";

interface LabelCardProps {
  children: string;
  style?: any;
}

const LabelCard: React.FC<LabelCardProps> = ({ children, ...props }) => (
  <Text style={props.style ?? styles.label} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default LabelCard;
