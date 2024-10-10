import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface TitleCardProps {
  children: string;
}

const TitleCard: React.FC<TitleCardProps> = ({ children }) => (
  <Text style={styles.title}>{children}</Text>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TitleCard;