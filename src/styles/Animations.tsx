import styled, { keyframes } from 'styled-components'
import {Fade,Flip, Swing,Zoom}from'react-awesome-reveal/'

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
export const FadeAnimation=styled(Fade)<{divHeight?:string,divWidth?:string}>`
height:${({divHeight})=>divHeight!==undefined?divHeight:'auto'};
width:${({divWidth})=>divWidth!==undefined?divWidth:'auto'};



` 
export const FlipAnimation=styled(Flip)<{divHeight?:string,divWidth?:string}>`
    height:${({divHeight})=>divHeight!==undefined?divHeight:'auto'};
    width:${({divWidth})=>divWidth!==undefined?divWidth:'auto'};
` 
export const SwingAnimation=styled(Swing)<{divHeight?:string,divWidth?:string}>`
    height:${({divHeight})=>divHeight!==undefined?divHeight:'auto'};
    width:${({divWidth})=>divWidth!==undefined?divWidth:'auto'};
` 
export const ZoomAnimation=styled(Zoom)<{divHeight?:string,divWidth?:string}>`
    height:${({divHeight})=>divHeight!==undefined?divHeight:'auto'};
    width:${({divWidth})=>divWidth!==undefined?divWidth:'auto'};
` 