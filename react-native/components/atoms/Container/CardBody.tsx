import React from "react";
import { StyleSheet, Text, ViewProps, View } from "react-native";

interface CardBodyProps extends ViewProps {
  justifyContent?: string;
}

const CardBody: React.FC<CardBodyProps> = ({
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CardBody;
