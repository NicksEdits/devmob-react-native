// Container.tsx
import React from "react";
import { ViewProps } from "react-native";
import Native from "@/components/nanites/Native";

// Étendre les propriétés de ViewProps pour inclure justifyContent
interface CardBodyProps extends ViewProps {
  justifyContent?: string;
}

const CardBody: React.FC<CardBodyProps> = ({
  children,
  style,
  justifyContent = "flex-start",
  ...props
}) => (
  <Native.StyledContainer
    flexDirection={"row"}
    justifyContent={justifyContent}
    marginVertical={"10"}
    paddingRight={"10"}
    gap={10}
    {...props}
  >
    {children}
  </Native.StyledContainer>
);

export default CardBody;
