import { PokemonCombinedData } from './../types/pokemonCombinedData.d';
import * as React from 'react';




const pokemonCtx = React.createContext<PokemonCombinedData | null>(null);

export const PokemonContextProvider = pokemonCtx.Provider;

export const PokemonContextConsumer = pokemonCtx.Consumer;