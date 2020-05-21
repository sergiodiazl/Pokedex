import {getProperty} from './objectUtils'
import axios from 'axios'
export const correctFetch=(result:object)=>{
    const statusCode=getProperty(result,'status')
    return statusCode !==null || statusCode!==200

}
export const fetchPokemonPreviewData =async (name:string)=>{
    try{
        const preview = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${name}`
          )
          
        
        const previewData=preview.data
        return previewData
           
    }catch(error){
        return {result:{status:500}}
    }
}

export const fetchPokemonFullDetails=async(name:string)=>{
   try{
    let response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${name}`
      )
    let details =response.data
      return details 
   }catch(error){
    return {result:{status:500}}
   }
}

export const fetchDetail=async(url:string)=>{
    try{
     let response = await axios.get(url)
     let details =response.data
       return details 
    }catch(error){
        return {result:{status:500}}
       }
 }
 