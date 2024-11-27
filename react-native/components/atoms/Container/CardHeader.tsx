import React from "react";
import { StyleSheet, Text, ViewProps, View } from "react-native";

interface CardHeaderProps extends ViewProps {
  justifyContent?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  style,
  justifyContent = "space-between",
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
  },
});

export default CardHeader;
