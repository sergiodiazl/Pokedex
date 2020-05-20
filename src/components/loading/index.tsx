import React from 'react'
import ResposiveImg from'../../styles/ResponsiveImg'
import LoadingGif from '../../assets/img/loading.gif'
import { AppContextConsumer } from '../../appContext'
import { localizeAppTexts } from '../../locale/localizeAppTexts'
import FlexStyle from '../../styles/FlexStyle'
interface Props {
    
}

const Loading = (props: Props) => {
    return (
       <AppContextConsumer>
{context=>{
    const {locale}=context!
    const {loadingText}=localizeAppTexts(locale)
    return( <FlexStyle>
           <ResposiveImg src ={LoadingGif}imgWidth='60%'/>

          <p>{loadingText}</p> 
    </FlexStyle>)
}}

       </AppContextConsumer>
    )
}

export default Loading
