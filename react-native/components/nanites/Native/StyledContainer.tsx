import { styled } from "styled-components/native";
import { ViewProps } from "react-native";

interface StyledContainerProps extends ViewProps {
  flexDirection?: string;
  paddingRight?: string;
  gap?: number | string;
  paddingBottom?: string;
  marginVertical?: string;
  borderRadius?: string;
  alignItems?: string;
  justifyContent?: string;
  width?: string;
  // height?: string;
}

const StyledContainer = styled.View<StyledContainerProps>`
  flex-direction: ${(props) => props.flexDirection || "column"};
  padding-right: ${(props) => props.paddingRight || "0"};
    ${(props) => props.width ? "width:" + props.width +";":  ""}
 
  gap: ${(props) => props.gap || "0"};
  padding-bottom: ${(props) => props.paddingBottom || "0"};
  margin-bottom: ${(props) => props.marginVertical || "0"};
  margin-top: ${(props) => props.marginVertical || "0"};
  border-radius: ${(props) => props.borderRadius || "0"};
    align-items: ${(props) => props.alignItems || "center"};
    ${(props) => props.justifyContent ? "justify-content:" + props.justifyContent +";":  ""}
    ${(props) => props.alignItems ? " align-items:" + props.alignItems +";":  ""}
`;



export default StyledContainer;
