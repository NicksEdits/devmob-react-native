import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Dimensions,
  ScrollView,
} from "react-native";
import { styled } from "styled-components/native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Platform } from "react-native";

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
  const viewStyle = Platform.OS === "web" ? { height: viewHeight } : {};
  const insets = useSafeAreaInsets(); // Récupère les insets (top, bottom, left, right)

  return (
    <SafeAreaProvider>
      <StyledView
        style={{
          paddingTop: insets.top,
          ...viewStyle,
        }}
      >
        <ScrollView>
          <View
            style={{
              ...styles.container,
              ...style,
              minHeight: viewHeight,
            }}
          >
            {children}
          </View>
        </ScrollView>
        {floatingElement}
      </StyledView>
    </SafeAreaProvider>
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
