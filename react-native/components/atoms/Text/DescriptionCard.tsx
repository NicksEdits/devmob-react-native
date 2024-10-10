import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface DescriptionCardProps {
  children: string;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({ children }) => (
  <Text style={styles.description}>{children}</Text>
);

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    color: '#666',
  },
});

export default DescriptionCard;