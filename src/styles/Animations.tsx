import styled, { keyframes } from 'styled-components'
import {Fade,Flip}from'react-awesome-reveal'

export const WalkAnimation=keyframes`
   
    0%{
        transform:translateX(0%)
    }

    25%{
        transform:translateX(-10%)
    }
    50%{
        transform:translateX(0)
    }
    75%{
        transform:translateX(10%)
    }
    100%{
        transform:translateX(0)
    }
  `

export const ShakeAnimation=keyframes`
   
    0%{
        transform:skewX(0deg)
    }

    25%{
        transform:skewX(-15deg)
    }
    50%{
        transform:skewX(0deg)
    }
    75%{
        transform:skewX(15deg)
    }
    100%{
        transform:skewX(0deg)
    }
  `
export const FadeAnimation=styled(Fade)`
width:100%;
height:100%;

`
export const FlipAnimation=styled(Flip)`
width:100%;
height:100%;
` 
export const PageTransition=styled.div`

 .fade-enter {
        opacity: 0.01;
    }
    .fade-enter.fade-enter-active {
        opacity: 1;
        transition: opacity 300ms ease-in;
    }
    .fade-exit {
        opacity: 1;
    }
      
    .fade-exit.fade-exit-active {
        opacity: 0.01;
        transition: opacity 300ms ease-in;
    }
    
    div.transition-group {
           position: relative;
     
           background: green;
      }
      section.route-section {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
      }  

`