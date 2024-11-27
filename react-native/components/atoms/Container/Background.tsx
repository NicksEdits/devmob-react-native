import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import styled from "styled-components/native";

const StyledView = styled.View`
  background-color: ${(props) => props.theme.colors.containers.primary};
`;

interface BackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Background: React.FC<BackgroundProps> = ({ children, style }) => {
  return <StyledView style={[styles.container, style]}>{children}</StyledView>;
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Background;
