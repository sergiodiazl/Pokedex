import React from 'react';

import PlaceholderImg from '../../assets/img/placeholder.png';
import { PokemonContextConsumer } from '../../contexts/pokemonContext';
import { localizeApiresponse } from '../../locale/localizeApiTexts';
import PokemonTypes from '../pokemonTypes';
import CardStyle from '../../styles/CardStyle';
import FlexStyle, {
  ColumnFlexStyle,
  ColumnToRowFlexStyle,
} from '../../styles/FlexStyle';
import { WalkAnimation, ShakeAnimation } from '../../styles/Animations';
import ResponsiveImg from '../../styles/ResponsiveImg';
interface Props {
  locale: string;
}

const PokemonSummary = (props: Props) => {
  const { locale } = props;
  return ( 
    <>

<CardStyle
      flexWidth="100%"
      mediaWs="100%"
      mediaHs="100%"
      mediaWm="50%"
      mediaHm="10rem"
      mediaWl="40%"
      mediaHl="15rem"
      mediaWxl="25%"
      mediaHxl="20rem"
      fontSize="10px"
 fontSm='9px'
      fontSl='12px' fontSxl='20px'
      flexPadding='0px'
      mainAnimation={WalkAnimation}
      hoverAnimation={ShakeAnimation}
      imgBg='none'
    >
      <PokemonContextConsumer>
        {(context) => {
          const { id} = context!;
          const localName = localizeApiresponse(
            context!.names!,
            locale!,
            'name'
          );
          const localGenus = localizeApiresponse(
            context!.genera!,
            locale!,
            'genus'
          );
          const { types: pokemonTypes } = context!;
          const sprites = context!.sprites!;
          const frontSprite = sprites.front_default;

          return (
            <ColumnToRowFlexStyle flexWidth="100%" flexHeight='100%'>
              <FlexStyle flexWidth='50%'  >
               <FlexStyle flexWidth='100%'>
               <ResponsiveImg
                  imgWidth="100%"
                  src={
                    frontSprite !== null && frontSprite !== undefined
                      ? frontSprite
                      : PlaceholderImg
                  }
                  alt={localName!}
                />
               </FlexStyle>
              </FlexStyle>
              <ColumnFlexStyle flexWidth="50%"  mediaWl='50%'mediaHl='100%' flexPadding='0'>
                <FlexStyle flexHeight='50%'flexWidth='100%'  flexPadding='5%'>
                <p>
                  {`#${id} ${localName}`}
                </p>
                <p> {localGenus}</p>
                </FlexStyle>
               <FlexStyle flexHeight='50%' flexWidth='100%' flexPadding='5%'>
               <PokemonTypes locale={locale} pokemonTypes={pokemonTypes!} />
               </FlexStyle>
                
              </ColumnFlexStyle>
            </ColumnToRowFlexStyle>
          );
        }}
      </PokemonContextConsumer>
    </CardStyle>
  
    </>
   
  );
};

export default PokemonSummary;
