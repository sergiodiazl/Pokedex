import React, { MouseEvent } from 'react'
import { AppContextConsumer } from '../../contexts/appContext'

import LinkStyle from '../../styles/LinkStyle';
import { RandomButtonStyle } from '../../styles/ButtonStyle';
import { localizeAppTexts } from '../../locale/localizeAppTexts';
import ResponsiveImg from '../../styles/ResponsiveImg';
import Ditto from'../../assets/img/icons/ditto.gif'


const RandomPokemonButton:React.FC = () => {
    const randomUrl=(maxNumber:number)=>{
        const randomNumber=Math.floor(Math.random() * (maxNumber - 1) + 1); 
        const newUrl= `/pokemon/${randomNumber}`
        return newUrl
    }
    const handleClick=(e:React.MouseEvent<HTMLButtonElement>)=>{
     e.currentTarget.blur()
    }
  
    return (
        <AppContextConsumer>
            {context=>{
                const{totalPokemon,locale}=context!
                const{randomButton} =localizeAppTexts(locale)
                return(  
                    <LinkStyle to={randomUrl(totalPokemon)}> 
                    <RandomButtonStyle onClick={handleClick}type='button'>
                  
                    <ResponsiveImg imgWidth='20px'src={Ditto} alt={randomButton}/>
                     {randomButton}
                     </RandomButtonStyle>
                  </LinkStyle>     
                   
                  
               )
            }}
        </AppContextConsumer>
    )
}

export default RandomPokemonButton
