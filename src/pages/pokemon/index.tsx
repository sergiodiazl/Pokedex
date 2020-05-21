import React from 'react';
import PokemonInfo from '../../components/pokemonInfo';
import { useParams, Redirect } from 'react-router-dom';
import { AppContextConsumer } from '../../contexts/appContext';

interface Props {}
const Pokemon = (props: Props) => {
  const { name } = useParams();

  return (
    <AppContextConsumer>
      {(context) => {
        const { totalPokemon } = context!;
        if (isNaN(name)) {
          return <Redirect to="/notFound" />;
        }

        if (name < 1 || name > totalPokemon) {
          return <Redirect to="/notFound" />;
        }
        return <PokemonInfo name={name} />;
      }}
    </AppContextConsumer>
  );
};

export default Pokemon;
