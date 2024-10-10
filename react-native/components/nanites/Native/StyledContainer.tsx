import { styled } from 'styled-components/native';
import { ViewProps } from 'react-native';

interface StyledContainerProps extends ViewProps {
  flexDirection?: string;
  paddingRight?: string;
  gap?: string;
  paddingBottom?: string;
  marginVertical?: string;
  borderRadius?: string;
  alignItems?: string;
  width?: string;
}

const StyledContainer = styled.View<StyledContainerProps>`
    flex-direction: ${(props) => props.flexDirection || 'row'};
    padding-right: ${(props) => props.paddingRight || '0'};
    gap: ${(props) => props.gap || '0'};
    padding-bottom: ${(props) => props.paddingBottom || '0'};
    margin-bottom: ${(props) => props.marginVertical || '0'};
    margin-top: ${(props) => props.marginVertical || '0'};
    border-radius: ${(props) => props.borderRadius || '0'};
    align-items: ${(props) => props.alignItems || 'start'};
    width: ${(props) => props.width || '100%'};
    justify-content: "center";
`;

export default StyledContainer;