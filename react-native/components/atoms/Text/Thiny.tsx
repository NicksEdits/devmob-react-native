import React from "react";
import { StyleSheet } from "react-native";
import { styled } from "styled-components/native";

const StyledText = styled.Text`
  color: ${(props) => props.theme.colors.texts.primary};
`;

interface ThinyProps {
  children: string | string[];
  style?: any;
}

const Thiny: React.FC<ThinyProps> = ({ children, style, ...props }) => (
  <StyledText style={[styles.description, style]} {...props}>
    {children}
  </StyledText>
);

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
  },
});

export default Thiny;
