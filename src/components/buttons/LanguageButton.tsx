import React from 'react';
import FlexStyle from '../../styles/FlexStyle';
import { AppContextConsumer } from '../../appContext';
import { LanguageButtonStyle, } from '../../styles/ButtonStyle';
import useLocalStorage from '../../hooks/useLocalStorage';



const locales = [
  { name: 'Español', value: 'es' },
  { name: 'English', value: 'en' },
  { name: 'Deustch', value: 'de' },
  {name:`
  日本語`,value:'ja'}
];
interface Props{}
interface LocaleOptionsProps {

}
interface LocaleOptionProp{
  setLocale:Function
 
  locale:{name:string
  value:string}
}
const LocaleOptionsButton =(props:LocaleOptionProp)=>{
  const{locale,setLocale}=props 
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const[storedLocale,setStoredLocale]=useLocalStorage('locale','en')
  const handleClick=(event: React.MouseEvent<HTMLButtonElement>)=>{
    setLocale(locale.value)
    setStoredLocale(locale.value)
    event.currentTarget.blur()
  }
  return(
  <LanguageButtonStyle onClick={handleClick}>{locale.name}</LanguageButtonStyle>
  )  
}
const LocaleOptionsButtons =(props:LocaleOptionsProps)=>{

  return(
    <AppContextConsumer>
    {context=>{
     
      return   ( locales.map(locale=>
      <LocaleOptionsButton key={locale.name} 
      setLocale={context!.setLocale} locale={locale}/>))
   
    }
   
    }
    </AppContextConsumer>
  )
}
const LanguageButton = (props: Props) => {
 
  return (
 
    <FlexStyle flexWidth='100%'>
  
   <LocaleOptionsButtons / >
       
   
       
        
    </FlexStyle>
   
  );
};

export default LanguageButton;
