import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface InputProps {
  placeholder: string;
  secureTextEntry?: boolean;
}

const Input: React.FC<InputProps> = ({ placeholder, secureTextEntry = false }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    fontSize: 14,
  },
});

export default Input;