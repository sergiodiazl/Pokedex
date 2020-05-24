import React from 'react';
import FlexStyle from '../../styles/FlexStyle';
import { NavigationButtonStyle } from '../../styles/ButtonStyle';
import LinkStyle from '../../styles/LinkStyle';
import SearchButton from '../buttons/SearchButton';
interface Props {
  place: string;
  current: number;
  maxPlace: number;
}

const Navigation:React.FC<Props> = (props) => {
  const { current, maxPlace, place } = props;
  const createUrl = (destination: number) => {
    const newUrl = `${place}${destination}`;

    return newUrl;
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.blur();
  };
  return (
    <FlexStyle flexPadding="1%" flexWidth="100%">
      <FlexStyle flexWidth="25%" wrapReverse justifyContent="flex-end">
        {current !== 1 ? (
          <>
            <LinkStyle to={createUrl(1)}>
              <NavigationButtonStyle
                onClick={handleClick}
              >{`<<`}</NavigationButtonStyle>
            </LinkStyle>

            <LinkStyle to={createUrl(current - 1)}>
              <NavigationButtonStyle
                onClick={handleClick}
              >{`< `}</NavigationButtonStyle>
            </LinkStyle>
          </>
        ) : (
          <>
            <NavigationButtonStyle disabled>{`<<`}</NavigationButtonStyle>

            <NavigationButtonStyle disabled>{`< `}</NavigationButtonStyle>
          </>
        )}
      </FlexStyle>
      <FlexStyle flexWidth="50%">
        <SearchButton />
      </FlexStyle>
      <FlexStyle flexWidth="25%" justifyContent="flex-start">
        {current !== maxPlace ? (
          <>
            <LinkStyle to={createUrl(current + 1)}>
              <NavigationButtonStyle
                onClick={handleClick}
              >{` >`}</NavigationButtonStyle>
            </LinkStyle>

            <LinkStyle to={createUrl(maxPlace)}>
              <NavigationButtonStyle
                onClick={handleClick}
              >{`>>`}</NavigationButtonStyle>
            </LinkStyle>
          </>
        ) : (
          <>
            <NavigationButtonStyle disabled>{` >`}</NavigationButtonStyle>

            <NavigationButtonStyle disabled>{`>>`}</NavigationButtonStyle>
          </>
        )}
      </FlexStyle>
    </FlexStyle>
  );
};

export default Navigation;
