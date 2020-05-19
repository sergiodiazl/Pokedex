import React from 'react'
import { MainContentStyle } from '../../styles/LayoutStyle'
import { AppContextConsumer } from '../../appContext'
import { localizeAppTexts } from '../../locale/localizeAppTexts'
import notFoundImg from '../../assets/img/notFound.gif'
import ResponsiveImg from '../../styles/ResponsiveImg'
import RandomPokemonButton from '../../components/buttons/RandomPokemonButton'
import {Fade} from 'react-awesome-reveal'
interface Props {
    
}

const NotFound = (props: Props) => {
    return (
       
            <Fade>
                <MainContentStyle flexPadding='5%'>
            <AppContextConsumer>
             {context=>{
                const{locale}=context!
                const {notFoundTitle,notFoundText}=localizeAppTexts(locale)
            
                 return(<>
                 <h1>{notFoundTitle}</h1>
                 <ResponsiveImg imgWidth='40%' src={notFoundImg} alt={notFoundTitle}>
                 
                 </ResponsiveImg>
                 <p>{notFoundText}</p>
                 
                 <RandomPokemonButton/>
                 </>)
             }}
             </AppContextConsumer>
            </MainContentStyle>
            </Fade>
      
    )
}

export default NotFound
