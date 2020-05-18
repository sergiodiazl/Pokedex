import styled from 'styled-components'

const FlexStyle=styled.div<{flexHeight?:string,flexWidth?:string,flexMinWidth?:string,flexPadding?:string,alignItems?:string,justifyContent?:string,wrapReverse?:boolean,mediaWs?:string,mediaWm?:string,mediaWl?:string,mediaWxl?:string,mediaHs?:string,mediaHm?:string,mediaHl?:string,mediaHxl?:string,fontSize?:string,fontSs?:string,fontSm?:string,fontSl?:string,fontSxl?:string}>`
    max-width:100%;
  
    display:flex;
    flex-direction:row;
    flex-wrap:${(props)=>props.wrapReverse!==undefined?'wrap-reverse':'wrap'};
   
    height:${(props)=>props.flexHeight!==undefined?props.flexHeight:'auto'};
    width:${(props)=>props.flexWidth!==undefined?props.flexWidth:'auto'};
    min-width:${(props)=>props.flexMinWidth!==undefined?props.flexMinWidth:'auto'};
    padding:${(props)=>props.flexPadding!==undefined?props.flexPadding:'0'};
    align-items:${(props)=>props.alignItems!==undefined?props.alignItems:'center'};
    
    ${(props)=>props.fontSize!==undefined?`font-size:${props.fontSize}`:''};
    
    justify-content:${(props)=>props.justifyContent!==undefined?props.justifyContent:'center'};
  
    @media (min-width: 400px) {
      ${(props)=>props.mediaWs!==undefined?`width:${props.mediaWs}`:''};
     ${(props)=>props.mediaHs!==undefined?`height:${props.mediaHs}`:''};
     ${(props)=>props.fontSs!==undefined?`font-size:${props.fontSs}`:''};
  }
  @media (min-width: 700px) {
    ${(props)=>props.mediaWm!==undefined?`width:${props.mediaWm}`:''};
     ${(props)=>props.mediaHm!==undefined?`height:${props.mediaHm}`:''};
     ${(props)=>props.fontSm!==undefined?`font-size:${props.fontSm}`:''};
  }
  @media (min-width: 1000px) {
    ${(props)=>props.mediaWl!==undefined?`width:${props.mediaWl}`:''};
     ${(props)=>props.mediaHl!==undefined?`height:${props.mediaHl}`:''};
     ${(props)=>props.fontSl!==undefined?`font-size:${props.fontSl}`:''};
  }
  @media (min-width: 2000px) {
    ${(props)=>props.mediaWxl!==undefined?`width:${props.mediaWxl}`:''};
     ${(props)=>props.mediaHxl!==undefined?`height:${props.mediaHxl}`:''};
     ${(props)=>props.fontSxl!==undefined?`font-size:${props.fontSxl}`:''};
  }
    
  `
//${(props)=>props.flexHeight!==undefined?`height:${props.flexHeight}`:'auto'};
export const ColumnFlexStyle=styled(FlexStyle)`
    flex-direction:column;
    

`
export const ColumnToRowFlexStyle=styled(ColumnFlexStyle)`
    @media (min-width: 400px) {
     flex-direction:row;
   } 
    

`
export const RowToColumnFlexStyle=styled(FlexStyle)`
    @media (min-width: 400px) {
     flex-direction:column;
   } 
    

`
export default FlexStyle