import React from "react";
import { Animated } from "react-native";
import ScrollView = Animated.ScrollView;

interface ScrollBaseProps {
  children: React.ReactNode;
}

const ScrollBase: React.FC<ScrollBaseProps> = ({ children, ...props }) => {
  return <ScrollView {...props}>{children}</ScrollView>;
};

export default ScrollBase;
