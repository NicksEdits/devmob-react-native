import React from "react";
import { StyleSheet, Text, ViewProps, View } from "react-native";

interface CardFooterProps extends ViewProps {
  justifyContent?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({
  children,
  style,
  justifyContent = "center",
  ...props
}) => {
  return (
    <View style={[styles.cardBody, , style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  cardBody: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 10,
  },
});

export default CardFooter;
