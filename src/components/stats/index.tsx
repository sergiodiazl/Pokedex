import React, { useState, useEffect } from 'react';
import { PokemonContextConsumer } from '../../contexts/pokemonContext';
import { AppContextConsumer } from '../../appContext';
import { StatsEntity } from '../../types/pokemonPreviewDetails';
import { fetchDetail } from '../../utils/pokemonData';
import { localizeApiresponse } from '../../locale/localizeApiTexts';
import FlexStyle from '../../styles/FlexStyle';
import PokemonInfoStyle from '../../styles/PokemonInfoStyle';
import { localizeAppTexts } from '../../locale/localizeAppTexts';
import {FadeAnimation} from'../../styles/Animations'
interface Props {}
interface StatProps {
  locale: string;
  info: StatsEntity;
}
const Stat = (props: StatProps) => {
  const { info, locale } = props;
  const { stat, base_stat } = info;
  const { name, url } = stat;
  const [localName, setLocalName] = useState(name);
  useEffect(() => {
    const fetchStatDetails = async () => {
      const statDetails = await fetchDetail(url);

      const lName = localizeApiresponse(statDetails.names, locale, 'name');
      setLocalName(lName!);
    };
    fetchStatDetails();
  }, [url, locale]);
  return (
    <FadeAnimation direction='top' triggerOnce>
    <FlexStyle flexMinWidth='30%'>
    
      <div> {localName}:{base_stat}
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
                <FadeAnimation direction='top' triggerOnce>
                <PokemonInfoStyle as="section">
                <h2>{statTitle}</h2>
                  <FlexStyle flexWidth='100%' justifyContent='space-around'>
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
