import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface InputProps {
  placeholder: string;
  value?: string;
  secureTextEntry?: boolean;
  onChangeText: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  onChangeText,
  value,
  placeholder,
  secureTextEntry = false,
  ...props
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    fontSize: 14,
  },
});

export default Input;
