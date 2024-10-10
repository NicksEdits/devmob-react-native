import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface LabelCardProps {
  children: string;
}

const LabelCard: React.FC<LabelCardProps> = ({ children }) => (
  <Text style={styles.label}>{children}</Text>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LabelCard;