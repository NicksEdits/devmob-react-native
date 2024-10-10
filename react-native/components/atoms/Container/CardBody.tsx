// Container.tsx
import React from 'react';
import { ViewProps } from 'react-native';
import Native from "@/components/nanites/Native";

// Étendre les propriétés de ViewProps pour inclure justifyContent
interface CardBodyProps extends ViewProps {
  justifyContent?: string;
}

const CardBody: React.FC<CardBodyProps> = ({ children, style, justifyContent = "flex-start", ...props }) => (
  <Native.StyledContainer
    style={[{ width: "100%" }, style]} // Fusion des styles passés via props
    flexDirection={"row"}
    justifyContent={justifyContent}
    marginVertical={"10"}
    paddingRight={'10'}
    gap={10}
    {...props}
  >
    {children}
  </Native.StyledContainer>
);

export default CardBody;