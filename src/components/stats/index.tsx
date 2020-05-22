import React, { useState, useEffect } from 'react';
import { PokemonContextConsumer } from '../../contexts/pokemonContext';
import { AppContextConsumer } from '../../contexts/appContext';
import { StatsEntity } from '../../types/pokemonPreviewDetails';
import { fetchDetail } from '../../utils/pokemonData';
import { localizeApiresponse } from '../../locale/localizeApiTexts';
import FlexStyle from '../../styles/FlexStyle';
import PokemonInfoStyle from '../../styles/PokemonInfoStyle';
import { localizeAppTexts } from '../../locale/localizeAppTexts';
import { FadeAnimation } from '../../styles/Animations';
import useLocalStorage from '../../hooks/useLocalStorage';
import { isEmpty } from '../../utils/objectUtils';
interface Props {}
interface StatProps {
  locale: string;
  info: StatsEntity;
}
const Stat = (props: StatProps) => {
  const { info, locale } = props;
  const { stat, base_stat } = info;
  const { name, url } = stat;
  const [storedFetch, setStoredFetch] = useLocalStorage(url, {});
  const [localName, setLocalName] = useState(name);
  useEffect(() => {
    let isMounted=true
    const fetchStatDetails = async () => {
     
      const statDetails = await fetchDetail(url);

      const lName = localizeApiresponse(statDetails.names, locale, 'name');
      setLocalName(lName!);
    };
    if (!isEmpty(storedFetch)) {
      const statDetails = storedFetch;
      const lName = localizeApiresponse(statDetails.names, locale, 'name');
      setStoredFetch(statDetails)
      setLocalName(lName!);
    } else {
      if(isMounted){
        
      fetchStatDetails()
      }
    }
    return()=>{isMounted=false}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, locale, storedFetch]);
  return (
    <FadeAnimation direction="left" triggerOnce>
      <FlexStyle flexMinWidth="30%">
        <div>
          {' '}
          {localName}:{base_stat}
        </div>
      </FlexStyle>
    </FadeAnimation>
  );
};
const Stats = (props: Props) => {
  return (
    <PokemonContextConsumer>
      {(context) => {
        const { stats } = context!;
        return (
          <AppContextConsumer>
            {(context) => {
              const { locale } = context!;
              const { statTitle } = localizeAppTexts(locale);
              return (
                <FadeAnimation direction="top" triggerOnce divWidth='100%'>
                  <PokemonInfoStyle as="section">
                    <h2>{statTitle}</h2>
                    <FlexStyle flexWidth="100%" justifyContent="space-around">
                      {stats!.map((s) => (
                        <Stat key={s.stat.name} info={s} locale={locale!} />
                      ))}
                    </FlexStyle>
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

export default Stats;
