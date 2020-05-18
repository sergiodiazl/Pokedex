import React, { useEffect, useState } from 'react';
import { Redirect, } from 'react-router-dom';
import { PokemonPreviewDetailsInterface } from '../../types/pokemonPreviewDetails';
import { PokemonFullDetailsInterface } from '../../types/pokemonFullDetails';
import {
  fetchPokemonFullDetails,
  fetchPokemonPreviewData,
  checkFetchError,
} from '../../utils/pokemonData';

import { localizeApiresponse } from '../../locale/localizeApiTexts';
import PokemonSummary from '../pokemonSummary';
import BattleInfo from '../battleInfo';
import ExtraInfo from '../extraInfo';
import { PokemonContextProvider } from '../../contexts/pokemonContext';
import { AppContextConsumer } from '../../appContext';
import { isEmpty } from '../../utils/objectUtils';
import PokemonFlavor from '../pokemonFlavor';

import { MainContentStyle } from '../../styles/LayoutStyle';
import Navigation from '../navigation';
import PokemonFamily from '../pokemonFamily';
import Abilities from '../abilities';
import FlexStyle from '../../styles/FlexStyle';

interface Props {
  name: string;
}


const PokemonInfo = (props: Props) => {
  const { name} = props;
  
  const [preview, setPreview] = useState({} as PokemonPreviewDetailsInterface);
  const [details, setDetails] = useState({} as PokemonFullDetailsInterface);
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
    if (
      checkFetchError(details) === true ||
      checkFetchError(preview) === true
    ) {
      setFetchError(true);
    }
  }, [details, preview]);


  const {
    names,id:pokemonId,evolution_chain:family
  } = details;

  const pokemonContext = { ...preview!, ...details! };

  return (
    <MainContentStyle flexWidth='100%' flexPadding='5%'>
      {fetchError ? <Redirect to="/notFound" /> : null}
      {loading ? (
        'loading'
      ) : (
        <>
          <AppContextConsumer>
            {(context) => {
              const{locale,totalPokemon}=context!
              const localName = localizeApiresponse(names!, locale, 'name');
              
              return(
               
                <>
                 { !isEmpty(details)&& !isEmpty(preview)?
                  <>
                   <Navigation current={pokemonId!} place='/pokemon/' maxPlace={totalPokemon}/>
                 <FlexStyle flexWidth='100%'>
                 <h1>{`#${pokemonId} ${localName}`}</h1>
                 </FlexStyle>
                 
               
               
  
                      
                      <PokemonContextProvider value={pokemonContext}>
                      <PokemonSummary locale={locale} />
                    
                      <PokemonFlavor locale={locale}/>
                        <Abilities/>
                        <PokemonFamily locale={locale} family={family}/>
                   
                      <BattleInfo />
                     
                      <ExtraInfo
                        
                      />
                     <PokemonFamily locale={locale} family={family}/>
                     <Navigation current={pokemonId!} place='/pokemon/' maxPlace={totalPokemon}/>
             
                    </PokemonContextProvider>
                  </>
                   : 'Loading'}
                </>
              )
            }}
          </AppContextConsumer>
        </>
      )}
    </MainContentStyle>
  );
};

export default PokemonInfo;
