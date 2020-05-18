import { Localized } from './../types/toLocalize.d';
import {getProperty} from '../utils/objectUtils'

export const localizeApiresponse=(textArray:Array<Localized>,locale:string,key:string)=>{
    
    if(textArray!==undefined){
        let localizedResponse=textArray.find(text=>text.language.name===locale)
        
        if( localizedResponse===undefined && locale==='ja'){
            
                //algunos elementos en japones la api tienen dos traducciones
                //cuando tienen una traduccion aparecen como idioma -ja
                //cuando tienen dos traducciones aparecen como idioma -ja-hrkt y ja-Kj
                //se selecciona el idioma ja-hrkt 
                localizedResponse =textArray.find(text=>text.language.name==='ja-Hrkt')
                
               
        }

       
        return getProperty(localizedResponse!,key)

    }else{
        return null
    }
    
}