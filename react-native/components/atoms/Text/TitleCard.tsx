import React from "react";
import { StyleSheet, TextStyle } from "react-native";
import { styled } from "styled-components/native";

const StyledText = styled.Text`
  color: ${(props) => props.theme.colors.texts.primary};
`;

interface TitleCardProps {
  children: string | string[];
  style?: TextStyle;
}

const TitleCard: React.FC<TitleCardProps> = ({ children, style }) => (
  <StyledText style={[styles.title, style]}>{children}</StyledText>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});

export default TitleCard;
