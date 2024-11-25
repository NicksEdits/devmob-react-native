// Container.tsx (Un atom qui encapsule le View)
import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { styled } from 'styled-components/native'
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
    backgroundColor: "#ADD8E6",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    minWidth: "100%",
  },
});



export default Card;
