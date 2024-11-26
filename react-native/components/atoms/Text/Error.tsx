import React from "react";
import { styled } from "styled-components/native";

const StyledText = styled.Text`
  color: ${(props) => props.theme.colors.colors.error};
`;

interface ErrorProps {
  children: string;
  style?: object;
}

const Error: React.FC<ErrorProps> = ({ children, style = {}, ...props }) => (
  <StyledText style={style} {...props}>
    {children}
  </StyledText>
);

export default Error;
