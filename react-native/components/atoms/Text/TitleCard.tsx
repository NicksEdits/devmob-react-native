import React from 'react';
import { Text, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

interface TitleCardProps {
  children: string;
  style?: TextStyle;
  containerStyle?: ViewStyle;
}

const TitleCard: React.FC<TitleCardProps> = ({ children, style, containerStyle }) => (
  <View style={[styles.container, containerStyle]}>
    <Text style={[styles.title, style]}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TitleCard;