import styled from 'styled-components'
import {getProperty} from'../utils/objectUtils'
import FlexStyle from './FlexStyle'
const typeColors :object={
    'bug':'#A8B820',
    'dragon':'#7038F8',
    'dark':'#705848',
    'electric':'#F8D030',
    'fairy':'#EE99AC',
    'fighting':'#C03028',
    'fire':'#F08030',
    'flying':'#A890F0',
    'ghost':'#705898',
    'grass':'#78C850',
    'ground':'#E0C068',
    'ice':'#98D8D8',
    'normal':'#A8A878',
    'poison':'#A040A0',
    'psychic':'#F85888',
    'rock':'#B8A038',
    'steel':'#B8B8D0',
    'water':'#6890F0',
    
}
const getTypeColor=(name:string)=>{
    const typeColor=getProperty(typeColors,name)
    return typeColor
}
const TypedItemStyle=styled(FlexStyle)< {name:string,itemPadding?:string}>`
    
    margin:1% 2%;
    padding:${({itemPadding})=>itemPadding!==undefined?itemPadding:'5%'};
    border: 2px solid #cc8ea259;
    border-radius:5%;
    background:${({name})=>getTypeColor(name)};
    font-weight:bold;
    box-shadow:  ${({ theme }) => `0 2px 4px 0 ${theme.colors.mainShadow}`};;
    text-align:center;
    flex-grow:1;
   
   
    & {
       
       width:100%
     } 
    @media (min-width: 400px) {
        
        & *{
       
   
   } 
  }
  @media (min-width: 700px) {
    width:${({flexWidth})=>flexWidth!==undefined?flexWidth:'45%'};
  
 
    
   
  }
  @media (min-width: 1000px) {
    width:${({flexWidth})=>flexWidth!==undefined?flexWidth:'25%'};
  
   
   
   
  }
  @media (min-width: 2000px) {
  
    
 
  }

    
    
`  
export default TypedItemStyle