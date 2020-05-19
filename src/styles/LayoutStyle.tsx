import styled from 'styled-components'
import { ColumnFlexStyle } from './FlexStyle'

export const LayoutBlockStyle=styled.div`
    background: ${({ theme }) => theme.colors.layoutBlock};
    width:100%;
    padding:1% 5%;
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    align-items:center;
    justify-content:center;
    overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  word-break: break-word;
  
  `
export const HeaderStyle=styled(LayoutBlockStyle)`
 padding:1% 1%;
`
export const FooterStyle=styled(LayoutBlockStyle)`
 max-height:30%;
 font-size:12px;
 text-align:center;
`
export const MainContentStyle=styled(ColumnFlexStyle)`
  background: ${({ theme }) => theme.colors.secondary};
  width: 100%;
  min-height: 90%;
  margin:1%;
  box-shadow:  ${({ theme }) => `0 4px 8px 0 ${theme.colors.secondaryShadow}`};;
`


const LayoutStyle=styled(ColumnFlexStyle)`
   
   min-height:100vh;
   main {
    flex-grow: 1;
}
   header,main,footer{
     flex-shrink:0;
   }
  
  `
  
export default LayoutStyle  

/*
 @media (min-width: 430px) {
      justify-content:space-between;
  }

  */