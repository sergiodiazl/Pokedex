import React, { FormEvent} from 'react'
import { AppContextConsumer } from '../../appContext'
import FlexStyle, { ColumnFlexStyle } from '../../styles/FlexStyle'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { SearchButtonStyle } from '../../styles/ButtonStyle'
import { InputStyle } from '../../styles/InputStyle'
import RandomPokemonButton from './RandomPokemonButton'
import { localizeAppTexts } from '../../locale/localizeAppTexts'

interface Props {
    
}

const SearchButton = (props: Props) => {
    const[searchNumber,setSearchNumber]=useState('')
    const [searchReady,setSearchReady]=useState(false)
    console.log('render start form')
    const handleChange=(event:FormEvent<HTMLInputElement>)=>{
      const newNumber=event.currentTarget.value
      setSearchNumber(newNumber)
    }
    const search=(event:FormEvent)=>{
      
        
       setSearchReady(true)
       event.preventDefault()
    }
    
    return (
        <AppContextConsumer>
            {context=>{
                const{locale}=context!
                const{searchTitle,searchButton,searchPlaceHolder}=localizeAppTexts(locale)
                return(
                  <>
                    {searchReady?<Redirect to={`/pokemon/${searchNumber}`}/>:  
                    <FlexStyle flexWidth='100%'>
                        <form onSubmit={search}>
                            <ColumnFlexStyle flexWidth='100%'  justifyContent='flex-start'>
                            <label htmlFor='pokemonNumber'>
                                {searchTitle}
                            </label>
                            <InputStyle type='number'
                            id='pokemonNumber'
                            name='pokemonNumber'
                            placeholder={searchPlaceHolder}
                            onChange={handleChange}
                            value={searchNumber}
                            >
                            </InputStyle>
                            </ColumnFlexStyle>
                            <SearchButtonStyle type='submit'value ={searchButton} disabled={searchNumber===''}/>  
                           
                            <RandomPokemonButton/>

                           
                        </form>
                      

                    </FlexStyle>}

                  </>
                )
            }}
        </AppContextConsumer>
    )
}

export default SearchButton
