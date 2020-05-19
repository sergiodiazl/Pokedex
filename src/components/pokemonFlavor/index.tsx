import React from 'react';
import { PokemonContextConsumer } from '../../contexts/pokemonContext';
import { localizeApiresponse } from '../../locale/localizeApiTexts';
import PokemonInfoStyle from '../../styles/PokemonInfoStyle';
import { localizeAppTexts } from '../../locale/localizeAppTexts';
import {FadeAnimation}from'../../styles/Animations'

interface Props {
  locale: string;
}

const PokemonFlavor = (props: Props) => {
  const { locale } = props;
  const{storyTitle}=localizeAppTexts(locale)
  return (
    <PokemonContextConsumer>
      {(context) => {
        const { flavor_text_entries: flavorText } = context!;
        const localFlavorText = localizeApiresponse(
          flavorText!,
          locale,
          'flavor_text'
        );
        return (
          <FadeAnimation direction='top' cascade triggerOnce>
         <PokemonInfoStyle as="section" alignItems='flex-start'> 
         
             <h2>{storyTitle}</h2>
            
                    
            <p>{localFlavorText}</p>
            
           
          </PokemonInfoStyle>
          </FadeAnimation>
        );
      }}
    </PokemonContextConsumer>
  );
};

export default PokemonFlavor;
