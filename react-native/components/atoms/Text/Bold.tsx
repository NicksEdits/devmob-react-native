import React from "react";
import { StyleSheet } from "react-native";
import { styled } from "styled-components/native";

const StyledText = styled.Text`
  color: ${(props) => props.theme.colors.texts.primary};
`;

interface BoldProps {
  children: string;
  style?: any;
}

const Bold: React.FC<BoldProps> = ({ children, style, ...props }) => (
  <StyledText style={[styles.description, style]} {...props}>
    {children}
  </StyledText>
);

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Bold;
