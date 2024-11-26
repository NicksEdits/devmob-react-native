import React from "react";
import { Text, StyleSheet, GestureResponderEvent } from "react-native";
import Global from "../../atoms/Button/Global";

interface ButtonCardProps {
  onPress?: (event: GestureResponderEvent) => void;
  title: string;
  buttonStyle?: any;
  textStyle?: any;
}

const ButtonCard: React.FC<ButtonCardProps> = ({
  onPress,
  title,
  buttonStyle,
  textStyle,
}) => (
  <Global onPress={onPress} buttonStyle={buttonStyle}>
    <Text style={[styles.text, textStyle]}>{title}</Text>
  </Global>
);

const styles = StyleSheet.create({
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ButtonCard;
