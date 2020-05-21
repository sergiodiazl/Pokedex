import styled from 'styled-components'
import FlexStyle from './FlexStyle'



export const PokemonInfoStyle=styled(FlexStyle)`

    
    font-family: 'pressStart','jackey',BlinkMacSystemFont,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    overflow-wrap: break-word;
    width:100%;
  

    justify-content:flex-start;
    h2{
        color:green;
        width:100%;
        font-size:16px
    }
    h3{
        width:100%;
        font-size:14px
    }
    &>*{
      font-size:12px
    }
    
 

`
export default PokemonInfoStyle