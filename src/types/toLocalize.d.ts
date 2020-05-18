interface Language {
    name:string
    url:string
}
export interface Localized extends object{
  language:Language
  name?:string
}

export interface LocalTexts extends object{
  darkModeText:string
  lightModeText:string
  abilityTitle:string
  movesTitle:string
  familyTitle?:string
  storyTitle:string
  statTitle:string
  typesTitle:string
  footerText:string
  notFoundTitle:string
  notFoundText:string
  backButton:string
  searchTitle?:string
  searchPlaceHolder?:string
  searchButton?:string
  randomButton?:string
  githubText?:string

}