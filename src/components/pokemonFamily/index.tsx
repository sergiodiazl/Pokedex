import React, { lazy,Suspense,useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import FlexStyle from '../../styles/FlexStyle';
import PokemonInfoStyle from '../../styles/PokemonInfoStyle';
import { fetchDetail } from '../../utils/pokemonData';
import { EvolutionChain, NamedEntity } from '../../types/pokemonFullDetails';
import {
  EvolutionDetails,
  Chain,
  EvolvesToEntity,
} from '../../types/evolutionDetails';
import { localizeAppTexts } from '../../locale/localizeAppTexts';
import { FlipAnimation, FadeAnimation } from '../../styles/Animations';
//lazy import
const PokemonPreview= lazy(() => import('../pokemonPreview'));
interface Props {
  locale: string;
  family: EvolutionChain;
}

const PokemonFamily:React.FC<Props> = (props) => {
  const { family, locale } = props;
  const { url } = family;
  const { familyTitle } = localizeAppTexts(locale);
  const [familyDetails, setfamilyDetails] = useState({} as EvolutionDetails);
  const { chain } = familyDetails;
  const [familyMembers, setFamilyMembers] = useState([] as NamedEntity[]);
  const PreviewArrayId: string = uuid();
  useEffect(() => {
    let isMounted = true;
    const fetchFamilyDetails = async () => {
      const fd = await fetchDetail(url);
      if (isMounted) {
        setfamilyDetails(fd);
      }
    };
    fetchFamilyDetails();
    return () => {
      isMounted = false;
    };
  }, [url]);

  useEffect(() => {
    const traverseFamilyTree = (
      evolutionArray: EvolvesToEntity[],
      memberArray: NamedEntity[]
    ) => {
      for (let evolution of evolutionArray) {
        memberArray.push(evolution.species);

        if (evolutionArray.length > 0) {
          traverseFamilyTree(
            evolution!.evolves_to! as EvolvesToEntity[],
            memberArray
          );
        }
      }
    };
    const familyTree = (chain: Chain) => {
      if (chain !== undefined) {
        let memberArray = [chain.species] as NamedEntity[];
        traverseFamilyTree(chain!.evolves_to!, memberArray);
        setFamilyMembers(memberArray);
      } else {
        return [];
      }
    };
    familyTree(chain!);
  }, [chain]);
  return (
    <FadeAnimation direction="left" delay={100} duration={300} damping={1} cascade triggerOnce divWidth='100%'>
      <PokemonInfoStyle>
        <h2>{familyTitle}</h2>
        <FlipAnimation direction="vertical" delay={300} damping={1.5}cascade divWidth='100%' triggerOnce >
       
          <FlexStyle flexWidth="100%" alignItems='center' justifyContent='center'>
         
            {familyMembers.map((member) => (
            <Suspense fallback={<div>...</div>}>
                <PokemonPreview
                name={member!.name!}
                key={`${member!.name!}${PreviewArrayId}`}
                locale={locale}
              />
            </Suspense>
            ))}
          </FlexStyle>
          </FlipAnimation>
       
      </PokemonInfoStyle>
    </FadeAnimation>
  );
};

export default PokemonFamily;
