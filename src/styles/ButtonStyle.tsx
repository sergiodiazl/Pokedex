import styled from 'styled-components'

const ButtonStyle=styled.button <{disabled?:boolean}>`
  
color: ${({ theme }) => theme.colors.main};  
  border:none;
  border-radius:3px;
  font-family: 'pressStart','jackey',BlinkMacSystemFont,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
  box-shadow:  ${({ theme }) => `0 4px 8px 0 ${theme.colors.mainShadow}`};;
  background: ${({ theme }) => theme.gradient};
  background-size:250% 100%;
  background-position:100% 50%;
  display: flex;
  justify-content:center;
  align-items:center;
  transition: 0.5s all  ;
  :hover {
    cursor:pointer;
    background-position:0% 50%;
    transition: 0.5s all  ;
}
:focus{
  outline:none;
  text-decoration:underline;
}

  `
export const ThemeToggleButtonStyle=styled(ButtonStyle)`
   
    height:2.5rem;
   
    
    flex-grow:1;
    overflow: hidden;
   
    img{
      height: auto;
    width: 2.5rem;
    transition: all 0.3s linear;
    
    // sun icon
    &:first-child {
      transform: ${({ theme }) => theme.dark ? 'translateY(0)' : 'translateY(100px)'};

    }
    
    // moon icon
    &:nth-child(3) {
      transform: ${({ theme }) => theme.dark ? 'translateY(-100px)' : 'translateY(0)'};
     
    
    }
    }
    :hover {
 
  cursor:pointer;

}

`
export const NavigationButtonStyle=styled(ButtonStyle)`
border-radius:50%;
height:30px;


:disabled{
  background:grey;
  pointer-events:none
}
`
export const RandomButtonStyle=styled(ButtonStyle)`
width:100%;
background: linear-gradient(29deg, rgba(109,56,144,1) 0%, rgba(187,140,190,1) 50%, rgba(109,56,144,1) 100%);
background-size:250% 100%;
  background-position:100% 50%;

&:hover>* {
    background-position:0% 50%;
    transition: 0.5s all  ;
}
`
export const LanguageButtonStyle=styled(ButtonStyle)`
flex: 1 1 0px;
font-size:8px;
height:2.5rem;

`
export const LanguageMenuButtonStyle=styled(LanguageButtonStyle)`
margin:2% 5%;
height:4rem;
img{

filter: invert(93%) sepia(86%) saturate(3%) hue-rotate(213deg) brightness(106%) contrast(96%);
}
`
export const SearchButtonStyle=styled.input.attrs({
  type:'submit'
})`
width:100%;
font-family: 'pressStart','jackey',BlinkMacSystemFont,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
   
color: ${({ theme }) => theme.colors.main};
border-radius:3px;
border:none;
background: ${({ theme }) => theme.gradient};
  background-size:250% 100%;
  background-position:100% 50%;
  :hover {
    cursor:pointer;
    background-position:0% 50%;
    transition: 0.5s all  ;
}
:disabled{
  background:grey;
}
`

export default ButtonStyle