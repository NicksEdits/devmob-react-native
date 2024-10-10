// Container.tsx (Un atom qui encapsule le View)
import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import Native from "@/components/nanites/Native";

const CardHeader: React.FC<ViewProps> = ({ children, style, ...props }) => (
  <Native.StyledContainer  flexDirection={"column"}  {...props}>
    {children}
  </Native.StyledContainer>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    // alignItems: 'center',
    // backgroundColor: '#ADD8E6',
    // paddingRight: 15,
    // marginVertical: 10,
    // borderRadius: 10,
  },
});

export default CardHeader;