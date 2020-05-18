import styled, { Keyframes, css } from 'styled-components'
import FlexStyle from'./FlexStyle'
const CardStyle=styled(FlexStyle)<{mainAnimation?:Keyframes,hoverAnimation?:Keyframes,fontSize?:string,imgBg?:string}>`
   
    background:${({ theme }) => theme.colors.card};
    padding:${(props)=>props.flexPadding!==undefined?props.flexPadding:'5%'};
    margin:1rem 0.5rem;
    border: 2px solid #cc8ea259;
  border-radius: 3px;
  box-shadow:  ${({ theme }) => `0 4px 8px 0 ${theme.colors.mainShadow}`};
   overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  word-break: break-word;
  hyphens: auto;
 
  & img{
    background:${(props)=>props.imgBg!==undefined?`${props.imgBg}`:'#cc8ea259'};
    border-radius:50%;
    animation:${(props)=>props.mainAnimation!==undefined?css`${props.mainAnimation} 2s linear infinite`:'none'};
    transition:animation 0.5s linear 
     }
     &:hover img{
   
    animation:${(props)=>props.hoverAnimation!==undefined?css`${props.hoverAnimation} 2s linear infinite`:'none'};
     }
  
   
     
 
  `

export default CardStyle