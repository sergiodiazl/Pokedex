import React, { useState, useEffect } from 'react';
import { PokemonContextConsumer } from '../../contexts/pokemonContext';
import { AppContextConsumer } from '../../contexts/appContext';
import { NamedEntity } from '../../types/pokemonPreviewDetails';
import { fetchDetail, correctFetch} from '../../utils/pokemonData';
import { localizeApiresponse } from '../../locale/localizeApiTexts';
import { v4 as uuid } from 'uuid';
import TypedItemStyle from '../../styles/TypedItemStyle';
import PokemonInfoStyle from '../../styles/PokemonInfoStyle';
import { localizeAppTexts } from '../../locale/localizeAppTexts';
import { GridStyle } from '../../styles/GridStyle';
import { FadeAnimation } from '../../styles/Animations';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getProperty } from '../../utils/objectUtils';
interface Props {}
interface MoveProps {
  locale: string;
  move: NamedEntity;
}
const Move = (props: MoveProps) => {
  const { move, locale } = props;
  const {  name,url } = move;
  const [localName, setLocalName] = useState('');
  const [typeName, setTypeName] = useState('normal');
  
  const [storedMoves, setStoredMoves] = useLocalStorage('moves', {});
  const isStored=getProperty(storedMoves,name)!==null

  
  useEffect(() => {
    let isMounted=true;
    
    const fetchMoveDetails = async () => {
      const moveDetails = await fetchDetail(url);
      const moveTypeName = moveDetails.type.name;
      const lName = localizeApiresponse(moveDetails.names, locale, 'name');
     if(isMounted &&correctFetch(moveDetails)){
      console.log('moviemientos grabados antes de grabar',name)
      console.log(storedMoves)
      setStoredMoves({...storedMoves,[name]:moveDetails })
      setLocalName(lName!);
      setTypeName(moveTypeName!);

     }
    };
    if(isStored){
       const moveDetails=getProperty(storedMoves,name)
       const moveTypeName = moveDetails.type.name;
       const lName = localizeApiresponse(moveDetails.names, locale, 'name')
       setLocalName(lName!);
       setTypeName(moveTypeName!);
    }else{
      fetchMoveDetails();
      
    }
    return()=>{isMounted=false;
     }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name,url,isStored,storedMoves,locale]);
 
  

    return(
      <FadeAnimation direction='top' divWidth='100%' divHeight='100%' duration={500}fraction={1} triggerOnce>
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
                <FadeAnimation direction="top" duration={500} cascade  triggerOnce divWidth='100%'>
             
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
