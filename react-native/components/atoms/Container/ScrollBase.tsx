import React from "react";
import { Animated } from "react-native";
import ScrollView = Animated.ScrollView;

interface BaseProps {
  children: React.ReactNode;
}

const Base: React.FC<BaseProps> = ({ children, ...props }) => {
  return <ScrollView {...props}>{children}</ScrollView>;
};

export default Base;
