import React, { lazy,Suspense,useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { PokemonPreviewDetailsInterface } from '../../types/pokemonPreviewDetails';
import { PokemonFullDetailsInterface } from '../../types/pokemonFullDetails';
import {
  fetchPokemonFullDetails,
  fetchPokemonPreviewData,
  checkFetchError,
} from '../../utils/pokemonData';

import { localizeApiresponse } from '../../locale/localizeApiTexts';

import { PokemonContextProvider } from '../../contexts/pokemonContext';
import { AppContextConsumer } from '../../appContext';
import { isEmpty } from '../../utils/objectUtils';
import Loading from '../loading'
import { MainContentStyle } from '../../styles/LayoutStyle';

import { FadeAnimation } from '../../styles/Animations';
import { localizeAppTexts } from '../../locale/localizeAppTexts';
////////////////////////////
const  Navigation=lazy(()=>import('../navigation'))
const  FlexStyle=lazy(()=>import('../../styles/FlexStyle'))
const  PokemonSummary=lazy(()=>import('../pokemonSummary'))
const  PokemonFlavor=lazy(()=>import('../pokemonFlavor'))
const  Abilities=lazy(()=>import('../abilities'))
const  PokemonFamily=lazy(()=>import('../pokemonFamily'))
const  BattleInfo=lazy(()=>import('../battleInfo'))

interface Props {
  name: string;
}

const PokemonInfo = (props: Props) => {
  const { name } = props;

  const [preview, setPreview] = useState({} as PokemonPreviewDetailsInterface);
  const [details, setDetails] = useState({} as PokemonFullDetailsInterface);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  //fetch data
  useEffect(() => {
    const fetchPreview = async () => {
      console.log('start fetch preview')
      const previewData = await fetchPokemonPreviewData(name);
      console.log('finsih start fetch preview')
      setPreview(previewData);
    };
    const fetchDetails = async () => {
      console.log('start fetch detail')
      const detailsData = await fetchPokemonFullDetails(name);
      console.log('finsih start fetch details')
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

  const { names, id: pokemonId, evolution_chain: family } = details;

  const pokemonContext = { ...preview!, ...details! };

  return (
    <MainContentStyle flexWidth="100%" flexPadding="5%">
      {fetchError ? <Redirect to="/notFound" /> : null}
      {loading ? (
       <Loading/>
      ) : (
        <>
          <AppContextConsumer>
            {(context) => {
              const { locale, totalPokemon } = context!;
              const localName = localizeApiresponse(names!, locale, 'name');
              const {loadingText}=localizeAppTexts(locale)
             
              document.title = loading?loadingText:`#${pokemonId} ${localName}`;
              return (
                <>
                  {!isEmpty(details) && !isEmpty(preview) ? (
                    <FadeAnimation direction="top" cascade>
                     <Suspense fallback={loading}>
                     <Navigation
                        current={pokemonId!}
                        place="/pokemon/"
                        maxPlace={totalPokemon}
                      />

                      <FlexStyle flexWidth="100%">
                        <h1>{`#${pokemonId} ${localName}`}</h1>
                      </FlexStyle>

                      <PokemonContextProvider value={pokemonContext}>
                        <FlexStyle flexWidth="100%">
                          <PokemonSummary locale={locale} />
                        </FlexStyle>
                        <PokemonFlavor locale={locale} />
                        <Abilities />
                        <PokemonFamily locale={locale} family={family} />

                        <BattleInfo />

                        <PokemonFamily locale={locale} family={family} />
                        <Navigation
                          current={pokemonId!}
                          place="/pokemon/"
                          maxPlace={totalPokemon}
                        />
                      </PokemonContextProvider>
                     </Suspense>
                    </FadeAnimation>
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
