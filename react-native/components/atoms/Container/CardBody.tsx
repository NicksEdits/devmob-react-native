// Container.tsx
import React from "react";
import { Text, ViewProps } from 'react-native'
import Native from "@/components/nanites/Native";

// Étendre les propriétés de ViewProps pour inclure justifyContent
interface CardBodyProps extends ViewProps {
  justifyContent?: string;
}

const CardBody: React.FC<CardBodyProps> = ({
  children,
  style,
  justifyContent = "space-between",
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

export default CardBody;
