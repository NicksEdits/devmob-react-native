import React from "react";
import { Pressable, StyleSheet, GestureResponderEvent } from "react-native";
import { styled } from "styled-components/native";

interface GlobalProps {
  onPress?: (event: GestureResponderEvent) => void;
  buttonStyle?: any;
  children?: React.ReactNode;
}

const StyledPressable = styled.Pressable`
  background-color: ${(props) => props.theme.colors.buttons.color};
`;

const Global: React.FC<GlobalProps> = ({ onPress, buttonStyle, children }) => (
  <StyledPressable onPress={onPress} style={[styles.button, buttonStyle]}>
    {children}
  </StyledPressable>
);

const styles = StyleSheet.create({
  button: {
    // backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
  },
});

export default Global;
