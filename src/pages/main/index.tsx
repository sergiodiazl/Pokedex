import React from 'react';
import { useParams, Redirect } from 'react-router-dom';

import PokemonList from '../../components/pokemonList';
import { AppContextConsumer } from '../../contexts/appContext';
import Navigation from '../../components/navigation';

import { MainContentStyle } from '../../styles/LayoutStyle';

const Main:React.FC = () => {
  const { page: pageParam } = useParams();
  const currentPage = parseInt(pageParam);
  return (
    <AppContextConsumer>
      {(context) => {
        const { totalPokemon } = context!;
        const maxPage = Math.ceil(totalPokemon / 5);
        //segun la api hay 807 pokemon pero hay algunos con variantes especiales que los cuenta con numeros mas altos
        // y las paginas contienen5 pokemon

        if (isNaN(pageParam)) {
          return <Redirect to="/notFound" />;
        }

        if (pageParam < 1 || pageParam > maxPage) {
          return <Redirect to="/notFound" />;
        }

        return (
        
            <MainContentStyle flexWidth="100%" flexHeight="90%">
            <Navigation
              current={currentPage}
              place="/page/"
              maxPlace={maxPage}
            />
      
            <PokemonList page={pageParam} maxPokemon={totalPokemon} />
            
           
            <Navigation
              current={currentPage}
              place="/page/"
              maxPlace={maxPage}
            />
          </MainContentStyle>
      
        );
      }}
    </AppContextConsumer>
  );
};

export default Main;
