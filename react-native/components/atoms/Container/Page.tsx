import React from "react";
import { View, StyleSheet, ViewStyle, Dimensions } from "react-native";
import { ScrollBase } from ".";
import { styled } from "styled-components/native";
const StyledView = styled.View`
  background-color: ${(props) => props.theme.colors.pages.primary};
`;

interface PageProps {
  children: React.ReactNode;
  style?: ViewStyle;
  floatingElement?: React.ReactElement;
}



const Page: React.FC<PageProps> = ({ children, style, floatingElement }) => {
  const screenHeight = Dimensions.get("window").height;
  const viewHeight = screenHeight - 48;
  return (
    <StyledView
      style={{
      //  height: viewHeight,
      }}
    >
      <ScrollBase>
        <View
          style={{
            ...styles.container,
            ...style,
            minHeight: viewHeight,
          }}
        >
          {children}
        </View>
      </ScrollBase>
      {floatingElement}
    </StyledView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    position: "relative",
  },
});

export default Page;
