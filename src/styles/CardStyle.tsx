import styled, { Keyframes, css } from 'styled-components';
import FlexStyle from './FlexStyle';
const CardStyle = styled(FlexStyle)<{
  mainAnimation?: Keyframes;
  hoverAnimation?: Keyframes;
  fontSize?: string;
  imgBg?: string;
  imgShadow?: boolean;
  center?: boolean;
}>`
  background: ${({ theme }) => theme.colors.card};
  padding: ${({ flexPadding }) =>
    flexPadding !== undefined ? flexPadding : '5%'};
  margin: ${({ center }) => (center ? '0 auto' : '0.25rem')};
  border: 2px solid #cc8ea259;
  border-radius: 3px;
  box-shadow: ${({ theme }) => `0 4px 8px 0 ${theme.colors.mainShadow}`};

  & img {
    background: ${({ imgBg }) =>
      imgBg !== undefined ? `${imgBg}` : '#cc8ea259'};

    box-shadow: ${({ imgShadow, theme }) =>
      imgShadow ? `0 4px 8px 0 ${theme.colors.mainShadow}` : ''};
    border-radius: 50%;
    animation: ${({ mainAnimation }) =>
      mainAnimation !== undefined
        ? css`
            ${mainAnimation} 2s linear infinite
          `
        : 'none'};

    transition: all 0.5s linear;
  }
  &:hover img {
    animation: ${({ hoverAnimation }) =>
      hoverAnimation !== undefined
        ? css`
            ${hoverAnimation} 0.5s linear infinite
          `
        : 'none'};
  }
`;
export const PreviewCardStyle=styled(CardStyle)`

border-radius: 50% 5% 50% 50%;
`
export default CardStyle;
