import React from 'react';
import FlexStyle from '../../styles/FlexStyle';
import { NavigationButtonStyle } from '../../styles/ButtonStyle';
import LinkStyle from '../../styles/LinkStyle';
import RandomPokemonButton from '../buttons/RandomPokemonButton';
import SearchButton from '../buttons/SearchButton';
interface Props {
  place: string;
  current: number;
  maxPlace: number;
}

const Navigation = (props: Props) => {
  const { current, maxPlace, place } = props;
  const createUrl = (destination: number) => {
    console.log('current', current, 'destino', destination);
    const newUrl = `${place}${destination}`;

    return newUrl;
  };

  return (
    <FlexStyle flexPadding="1%" flexWidth="100%">
      <FlexStyle flexWidth="25%" wrapReverse justifyContent='flex-end' >
        {current !== 1 ? (
          <>
            <LinkStyle to={createUrl(1)}>
              <NavigationButtonStyle>{`<<`}</NavigationButtonStyle>
            </LinkStyle>

            <LinkStyle to={createUrl(current - 1)}>
              <NavigationButtonStyle>{`< `}</NavigationButtonStyle>
            </LinkStyle>
          </>
        ) : (
          <>
            <NavigationButtonStyle disabled>{`<<`}</NavigationButtonStyle>

            <NavigationButtonStyle disabled>{`< `}</NavigationButtonStyle>
          </>
        )}
      </FlexStyle>
      <FlexStyle flexWidth='50%'>
        <SearchButton />
      </FlexStyle>
      <FlexStyle flexWidth="25%" justifyContent='flex-start'>
        {current !== maxPlace ? (
          <>
            <LinkStyle to={createUrl(current + 1)}>
              <NavigationButtonStyle>{` >`}</NavigationButtonStyle>
            </LinkStyle>

            <LinkStyle to={createUrl(maxPlace)}>
              <NavigationButtonStyle>{`>>`}</NavigationButtonStyle>
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
