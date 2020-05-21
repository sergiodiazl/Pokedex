import React, { useState, useEffect } from 'react';
import { PokemonContextConsumer } from '../../contexts/pokemonContext';
import { AppContextConsumer } from '../../contexts/appContext';
import { NamedEntity } from '../../types/pokemonPreviewDetails';
import { fetchDetail } from '../../utils/pokemonData';
import { localizeApiresponse } from '../../locale/localizeApiTexts';
import { v4 as uuid } from 'uuid';
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
    let isMounted=true
    const fetchMoveDetails = async () => {
      const moveDetails = await fetchDetail(url);
      const moveTypeName = moveDetails.type.name;
      const lName = localizeApiresponse(moveDetails.names, locale, 'name');
     if(isMounted){
      setLocalName(lName!);
      setTypeName(moveTypeName!);
     }
    };
    fetchMoveDetails();
    return()=>{isMounted=false}
  }, [url, locale]);
  return (
    <FadeAnimation direction='top' divWidth='100%' divHeight='100%' duration={500}triggerOnce>
      <TypedItemStyle
      name={typeName}
      flexWidth="100%"
      flexHeight='100%'
      itemPadding="1%"
      as="article"
    >
      {localName}
    </TypedItemStyle>
    </FadeAnimation>
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
              const moveArrayId:string=uuid()
              return (
                <FadeAnimation direction="top" duration={500} cascade  triggerOnce>
             
              <PokemonInfoStyle as="section">
                     <h2>{movesTitle}</h2>
                     <FadeAnimation direction="left"divWidth='100%'delay={100}duration={500} cascade  triggerOnce>
                    <GridStyle gridWidth="100%">
               
                     {moves!.map((move) => (
                 
                      <Move
                        key={`${move!.move!.name}${moveArrayId}`}
                        move={move!.move}
                        locale={locale!}
                      />
               
                  ))}
              
                    </GridStyle>
                    
                    </FadeAnimation>     
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
