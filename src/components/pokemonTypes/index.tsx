import React, { useState, useEffect } from 'react';
import { NamedEntity, TypesEntity } from '../../types/pokemonPreviewDetails';

import { fetchDetail, correctFetch } from '../../utils/pokemonData';
import { localizeApiresponse } from '../../locale/localizeApiTexts';
import { localizeAppTexts } from '../../locale/localizeAppTexts';

import { AppContextConsumer } from '../../contexts/appContext';
import TypedItemStyle from '../../styles/TypedItemStyle';
import FlexStyle, { ColumnFlexStyle } from '../../styles/FlexStyle';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getProperty } from '../../utils/objectUtils';

interface Props {
  locale: string;
  pokemonTypes: TypesEntity[];
}
interface TypeProps extends NamedEntity {
  locale: string;
}
export const PokemonType :React.FC<TypeProps>= (props) => {
  const { name, url, locale} = props;
  const [localTypeName, setLocalTypeName] = useState(name);
  const [storedTypes, setstoredTypes] = useLocalStorage('types', {});
  const isStored = getProperty(storedTypes, name) !== null;
  useEffect(() => {
    let isMounted = true;
    const fetchTypeDetails = async () => {
      const typeDetails = await fetchDetail(url);

      const LName = localizeApiresponse(typeDetails.names, locale, 'name');
      if (isMounted) {
        // console.log(typeDetails,correctFetch(typeDetails))
        if (correctFetch(typeDetails)) {
       
       
          setstoredTypes({ ...storedTypes, [name]: typeDetails });
          setLocalTypeName(LName!);
        }
      }
    };
    if (isStored) {
      const typeDetails = getProperty(storedTypes, name);
      const LName = localizeApiresponse(typeDetails.names, locale, 'name');
    
      setLocalTypeName(LName!);
    } else {
      fetchTypeDetails();
    }
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStored, url, name, locale, storedTypes]);
  return (
    <TypedItemStyle flexWidth="100%" name={name}>
      {localTypeName}
    </TypedItemStyle>
  );
};
const PokemonTypes:React.FC<Props> = (props) => {
  const { pokemonTypes, locale } = props!;

 
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
