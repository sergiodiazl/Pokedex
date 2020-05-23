import React, { useState, useEffect } from 'react';
import { NamedEntity, TypesEntity } from '../../types/pokemonPreviewDetails';

import { fetchDetail, correctFetch } from '../../utils/pokemonData';
import { localizeApiresponse } from '../../locale/localizeApiTexts';
import { localizeAppTexts } from '../../locale/localizeAppTexts';

import { AppContextConsumer } from '../../contexts/appContext';
import TypedItemStyle from '../../styles/TypedItemStyle';
import FlexStyle, { ColumnFlexStyle } from '../../styles/FlexStyle';
import useLocalStorage from '../../hooks/useLocalStorage';
import {  getProperty } from '../../utils/objectUtils';

interface Props {
  locale: string;
  pokemonTypes: TypesEntity[];
}
interface TypeProps extends NamedEntity {
  locale: string;
  markAsDone:Function,
  markToStore:Function,
}
export const PokemonType = (props: TypeProps) => {
  const { name, url, locale ,markAsDone,markToStore} = props;
  const [localTypeName, setLocalTypeName] = useState(name);
  const [storedTypes, setstoredTypes] = useLocalStorage('types', {});
  const isStored=getProperty(storedTypes,name)!==null
  useEffect(() => {
    let isMounted = true;
    const fetchTypeDetails = async () => {
      const typeDetails = await fetchDetail(url);

      const LName = localizeApiresponse(typeDetails.names, locale, 'name');
      if (isMounted) {
      console.log(typeDetails,correctFetch(typeDetails))
       if(correctFetch(typeDetails)){
         markAsDone() 
         markToStore(typeDetails)
        setstoredTypes({...storedTypes,[name]:typeDetails});
        setLocalTypeName(LName!);
       }
      }
    };
    if (isStored) {
      const typeDetails = getProperty(storedTypes,name);
      const LName = localizeApiresponse(typeDetails.names, locale, 'name');
      markAsDone() 
      setLocalTypeName(LName!);
    } else {
      fetchTypeDetails();
    }
    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStored,url,name,locale,storedTypes ]);
  return (
    <TypedItemStyle flexWidth="100%" name={name}>
      {localTypeName}
    </TypedItemStyle>
  );
};
const PokemonTypes = (props: Props) => {
  const { pokemonTypes, locale } = props!;

  let renderedTyped=0;
  const markasDone=()=>{
    renderedTyped++;

  }
  const markToStore=(object:object)=>{
    console.log('store',object)
  }
useEffect(() => {
console.log(renderedTyped)
if(renderedTyped===pokemonTypes.length){
  console.log('render',pokemonTypes)
}
}, [renderedTyped,pokemonTypes])
  return (
    <AppContextConsumer>
      {(context) => {
        const { typesTitle } = localizeAppTexts(locale!);
       
        return (
          <ColumnFlexStyle
            flexWidth="100% "
            flexHeight="100%"
            justifyContent="flex-start"
            as="section"
          >
            <FlexStyle> {typesTitle}</FlexStyle>
            <FlexStyle
              flexWidth="100%"
              fontSize="5px"
              fontSs="6px"
              fontSm="8px"
              fontSl="10x"
              fontSxl="15px"
            >
              {pokemonTypes!.map((pokeType) => (
                <PokemonType
                  locale={locale!}
                  name={pokeType.type.name}
                  url={pokeType.type.url}
                  key={pokeType.type.url}
                  markAsDone={markasDone}
                  markToStore={markToStore}
                />
              ))}
            </FlexStyle>
          </ColumnFlexStyle>
        );
      }}
    </AppContextConsumer>
  );
};

export default PokemonTypes;
