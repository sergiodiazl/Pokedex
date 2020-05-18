export const getProperty=(object:object,key:string):any=>{
    if (hasKey(object,key)){
        return object[key]
    }
    return null
}
export function hasKey<O>(obj: O, key: keyof any): key is keyof O {
    return key in obj
  }

export const isEmpty =(object:object)=>{
  return Object.keys(object).length===0
}  