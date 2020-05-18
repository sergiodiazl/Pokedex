import styled from 'styled-components'
import {Link}from 'react-router-dom'
const LinkStyle=styled(Link)`
    color: ${({ theme }) => theme.colors.main};
    text-decoration:none;
    & :visited {
        color: ${({ theme }) => theme.colors.main};
    }
  `
export const ALinkStyle=styled.a`
color: green;
text-decoration:none;
transition:0.5 all linear;
& :visited {
    color: green;
}
& :hover {
    color:purple;
}
`

export default LinkStyle