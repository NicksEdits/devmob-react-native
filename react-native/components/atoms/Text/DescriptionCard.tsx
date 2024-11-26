import React from "react";
import { StyleSheet } from "react-native";
import { styled } from "styled-components/native";

const StyledText = styled.Text`
  color: ${(props) => props.theme.colors.colors.card};
`;

interface DescriptionCardProps {
  children: string;
  style?: any;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({
  children,
  style,
  ...props
}) => (
  <StyledText style={[styles.description, style]} {...props}>
    {children}
  </StyledText>
);

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
  },
});

export default DescriptionCard;
