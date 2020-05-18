import React, { useEffect } from 'react'
import { AppContextConsumer } from '../../appContext'
import { PokemonContextConsumer } from '../../contexts/pokemonContext'
import {AbilitiesEntity}from '../../types/pokemonPreviewDetails'
import { fetchDetail } from '../../utils/pokemonData'

import { localizeApiresponse } from '../../locale/localizeApiTexts'
import { useState } from 'react'
import PokemonInfoStyle from '../../styles/PokemonInfoStyle'
import FlexStyle, { ColumnFlexStyle } from '../../styles/FlexStyle'
import { localizeAppTexts } from '../../locale/localizeAppTexts'
interface Props {
    
}
interface AbilityProps{
info : AbilitiesEntity
locale:string
}
const Ability =(props:AbilityProps)=>{
    const {info,locale}=props
    const{ability,is_hidden}=info
    const{name,url}=ability
    const[localName,setLocalName]=useState(name)
    const [localFlavorText, setlocalFlavorText] = useState('')
    useEffect(() => {
        const fetchAbilityDetails = async () => {
            const abilityDetails= await fetchDetail(url);
            
            const lName=localizeApiresponse(abilityDetails.names,locale,'name')
            const lFlavor=localizeApiresponse(abilityDetails.flavor_text_entries,locale,'flavor_text')
            setLocalName(lName!);
            setlocalFlavorText(lFlavor!)
          };
          fetchAbilityDetails();
    }, [url,locale])
    return(
        <ColumnFlexStyle flexWidth='100%'alignItems='flex-start'>
            
            <h3>{localName} {is_hidden?`★`:null}</h3>
            <p>
            {localFlavorText}
            </p>
            
        </ColumnFlexStyle>
    )
}
const Abilities = (props: Props) => {
    return (
        <AppContextConsumer>{
            context=>{
                const {locale}=context!
                const{abilityTitle}=localizeAppTexts(locale)
                return(
                    <PokemonContextConsumer>
                        
                        {
                            context=>{
                                const {abilities}=context!
                                return (
                                   <PokemonInfoStyle as='section'>
                                       
                                  

                                   <h2>{abilityTitle}</h2>
                               
                                   <FlexStyle justifyContent='space-around'flexWidth='100%'>
                                   
                                   
                                        
                                   {
                                            abilities!.map(
                                                (abi)=><Ability locale={locale}key ={abi.slot+'ability'}info={abi}/>
                                            )
                                       } 
                                       
                                   </FlexStyle>
                                   
                                      
                                   </PokemonInfoStyle>
                                )
                            }
                        }
                       
                    </PokemonContextConsumer>
                )
            }
            
            }
            
        </AppContextConsumer>
    )
}

export default Abilities
