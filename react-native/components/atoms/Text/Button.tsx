import React from "react";
import { StyleSheet } from "react-native";
import { styled } from "styled-components/native";

const StyledText = styled.Text`
  color: ${(props) => props.theme.colors.buttons.text};
`;

interface ButtonProps {
  children: string;
  style?: any;
}

const Button: React.FC<ButtonProps> = ({ children, style, ...props }) => (
  <StyledText style={[styles.text, style]} {...props}>
    {children}
  </StyledText>
);

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Button;
