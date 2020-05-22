import React, { lazy, Suspense, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Loading from '../loading';
import axios from 'axios';
import FlexStyle from '../../styles/FlexStyle';
import { AppContextConsumer } from '../../contexts/appContext';
const PokemonPreview = lazy(() => import('../pokemonPreview'));
interface Props {
  page: number;
  maxPokemon: number;
}
interface BasicPokemonInfo {
  name: string;
  url: string;
}

const PokemonList = (props: Props) => {
  document.title = 'Pokemon';
  const [pokemonList, setPokemonList] = useState([] as Array<BasicPokemonInfo>);
  const { page, maxPokemon } = props;
  const offset = (page - 1) * 5;

  const showPokemon = (pokemonId: number) => {
    return pokemonId < maxPokemon;
  };
  const pokemonListFiltered = pokemonList.filter((pokemon, index) =>
    showPokemon(offset + index)
  );

  useEffect(() => {
    let isMounted = true;
    const fetchPokemonList = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=5`
      );
      if (isMounted) {
        setPokemonList(response.data.results);
      }
    };

    fetchPokemonList();
    return () => {
      isMounted = false;
    };
  }, [offset]);
  const previewArrayId: string = uuid();
  return (
      <FlexStyle flexWidth="100%" flexHeight="100%" justifyContent="center">
      <Suspense fallback={<Loading />}>
        {pokemonListFiltered.length > 0 ? (
          pokemonListFiltered.map((pokemon, index) => {
            return (
         
  
             <AppContextConsumer key={`${pokemon!.name!}${previewArrayId}`}>
                {(context) => {
                  const { locale } = context!;

                  return (
                        <PokemonPreview locale={locale!} name={pokemon!.name!} />
                    );
                }}
              </AppContextConsumer>
          
           );
          })
        ) : (
          <Loading />
        )}
      </Suspense>
    </FlexStyle>
  );
};

export default PokemonList;
