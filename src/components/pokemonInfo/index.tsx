import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { PokemonPreviewDetailsInterface } from '../../types/pokemonPreviewDetails';
import { PokemonFullDetailsInterface } from '../../types/pokemonFullDetails';
import {
  fetchPokemonFullDetails,
  fetchPokemonPreviewData,
  correctFetch,
} from '../../utils/pokemonData';

import { localizeApiresponse } from '../../locale/localizeApiTexts';

import { PokemonContextProvider } from '../../contexts/pokemonContext';
import { AppContextConsumer } from '../../contexts/appContext';
import { isEmpty, getProperty } from '../../utils/objectUtils';
import Loading from '../loading';
import { MainContentStyle } from '../../styles/LayoutStyle';

import { localizeAppTexts } from '../../locale/localizeAppTexts';
import { PokemonCombinedData } from '../../types/pokemonCombinedData';
import Stats from '../stats';
import Moves from '../moves';
import useLocalStorage from '../../hooks/useLocalStorage';
////////////////////////////
const Navigation = lazy(() => import('../navigation'));
const FlexStyle = lazy(() => import('../../styles/FlexStyle'));
const PokemonSummary = lazy(() => import('../pokemonSummary'));
const PokemonFlavor = lazy(() => import('../pokemonFlavor'));
const Abilities = lazy(() => import('../abilities'));
const PokemonFamily = lazy(() => import('../pokemonFamily'));
/////
interface Props {
  name: string;
}

const PokemonInfo = (props: Props) => {
  const { name } = props;

  const [preview, setPreview] = useState({} as PokemonPreviewDetailsInterface);
  const [details, setDetails] = useState({} as PokemonFullDetailsInterface);
  const [pokemonContext, setPokemonContext] = useState(
    {} as PokemonCombinedData
  );
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const[storedPokemon,setStoredPokemon]=useLocalStorage('pokemon',{}
  )
  const isStored=getProperty(storedPokemon,name)!==null
  //fetch data
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const fetchPreviewAndDetails = async () => {
      const previewData = await fetchPokemonPreviewData(name);
      const detailsData = await fetchPokemonFullDetails(name);

      if (isMounted && correctFetch(detailsData)&&correctFetch(previewData)) {
        
        setPreview(previewData);
        setDetails(detailsData);
        setStoredPokemon({...storedPokemon,[name]:{previewData,detailsData}})
      }
    };

    if(isStored){
      const pokemonInfo=getProperty(storedPokemon,name)
      const {previewData,detailsData}=pokemonInfo
      
      setPreview(previewData)
      setDetails(detailsData)
    }else{
      fetchPreviewAndDetails();
    }
    return () => {
      isMounted = false;
    };
  }, [name,isStored,storedPokemon]);
  useEffect(() => {
    setLoading(false);
    if (correctFetch(details) === false|| correctFetch(preview) === false) {
      setFetchError(true);
    } else {
      if (!isEmpty(preview) && !isEmpty(details)) {
        setPokemonContext({ ...preview!, ...details! });
        setPreview({} as PokemonPreviewDetailsInterface);
        setDetails({} as PokemonFullDetailsInterface);
      }
    }
  }, [details, preview]);

  useEffect(() => {
    console.log(pokemonContext);
  }, [pokemonContext]);
  const { names, id: pokemonId, evolution_chain: family } = pokemonContext;

  return (
    <MainContentStyle flexWidth="100%" flexPadding="5%">
      {fetchError ? <Redirect to="/notFound" /> : null}
      {loading ? (
        <Loading />
      ) : (
        <>
          <AppContextConsumer>
            {(context) => {
              const { locale, totalPokemon } = context!;
              const localName = localizeApiresponse(names!, locale, 'name');
              const { loadingText } = localizeAppTexts(locale);

              document.title = loading
                ? loadingText
                : `#${pokemonId} ${localName}`;
              return (
                <>
                  {!isEmpty(pokemonContext) ? (
                    
                      <Suspense fallback={loading}>
                        <Navigation
                          current={pokemonId!}
                          place="/pokemon/"
                          maxPlace={totalPokemon}
                        />

                        <PokemonContextProvider value={pokemonContext}>
                          <FlexStyle
                            flexWidth="100%"
                            fontSize="10px"
                            fonts="16px"
                          >
                            <h1>{`#${pokemonId} ${localName}`}</h1>
                          </FlexStyle>
                          <FlexStyle flexWidth="100%">
                            <PokemonSummary locale={locale} />
                          </FlexStyle>
                          <PokemonFlavor locale={locale} />
                          <Abilities />
                          <PokemonFamily locale={locale} family={family} />
                          <Stats/>
                          <Moves/>
                         
                         

                          <PokemonFamily locale={locale} family={family} />
                          <Navigation
                            current={pokemonId!}
                            place="/pokemon/"
                            maxPlace={totalPokemon}
                          />
                        </PokemonContextProvider>
                      </Suspense>
                 
                  ) : (
                   <Loading/>
                  )}
                </>
              );
            }}
          </AppContextConsumer>
        </>
      )}
    </MainContentStyle>
  );
};

export default PokemonInfo;
