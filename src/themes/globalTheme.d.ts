import 'styled-components'

// and extend them!
declare module 'styled-components' {

  export interface DefaultTheme {
    dark:boolean,
    toggleBorder: string,
  gradient: string,
  gradientReverse:string,
    colors: {
      body:string
      card:string
      main: string
      secondary: string
      layoutBlock:string,
      mainShadow:string
      secondaryShadow:string
      typedItemShadow:string
      navButton:string
      navButtonDisabled:string
      backButton:string
    }
  }
}