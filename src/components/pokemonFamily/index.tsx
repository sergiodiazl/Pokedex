import React, { useEffect, useState } from 'react';
import FlexStyle, { ColumnFlexStyle } from '../../styles/FlexStyle';
import PokemonInfoStyle from '../../styles/PokemonInfoStyle';
import { PokemonContextConsumer } from '../../contexts/pokemonContext';
import { fetchDetail } from '../../utils/pokemonData';
import { EvolutionChain, NamedEntity } from '../../types/pokemonFullDetails';
import {
  EvolutionDetails,
  Chain,
  EvolvesToEntity,
} from '../../types/evolutionDetails';
import PokemonPreview from '../pokemonPreview';
import { localizeAppTexts } from '../../locale/localizeAppTexts';

interface Props {
  locale: string;
  family: EvolutionChain;
}

const PokemonFamily = (props: Props) => {
  const { family, locale } = props;
  const { url } = family;
  const{ familyTitle}=localizeAppTexts(locale)
  const [familyDetails, setfamilyDetails] = useState({} as EvolutionDetails);
  const { chain } = familyDetails;
  const [familyMembers, setFamilyMembers] = useState([] as NamedEntity[]);
  useEffect(() => {
    const fetchFamilyDetails = async () => {
      const fd = await fetchDetail(url);
      console.log(fd.chain);
      setfamilyDetails(fd);
    };
    fetchFamilyDetails();
  }, [url]);
  const familyTree = (chain: Chain) => {
    if (chain !== undefined) {
      let memberArray = [chain.species] as NamedEntity[];
      traverseFamilyTree(chain!.evolves_to!, memberArray);
      setFamilyMembers(memberArray);
    } else {
      return [];
    }
  };
  const traverseFamilyTree = (
    evolutionArray: EvolvesToEntity[],
    memberArray: NamedEntity[]
  ) => {
    for (let evolution of evolutionArray) {
      memberArray.push(evolution.species);

      console.log(evolution.species);
      if (evolutionArray.length > 0) {
        traverseFamilyTree(
          evolution!.evolves_to! as EvolvesToEntity[],
          memberArray
        );
      }
    }
  };
  useEffect(() => {
    familyTree(chain!);
  }, [chain]);
  return (
    <PokemonInfoStyle>
    <h2>{familyTitle}</h2>
    <ColumnFlexStyle flexWidth='100%'alignItems='flex-start'>
    
    
      {console.log(familyMembers)}
      <FlexStyle flexWidth='100%'>
        {familyMembers.map((member) => (
          <PokemonPreview name={member!.name!} locale={locale} />
        ))}
      </FlexStyle>
    
    </ColumnFlexStyle>
    </PokemonInfoStyle>
  );
};

export default PokemonFamily;
