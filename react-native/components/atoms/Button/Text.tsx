import React from "react";
import { Pressable, StyleSheet, GestureResponderEvent } from "react-native";
import { Text as TextAtom } from "@/components/atoms";

interface TextProps {
  onPress?: (event: GestureResponderEvent) => void;
  buttonStyle?: any;
  textStyle?: any;
  children?: React.ReactNode;
  text: string;
}

const Text: React.FC<TextProps> = ({
  onPress,
  buttonStyle,
  textStyle,
  text,
}) => (
  <Pressable onPress={onPress} style={[styles.button, buttonStyle]}>
    <TextAtom.Common style={[styles.text, textStyle]}>{text}</TextAtom.Common>
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
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Text;
