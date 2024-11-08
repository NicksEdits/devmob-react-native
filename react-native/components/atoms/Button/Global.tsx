import React from "react";
import { Pressable, StyleSheet, GestureResponderEvent } from "react-native";

interface GlobalProps {
  onPress?: (event: GestureResponderEvent) => void;
  buttonStyle?: any;
  children?: React.ReactNode;
}

const Global: React.FC<GlobalProps> = ({ onPress, buttonStyle, children }) => (
  <Pressable onPress={onPress} style={[styles.button, buttonStyle]}>
    {children}
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    // backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    backgroundColor: "#4CAF50", // Couleur verte pour le bouton
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
  },
});

export default Global;
