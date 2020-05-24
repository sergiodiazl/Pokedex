import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { PokemonPreviewDetailsInterface } from '../../types/pokemonPreviewDetails';
import { PokemonFullDetailsInterface } from '../../types/pokemonFullDetails';

import { PokemonCombinedData } from '../../types/pokemonCombinedData';
import { localizeAppTexts } from '../../locale/localizeAppTexts';

import {
  fetchPokemonFullDetails,
  fetchPokemonPreviewData,
  correctFetch,
} from '../../utils/pokemonData';

import { PokemonContextProvider } from '../../contexts/pokemonContext';
import { AppContextConsumer } from '../../contexts/appContext';
import { localizeApiresponse } from '../../locale/localizeApiTexts';

import { isEmpty } from '../../utils/objectUtils';
import Loading from '../loading';
import Navigation from '../navigation';
import { MainContentStyle } from '../../styles/LayoutStyle';



//////////////////////////// lazy imports
const FlexStyle = lazy(() => import('../../styles/FlexStyle'));
const PokemonSummary = lazy(() => import('../pokemonSummary'));
const PokemonFlavor = lazy(() => import('../pokemonFlavor'));
const Abilities = lazy(() => import('../abilities'));
const Stats = lazy(() => import('../stats'));
const Moves = lazy(() => import('../moves'));
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
  //fetch data
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const fetchPreviewAndDetails = async () => {
      const previewData = await fetchPokemonPreviewData(name);
      const detailsData = await fetchPokemonFullDetails(name);

      if (isMounted && correctFetch(detailsData) && correctFetch(previewData)) {
        setPreview(previewData);
        setDetails(detailsData);
      }
    };

    fetchPreviewAndDetails();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);
  useEffect(() => {
    setLoading(false);
    if (correctFetch(details) === false || correctFetch(preview) === false) {
      setFetchError(true);
    } else {
      if (!isEmpty(preview) && !isEmpty(details)) {
        setPokemonContext({ ...preview!, ...details! });
        setPreview({} as PokemonPreviewDetailsInterface);
        setDetails({} as PokemonFullDetailsInterface);
      }
    }
  }, [details, preview]);

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
<>
                      <Navigation
                        current={pokemonId!}
                        place="/pokemon/"
                        maxPlace={totalPokemon}
                      />
                      <Suspense fallback={<Loading/>}>
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
                          <Stats />
                          <Suspense fallback={<div>...</div>}>
                            <Moves />
                          </Suspense>

                          <PokemonFamily locale={locale} family={family} />
                        
                        </PokemonContextProvider>
                      </Suspense>
                      <Navigation
                            current={pokemonId!}
                            place="/pokemon/"
                            maxPlace={totalPokemon}
                          />
                    </>
                  ) : (
                    <Loading />
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
