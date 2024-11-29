import React from "react";
import { ActivityIndicator } from "react-native";

interface SpinnerProps {
  size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 50, ...props }) => (
  <ActivityIndicator size={size} {...props} />
);

export default Spinner;
