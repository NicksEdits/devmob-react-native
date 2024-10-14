import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface ButtonCardProps {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  buttonStyle?: any;
  textStyle?: any;
}

const ButtonCard: React.FC<ButtonCardProps> = ({ onPress, title, buttonStyle, textStyle }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
    <Text style={[styles.text, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    // backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',  // Couleur verte pour le bouton
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ButtonCard;