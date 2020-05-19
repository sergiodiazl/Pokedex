import styled from 'styled-components'
import FlexStyle from './FlexStyle'



export const PokemonInfoStyle=styled(FlexStyle)`

    
    font-family: 'pressStart','jackey',BlinkMacSystemFont,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    overflow-wrap: break-word;
    width:100%;
  word-wrap: break-word;
  word-break: break-all;
  word-break: break-word;
  hyphens: auto;
  font-size:8px;
    justify-content:flex-start;
    & >h2{
        color:green;
        width:100%;
    }
    & >h3{
    
     
    }
    & > * {
       
        overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  word-break: break-word;
  hyphens: auto;
    }
    @media (min-width: 400px) {
      font-size:12px;
        & >h2{
        
   
   } 
  }
  @media (min-width: 700px) {
    font-size:15px;
    & >h2{
  
   } 
  }
  @media (min-width: 1000px) {
    font-size:18px;
    & >h2{
   
   } 
  }
  @media (min-width: 2000px) {
    font-size:25px;
    & >h2{

   } 
  }

`
export default PokemonInfoStyle