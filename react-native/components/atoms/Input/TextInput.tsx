import React from "react";
import { StyleSheet } from "react-native";
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
      value={value}
      {...props}
      placeholderTextColor={"#A0A0A0"}
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
