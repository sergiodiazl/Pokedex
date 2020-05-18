
import { Localized, LocalTexts } from './../types/toLocalize.d';
import {getProperty} from '../utils/objectUtils'
import  es from './es'
import en from './en'
import de from'./de'
import ja from'./ja'
const texts ={
    es,
    en,
    de,
    ja
}
export const localizeAppTexts=(locale:string):LocalTexts=>{
   
    const localizedTexts=getProperty(texts,locale)
   if(localizedTexts!==undefined  && localizedTexts!==null){
    return localizedTexts
}else{
    
    return getProperty(texts,'en')
}
   
}