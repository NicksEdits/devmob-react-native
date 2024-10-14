import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ContainerFormProps {
  children: React.ReactNode;
  style?: any;
}

const ContainerForm: React.FC<ContainerFormProps> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContainerForm;