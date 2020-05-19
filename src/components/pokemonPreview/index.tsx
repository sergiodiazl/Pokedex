import React, { useEffect, useState } from 'react';



import PlaceholderS from '../../assets/img/placeholder.png';
import { PokemonPreviewDetailsInterface, Sprites, TypesEntity } from '../../types/pokemonPreviewDetails';
import CardStyle from '../../styles/CardStyle';
import PokemonTypes from '../pokemonTypes';
import LinkStyle from '../../styles/LinkStyle';
import {
  fetchPokemonPreviewData,
  fetchPokemonFullDetails,
  checkFetchError,
} from '../../utils/pokemonData';
import { PokemonFullDetailsInterface } from '../../types/pokemonFullDetails';
import { localizeApiresponse } from '../../locale/localizeApiTexts';
import { ShakeAnimation } from '../../styles/Animations';
import FlexStyle, { ColumnFlexStyle } from '../../styles/FlexStyle';
import  { PreviewImg } from '../../styles/ResponsiveImg';

interface Props {
  name: string;

  locale: string;
}
interface CardProps{
  id:number
  sprites:Sprites
  locale:string
  localName:string
  pokemonTypes:TypesEntity[]
}

const SuccessFulPreviewCard=(props:CardProps)=>{
  const{id,sprites,locale,localName,pokemonTypes}=props
  return(
    <LinkStyle to={`/pokemon/${id}`}>
    <CardStyle
      hoverAnimation={ShakeAnimation}
      alignItems="flex-start"
      flexWidth='80px' flexHeight='170px'
      mediaWs='5rem' mediaHs='10rem'
      mediaWm='7rem' mediaHm='12rem'
      mediaWl='10rem' mediaHl='15rem'
      mediaWxl='20rem' mediaHxl='28rem'
      fontSize='6.5px' fontSm='9px'
      fontSl='12px' fontSxl='20px'
    >
      <ColumnFlexStyle flexWidth='100%'flexHeight='100%'>
        <FlexStyle  flexWidth='100%' flexHeight='50%'>
        


  <PreviewImg
          src={
            sprites !== undefined && sprites.front_default !== null
              ? sprites.front_default
              : PlaceholderS
          }
          alt=  {localName}
        />
         
 
       
       <div>
       
         </div>
        </FlexStyle>

        
              
        <FlexStyle flexHeight='40%' flexWidth='100%'>
        
      <FlexStyle flexHeight='50%'>
      <FlexStyle flexWidth='100%' flexHeight='40%'>
         {`#${id}`}
         </FlexStyle>
             
           <FlexStyle flexWidth='100%'>
           {`${localName}`}
         </FlexStyle>
        
      </FlexStyle>
        
      
        {pokemonTypes !== undefined ? (
      
        <PokemonTypes
        locale={locale!}
        pokemonTypes={pokemonTypes!}
      />
       
        ) : null}
        </FlexStyle>

        
      
      </ColumnFlexStyle>
    </CardStyle>
  </LinkStyle>
  )
}
const LoadingPreviewCard=()=>(
  <CardStyle  
  flexWidth='80px' flexHeight='170px'
  mediaWs='5rem' mediaHs='10rem'
  mediaWm='7rem' mediaHm='12rem'
  mediaWl='10rem' mediaHl='15rem'
  mediaWxl='20rem' mediaHxl='28rem'
  fontSize='6.5px' fontSm='9px'
  fontSl='12px' fontSxl='20px'>
              
  <ColumnFlexStyle >
Loading
</ColumnFlexStyle>

</CardStyle>
)
const ErrorPreviewCard=()=>(
  <CardStyle      flexWidth='80px' flexHeight='170px'
  mediaWs='5rem' mediaHs='10rem'
  mediaWm='7rem' mediaHm='12rem'
  mediaWl='10rem' mediaHl='15rem'
  mediaWxl='20rem' mediaHxl='28rem'
  fontSize='6.5px' fontSm='9px'
  fontSl='12px' fontSxl='20px'>
              
  <ColumnFlexStyle >
 Preview error
</ColumnFlexStyle>

</CardStyle>
)
const PokemonPreview = (props: Props) => {
  const { name, locale } = props;

  const [preview, setPreview] = useState({} as PokemonPreviewDetailsInterface);
  const [details, setDetails] = useState({} as PokemonFullDetailsInterface);
 
  const [fetchError, setFetchError] = useState(false);
  //fetch data
  useEffect(() => {
    const fetchPreview = async () => {
      const previewData = await fetchPokemonPreviewData(name);
      setPreview(previewData);
    };
    const fetchDetails = async () => {
      const detailsData = await fetchPokemonFullDetails(name);
      setDetails(detailsData);
    };
    fetchPreview();
    fetchDetails();
  }, [name]);
  useEffect(() => {
    if (
      checkFetchError(details) === true ||
      checkFetchError(preview) === true
    ) {
      setFetchError(true);
    }
  }, [details, preview]);
  const { names } = details;

  const localName = localizeApiresponse(names!, locale, 'name') as string;
  const { id, sprites, types: pokemonTypes } = preview!;
  return (
    <>
      {fetchError ? (
       <ErrorPreviewCard/>
      ) : (
        <>
          {id !== undefined ? (
                     <SuccessFulPreviewCard id={id!} locale={locale!}localName={localName!}pokemonTypes={pokemonTypes!} sprites={sprites}/>

          ) : (
            <>
           <LoadingPreviewCard/>
           </>
          )}
        </>
      )}
    </>
  );
};

export default PokemonPreview;
