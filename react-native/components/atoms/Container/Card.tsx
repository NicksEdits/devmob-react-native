// Container.tsx (Un atom qui encapsule le View)
import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
const Card: React.FC<ViewProps> = ({ children, style, ...props }) => (
  <View style={[styles.container, style]} {...props}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: "#80dbe5", // Couleur verte pour l e bouton
    padding: 10,
    gap: 10,
    borderRadius: 10,
    width: "100%",
  },
});

export default Card;
