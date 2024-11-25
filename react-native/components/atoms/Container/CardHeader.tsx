// Container.tsx (Un atom qui encapsule le View)
import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import Native from "@/components/nanites/Native";

const CardHeader: React.FC<ViewProps> = ({ children, style, ...props }) => (
  <Native.StyledContainer
    alignItems={style?.alignItems || "flex-start"}
    justifyContent={''}
    flexDirection={style?.flexDirection || "row"}
    {...props}>

    {children}
  </Native.StyledContainer>
);

export default CardHeader;