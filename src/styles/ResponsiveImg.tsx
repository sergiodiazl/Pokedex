import styled from 'styled-components'




export const ResponsiveImg=styled.img<{imgWidth?:string}>`
   width:${(props)=>props.imgWidth!==undefined?props.imgWidth:'100%'};
   display:block;
    height:auto;

`
export const PreviewImg=styled.img`
  width:80%;
   display:block;
    height:80%;

`
export default ResponsiveImg