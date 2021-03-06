import React, { useEffect, useState } from 'react';

import PlaceholderS from '../../assets/img/placeholder.png';
import {
  PokemonPreviewDetailsInterface,
  Sprites,
  TypesEntity,
} from '../../types/pokemonPreviewDetails';
import  { PreviewCardStyle } from '../../styles/CardStyle';
import PokemonTypes from '../pokemonTypes';
import LinkStyle from '../../styles/LinkStyle';
import {
  fetchPokemonPreviewData,
  fetchPokemonFullDetails,
  correctFetch,
} from '../../utils/pokemonData';
import { PokemonFullDetailsInterface } from '../../types/pokemonFullDetails';
import { localizeApiresponse } from '../../locale/localizeApiTexts';
import { ShakeAnimation, SwingAnimation } from '../../styles/Animations';
import FlexStyle, { ColumnFlexStyle } from '../../styles/FlexStyle';
import { PreviewImg } from '../../styles/ResponsiveImg';
import Loading from '../loading';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getProperty } from '../../utils/objectUtils';

interface Props {
  name: string;

  locale: string;
}
interface CardProps {
  id: number;
  sprites: Sprites;
  locale: string;
  localName: string;
  pokemonTypes: TypesEntity[];
}

const SuccessFulPreviewCard:React.FC<CardProps> = (props) => {
  const { id, sprites, locale, localName, pokemonTypes } = props;
  return (
    <LinkStyle to={`/pokemon/${id}`}  >
      <PreviewCardStyle
        hoverAnimation={ShakeAnimation}
        alignItems="flex-start"
        flexWidth="100px"
        flexHeight="170px"
        mediaWs="7rem"
        mediaHs="10rem"
        mediaWm="7rem"
        mediaHm="14rem"
        mediaWl="10rem"
        mediaHl="18rem"
        mediaWxl="20rem"
        mediaHxl="35rem"
        fontSize="7px"
        fontSm="9px"
        fontSl="12px"
        fontSxl="20px"
        imgShadow
      >
        <ColumnFlexStyle flexWidth="100%" flexHeight="100%" 
        justifyContent='flex-start'>
          <FlexStyle flexWidth="100%" flexHeight="50%">
          <FlexStyle flexWidth="100%" justifyContent='flex-end'>
                {`#${id}`}
              </FlexStyle>
              <PreviewImg
              src={
                sprites !== undefined && sprites.front_default !== null
                  ? sprites.front_default
                  : PlaceholderS
              }
              alt={localName}
            />

          </FlexStyle>

          <FlexStyle flexHeight="40%" flexWidth="100%">
            <FlexStyle flexHeight="50%">
              

              <FlexStyle flexWidth="100%">{`${localName}`}</FlexStyle>
            </FlexStyle>

            {pokemonTypes !== undefined ? (
              <PokemonTypes locale={locale!} pokemonTypes={pokemonTypes!} />
            ) : null}
          </FlexStyle>
        </ColumnFlexStyle>
      </PreviewCardStyle>
    </LinkStyle>
  );
};
const LoadingPreviewCard:React.FC = () => (
  <PreviewCardStyle
  flexWidth="100px"
  flexHeight="170px"
  mediaWs="7rem"
  mediaHs="10rem"
  mediaWm="7rem"
  mediaHm="14rem"
  mediaWl="10rem"
  mediaHl="18rem"
  mediaWxl="20rem"
  mediaHxl="35rem"
  fontSize="6.5px"
  fontSm="9px"
  fontSl="12px"
  fontSxl="20px"
  imgBg='none'
  >
    <ColumnFlexStyle flexWidth='100%' flexPadding='1%'><Loading/></ColumnFlexStyle>
  </PreviewCardStyle>
);
const ErrorPreviewCard:React.FC = () => (
  <PreviewCardStyle
  flexWidth="100px"
  flexHeight="170px"
  mediaWs="7rem"
  mediaHs="10rem"
  mediaWm="7rem"
  mediaHm="14rem"
  mediaWl="10rem"
  mediaHl="18rem"
  mediaWxl="20rem"
  mediaHxl="35rem"
  fontSize="6.5px"
  fontSm="9px"
  fontSl="12px"
  fontSxl="20px"
  >
    <ColumnFlexStyle>Preview error</ColumnFlexStyle>
  </PreviewCardStyle>
);
const PokemonPreview:React.FC<Props> = (props) => {
  const { name, locale } = props;
 const [loading,setLoading]=useState(true)
  const [preview, setPreview] = useState({} as PokemonPreviewDetailsInterface);
  const [details, setDetails] = useState({} as PokemonFullDetailsInterface);
  const [storedPokemon,setStoredPokemon]=useLocalStorage('pokemon',{})
  const isStored=getProperty(storedPokemon,name)!==null
  const [fetchError, setFetchError] = useState(false);
  //fetch data
  useEffect(() => {
    let isMounted=true
    const fetchPokemon= async () => {
      const previewData = await fetchPokemonPreviewData(name);
      const detailsData = await fetchPokemonFullDetails(name);
      if(isMounted  ){
      if(correctFetch(detailsData)&&correctFetch(previewData)){
        setPreview(previewData);
        setDetails(detailsData); 
      }else{
setFetchError(true)
      }
      setLoading(false)
      /*los pokemon en la busqueda principal solo contienen
      nombre y url de su data de preview,no los detalless 
      */
     const pokemonId=previewData.id
      setStoredPokemon({...storedPokemon,[name]:{previewData,detailsData},[pokemonId]:{previewData,detailsData}})

    }
    };
   if(isStored){
   const pokemonInfo=getProperty(storedPokemon,name)
      const {previewData,detailsData}=pokemonInfo
      
      setPreview(previewData)
      setDetails(detailsData)
      setLoading(false)
   }else{
     
   fetchPokemon()
   }
    return()=>{
      
      isMounted=false
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name,isStored,storedPokemon   ]);
  useEffect(() => {
    if (
      correctFetch(details) ===false ||
      correctFetch(preview) === false
    ) {
      setFetchError(true);
    }
  }, [details, preview]);
  const { names } = details;

  const localName = localizeApiresponse(names!, locale, 'name') as string;
  const { id, sprites, types: pokemonTypes } = preview!;
  return (
    <SwingAnimation triggerOnce>
      {loading ? (
        <LoadingPreviewCard />
      ) : (
        <>
          {!fetchError? (
            <SuccessFulPreviewCard
              id={id!}
              locale={locale!}
              localName={localName!}
              pokemonTypes={pokemonTypes!}
              sprites={sprites}
            />
          ) : (
            <>
              <ErrorPreviewCard />
            </>
          )}
        </>
      )}
    </SwingAnimation>
  );
};

export default PokemonPreview;
