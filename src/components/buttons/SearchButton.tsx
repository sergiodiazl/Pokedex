import React, { FormEvent, useEffect } from 'react';
import { AppContextConsumer } from '../../contexts/appContext';
import FlexStyle, { ColumnFlexStyle } from '../../styles/FlexStyle';
import { useState } from 'react';
import {  useHistory } from 'react-router-dom';
import { SearchButtonStyle } from '../../styles/ButtonStyle';
import { InputStyle } from '../../styles/InputStyle';
import RandomPokemonButton from './RandomPokemonButton';
import { localizeAppTexts } from '../../locale/localizeAppTexts';

interface Props {}

const SearchButton = (props: Props) => {
  const [searchNumber, setSearchNumber] = useState('');
  const [searchReady, setSearchReady] = useState(false);
  const routerHistory = useHistory();
  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const newNumber = event.currentTarget.value;
    console.log(newNumber.length)
    setSearchNumber(newNumber);
  };
  const search = (event: React.FormEvent<HTMLFormElement>) => {
    const searchUrl = `/pokemon/${searchNumber}`;
    routerHistory.push(searchUrl);
    event.currentTarget.blur()
    event.preventDefault();
  };
  useEffect(() => {
    if (searchNumber.length === 0) {
      setSearchReady(true);
    } else {
      setSearchReady(false);
    }
  }, [searchNumber]);
  return (
    <AppContextConsumer>
      {(context) => {
        const { locale } = context!;
        const {
          searchTitle,
          searchButton,
          searchPlaceHolder,
        } = localizeAppTexts(locale);
        return (
          <>
            <FlexStyle flexWidth="100%">
              <form onSubmit={search}>
                <ColumnFlexStyle flexWidth="100%" justifyContent="flex-start">
                  <label htmlFor="pokemonNumber">{searchTitle}</label>
                  <InputStyle
                    type="number"
                    id="pokemonNumber"
                    name="pokemonNumber"
                    min="1"
                    placeholder={searchPlaceHolder}
                    onChange={handleChange}
                    value={searchNumber}
                  ></InputStyle>
                </ColumnFlexStyle>
                <SearchButtonStyle
                  type="submit"
                  value={searchButton}
                  disabled={searchReady}
                />

                <RandomPokemonButton />
              </form>
            </FlexStyle>
          </>
        );
      }}
    </AppContextConsumer>
  );
};

export default SearchButton;
/*


const SearchForm = (props: Props) => {
  const [searchNumber, setSearchNumber] = useState('');
  const [searchReady, setSearchReady] = useState(false);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const newNumber = event.currentTarget.value;
    setSearchNumber(newNumber);
  };
  const search = (event: FormEvent) => {
   
    setSearchReady(true);
    event.preventDefault();
   
  };
  return(
      <form onSubmit={search}>
                
                    <label htmlFor="number">search by number</label>
                    <InputStyle
                      type="number"
                      id="number"
                      name="pokemonNumber"
                     
                      onChange={handleChange}
                      value={searchNumber}
                    ></InputStyle>
                 
                  <SearchButtonStyle
                    type="submit"
                    value={searchButton}
                    disabled={searchNumber === ''}
                  />

                </form>
  )


              */
