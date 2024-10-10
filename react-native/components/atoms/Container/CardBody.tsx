// Container.tsx (Un atom qui encapsule le View)
import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import Native from "@/components/nanites/Native";

const CardBody: React.FC<ViewProps> = ({ children, style, ...props }) => (
  <Native.StyledContainer
    flexDirection={"row"}
    gap={"10"}
    // marginVertical={"5"}
    {...props}>
      {children}
  </Native.StyledContainer>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: '#ADD8E6',
    paddingRight: 15,
    gap: 10,
    paddingBottom: 10,
    // marginVertical: 10,
    // borderRadius: 10,
  },
});

export default CardBody;