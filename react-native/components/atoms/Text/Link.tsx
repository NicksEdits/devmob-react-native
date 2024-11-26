import React from "react";
import { StyleSheet } from "react-native";
import { styled } from "styled-components/native";

const StyledText = styled.Text`
  color: ${(props) => props.theme.colors.texts.primary};
`;
interface LinkProps {
  children: string;
  style?: any;
}

const Link: React.FC<LinkProps> = ({ children, style, ...props }) => (
  <StyledText style={[styles.description, style]} {...props}>
    {children}
  </StyledText>
);

const styles = StyleSheet.create({
  description: {
    textDecorationLine: "underline",
  },
});

export default Link;
