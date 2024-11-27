// Container.tsx
import React from "react";
import { Text, ViewProps } from 'react-native'
import Native from "@/components/nanites/Native";

interface CardFooterProps extends ViewProps {
  justifyContent?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({
  children,
  style,
  justifyContent = "center",
  ...props
}) => {

  return (


  <Native.StyledContainer
    flexDirection={"row"}
    justifyContent={justifyContent}

    {...props}
  >
    {children}
  </Native.StyledContainer>
)};

export default CardFooter;
