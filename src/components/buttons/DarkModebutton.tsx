import React from 'react'
import { AppContextConsumer, AppContextInterface } from '../../contexts/appContext'
import { ThemeToggleButtonStyle } from '../../styles/ButtonStyle'

import SunIcon from '../../assets/img/icons/sun.png'

import MoonIcon from '../../assets/img/icons/moon.png'
import { localizeAppTexts } from '../../locale/localizeAppTexts'
import ResponsiveImg from '../../styles/ResponsiveImg'
import useLocalStorage from '../../hooks/useLocalStorage'
interface Props {
    
}


const DarkModebutton = (props: Props) => {
      
    const[storedLightMode,setStoredLightMode]=useLocalStorage('lightMode',true)
   
    
    return (
        <AppContextConsumer>
        {context=>{
            const {locale,lightMode}=context!
                        
            const {darkModeText,lightModeText}=localizeAppTexts(locale!)
            const toggleLightMode=(context:AppContextInterface)=>{
      
                context!.setLightMode(!storedLightMode)
                setStoredLightMode(!storedLightMode)  
            }
            const handleClick=(event:React.MouseEvent<HTMLButtonElement>)=>{
                    event.currentTarget.blur()
                    toggleLightMode(context!)

            }
    return ( <ThemeToggleButtonStyle  onClick={handleClick}>
                <ResponsiveImg src={SunIcon} alt='light'/>
        <div>{lightMode?darkModeText:lightModeText}</div>
                <ResponsiveImg src={MoonIcon} alt='dark'/>
                
                </ThemeToggleButtonStyle>
        )

        }
           }
    </AppContextConsumer>
    )
}

export default DarkModebutton
