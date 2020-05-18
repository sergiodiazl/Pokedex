import React from 'react'
import PokemonInfo from '../../components/pokemonInfo'
import {  useParams } from 'react-router-dom'

interface Props  {
}
const Pokemon = (props: Props) => {
    
    const {name}= useParams();
    
  
   
    return (
      
         <PokemonInfo name={name}/>
       
    )
}

export default Pokemon
