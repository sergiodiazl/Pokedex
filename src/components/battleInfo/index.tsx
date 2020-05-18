import React from 'react'
import Abilities from '../abilities'
import Stats from '../stats'
import Moves from '../moves'
import PokemonInfoStyle from '../../styles/PokemonInfoStyle'

interface Props {
    
}

const BattleInfo = (props: Props) => {
    return (
        <>
          <Stats/>

          
           <Moves/>
        </>
    )
}

export default BattleInfo
