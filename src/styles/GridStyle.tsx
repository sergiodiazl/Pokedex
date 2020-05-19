import styled from "styled-components";

export const GridStyle=styled.div<{gridWidth?:string,gtColumn?:string ,gtRow?:string}>`
    display: grid;
    width:100%;
        grid-auto-rows:1fr;

        grid-template-columns:repeat(auto-fill,minmax(120px, 1fr));
        grid-gap:3px;
        align-items: center;
  justify-items: center; 
  @media (min-width: 400px) {
    grid-template-columns:repeat(auto-fill,minmax(130px, 1fr));
   }
   @media (min-width: 700px) {
    grid-template-columns:repeat(auto-fill,minmax(170px, 1fr));
   }
   @media (min-width: 1000px) {
    grid-template-columns:repeat(auto-fill,minmax(280px, 1fr));
   }
`

export const OuterGrid=styled(GridStyle)`
grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
`

export const InnerGrid=styled(GridStyle)`

grid-template-columns: 1fr 1fr;
`