
import { createGlobalStyle} from 'styled-components';
import JackeyWoff from'../assets/fonts/jackey.woff'

import PressStartWoff from'../assets/fonts/pressStart.woff'


/* css magia debug
  *{
   background: #000 !important;
   color: #0f0 !important;
   outline: solid #f00 1px !important;
}
*/

export const GlobalStyles = createGlobalStyle`
  
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

html{
  
}
  body {
   
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.main};
     max-width:100vw;
  
    margin: 0;
    padding: 0;
    font-family: 'pressStart','jackey', BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
    
  }
  
  h1{
    max-width:100%;
 
    text-align:center;
    font-family: 'pressStart','jackey',BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
 
  }

*{
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  word-break: break-word;
  hyphens: auto;
}
  @font-face {
        font-family: 'Jackey';
        src: local('jackey'), local('Jackey'),
        url(${JackeyWoff}) format('woff');
        font-weight: 800;
        font-style: normal;
    }

    @font-face {
        font-family: 'PressStart';
        src: local('pressStart'), local('PressStart'),
        url(${PressStartWoff}) format('woff');
        font-weight: 300;
        font-style: normal;
        unicode-range: U+00-FF;
    }
  `

