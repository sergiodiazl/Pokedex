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
import { WalkAnimation, ShakeAnimation, FadeAnimation, ZoomAnimation } from '../../styles/Animations';
import ResponsiveImg from '../../styles/ResponsiveImg';
interface Props {
  locale: string;
}

const PokemonSummary = (props: Props) => {
  const { locale } = props;
  return (
   
<FadeAnimation divWidth='100%'>
     
<CardStyle
        flexWidth="100%"
        mediaWs="100%"
        mediaHs="100%"
        mediaWm="50%"
        mediaWl="40%"
        mediaWxl="35%"
        fontSize="10px"
        fontSm="10x"
        fontSl="12px"
        fontSxl="20px"
        flexPadding="0px"
        mainAnimation={WalkAnimation}
        hoverAnimation={ShakeAnimation}
        imgBg="none"
        center
      >
     
        <PokemonContextConsumer>
          {(context) => {
            const { id } = context!;
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
              <ColumnToRowFlexStyle flexWidth="100%" flexHeight="100%">
                <FlexStyle flexWidth="50%">
                <ZoomAnimation divWidth='100%' delay={100}fraction={1}>
                  <FlexStyle flexWidth="100%">
              
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
                  </ZoomAnimation>
                </FlexStyle>
                <ColumnFlexStyle
                  flexWidth="100%"
                  mediaWl="50%"
                  mediaHl="100%"
                  flexPadding="0"
                >
               <FadeAnimation direction='top' delay={100} cascade divWidth='100%'triggerOnce>

               <ColumnFlexStyle
                    flexHeight="50%"
                    flexWidth="100%"
                    flexPadding="5%"
                  >
                    <p>{`#${id} ${localName}`}</p>
                    <p> {localGenus}</p>
                  </ColumnFlexStyle>
                  <FlexStyle flexHeight="50%" flexWidth="100%" flexPadding="5%">
                    <PokemonTypes
                      locale={locale}
                      pokemonTypes={pokemonTypes!}
                    />
              
                  </FlexStyle>
                  </FadeAnimation>
                </ColumnFlexStyle>
              </ColumnToRowFlexStyle>
            );
          }}
        </PokemonContextConsumer>
      
      </CardStyle>
</FadeAnimation>
   
   
  );
};

export default PokemonSummary;
