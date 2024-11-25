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
    backgroundColor: "#ADD8E6",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: "100%",
  },
});

export default Card;
