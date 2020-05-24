import 'styled-components'

// and extend them!
declare module 'styled-components' {

  export interface DefaultTheme {
    dark:boolean,
  gradient: string,
    colors: {
      body:string
      card:string
      main: string
      secondary: string
      layoutBlock:string,
      mainShadow:string
      secondaryShadow:string
      typedItemShadow:string
      
   
    }
  }
}