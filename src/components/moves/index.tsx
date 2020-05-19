import React, { useState, useEffect } from 'react';
import { PokemonContextConsumer } from '../../contexts/pokemonContext';
import { AppContextConsumer } from '../../appContext';
import { NamedEntity } from '../../types/pokemonPreviewDetails';
import { fetchDetail } from '../../utils/pokemonData';
import { localizeApiresponse } from '../../locale/localizeApiTexts';

import TypedItemStyle from '../../styles/TypedItemStyle';
import PokemonInfoStyle from '../../styles/PokemonInfoStyle';
import { localizeAppTexts } from '../../locale/localizeAppTexts';
import { GridStyle } from '../../styles/GridStyle';
import { FadeAnimation } from '../../styles/Animations';
interface Props {}
interface MoveProps {
  locale: string;
  move: NamedEntity;
}
const Move = (props: MoveProps) => {
  const { move, locale } = props;
  const { name, url } = move;
  const [localName, setLocalName] = useState(name);
  const [typeName, setTypeName] = useState('normal');
  useEffect(() => {
    const fetchMoveDetails = async () => {
      const moveDetails = await fetchDetail(url);
      const moveTypeName = moveDetails.type.name;
      const lName = localizeApiresponse(moveDetails.names, locale, 'name');
      setLocalName(lName!);
      setTypeName(moveTypeName!);
    };
    fetchMoveDetails();
  }, [url, locale]);
  return (
    <TypedItemStyle
      name={typeName}
      flexWidth="100%"
      flexHeight='100%'
      itemPadding="1%"
      as="article"
    >
      {localName}
    </TypedItemStyle>
  );
};
const Moves = (props: Props) => {
  return (
    <PokemonContextConsumer>
      {(context) => {
        const { moves } = context!;
        return (
          <AppContextConsumer>
            {(context) => {
              const { locale } = context!;
              const { movesTitle } = localizeAppTexts(locale);
              return (
                <FadeAnimation direction="top" cascade triggerOnce >
             
              <PokemonInfoStyle as="section">
                     <h2>{movesTitle}</h2>
                    <GridStyle gridWidth="100%">
                      {moves!.map((move) => (
                      
                          <Move
                            key={move!.move!.name}
                            move={move!.move}
                            locale={locale!}
                          />
                      ))}
                    </GridStyle>
                    
                 
                </PokemonInfoStyle>
                </FadeAnimation>
              );
            }}
          </AppContextConsumer>
        );
      }}
    </PokemonContextConsumer>
  );
};

export default Moves;
