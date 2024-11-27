import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { styled } from "styled-components/native";

const StyledTextInput = styled.TextInput`
  ${(props) => `color: ${props.theme.colors.texts.primary};`}
`;

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
    <StyledTextInput
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
    fontSize: 14,
  },
});

export default Input;
