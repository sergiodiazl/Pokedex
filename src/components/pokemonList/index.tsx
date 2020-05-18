import React, { useEffect, useState } from 'react';
import PokemonPreview from '../pokemonPreview';
import Loading from '../loading';
import axios from 'axios';
import FlexStyle, { ColumnFlexStyle } from '../../styles/FlexStyle';
import { AppContextConsumer } from '../../appContext';

interface Props {
  page: number
  maxPokemon:number
}
interface BasicPokemonInfo {
  name: string;
  url: string;
}

const PokemonList = (props: Props) => {
  const [pokemonList, setPokemonList] = useState([] as Array<BasicPokemonInfo>);
  const { page,maxPokemon } = props;
  const offset = (page - 1) * 5;
 
  const showPokemon=(pokemonId:number)=>{
    
      return pokemonId<maxPokemon
  }
  const pokemonListFiltered=pokemonList.filter((pokemon,index)=>(showPokemon(offset+index)))

  useEffect(() => {
    const fetchPokemonList = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=5`
      );
      setPokemonList(response.data.results);
    };

    fetchPokemonList();
  }, [offset]);
  return (
    <FlexStyle flexWidth='100%' flexHeight='100%' justifyContent='center'>
      
      {pokemonListFiltered.length>0 ? (
        pokemonListFiltered.map((pokemon,index) => {
         
          return(
            <AppContextConsumer>
              {context=>{
                const{locale}=context!
                return( <PokemonPreview
                  locale={locale!}
                  name={pokemon!.name!}
                  key={pokemon!.name!}
                
                />)
              }}
            </AppContextConsumer>
           
          )
        })
      ) : (
        <Loading />
      )}
    </FlexStyle>
  );
};

export default PokemonList;
