import { strMaxLenght } from "@/utils/formatting";
import React from "react";
import { StyleSheet } from "react-native";
import { styled } from "styled-components/native";

const StyledText = styled.Text`
  color: ${(props) => props.theme.colors.texts.primary};
`;

interface LabelCardProps {
  children: string;
  style?: any;
}

const LabelCard: React.FC<LabelCardProps> = ({ children, ...props }) => (
  <StyledText style={[styles.label, props.style]} {...props}>
    {strMaxLenght(children, 30)}
  </StyledText>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
});

export default LabelCard;
