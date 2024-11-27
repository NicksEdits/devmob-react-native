import React from "react";
import { TextInput, StyleSheet } from "react-native";
import styled from "styled-components/native";

const StyledTextInput = styled.TextInput`
  ${(props) => `color: ${props.theme.colors.texts.primary};`}
`;

interface NumericInputProps {
  placeholder: string;
  value?: string;
  secureTextEntry?: boolean;
  onChangeText: (value: string) => void;
}

const NumericInput: React.FC<NumericInputProps> = ({
  onChangeText,
  value,
  placeholder,
  secureTextEntry = false,
  ...props
}) => {
  return (
    <StyledTextInput
      style={styles.input}
      placeholder={value ?? placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      keyboardType="numeric"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
  },
});

export default NumericInput;
