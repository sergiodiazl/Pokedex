import React from 'react';
import { AppContextConsumer, } from '../../contexts/appContext';

import LayoutSyle, {
  HeaderStyle,
  FooterStyle,
 
} from '../../styles/LayoutStyle';
import LogoS from '../../assets/img/logo/logoS.png';
import Ash from'../../assets/img/ash.gif'
import GithubIcon from '../../assets/img/icons/github.png';

import { Link } from 'react-router-dom';

import FlexStyle, {
  ColumnFlexStyle,

} from '../../styles/FlexStyle';
import DarkModebutton from '../buttons/DarkModebutton';
import LanguageButton from '../buttons/LanguageButton';
import { localizeAppTexts } from '../../locale/localizeAppTexts';

import ResponsiveImg from '../../styles/ResponsiveImg';
import { ALinkStyle } from '../../styles/LinkStyle';
import { FadeAnimation } from '../../styles/Animations';
interface Props {}
const githubUrl = 'https://github.com/sergiodiazl/Pokedex';
const sergioUrl = 'https://sergiodl.com/';
const year = new Date().getFullYear();

//grid:auto width
const Layout: React.FC<Props> = (props) => {
  return (
    <AppContextConsumer>
      {(context) => {
        const { locale } = context!;
        const { footerText, githubText } = localizeAppTexts(locale!);
        return (
          <LayoutSyle>
            <HeaderStyle as="header">
              <FlexStyle
                flexWidth="100%"
                flexHeight='100%'
                mediaHm='80px'mediaHl='100px'
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <FlexStyle flexWidth='100%' flexHeight='100%'mediaWm='25%'>
                  <Link to="/">
                    <picture>
                      <ResponsiveImg imgWidth="100%" src={LogoS} alt="logo" />
                    </picture>
                  </Link>
                </FlexStyle>

                <FlexStyle flexWidth='100%' flexHeight='100%' mediaWm='70%' justifyContent='flex-end'>
                        <FlexStyle  flexWidth='100%' mediaWm='60%'mediaWl='40%' mediaWxl='30%'>
                              
                        <LanguageButton />    
                  </FlexStyle>
                 <FlexStyle  flexWidth='100%' mediaWm='40%' mediaWl='30%' mediaWxl='20%'>
               
                <DarkModebutton />
                        </FlexStyle>

                </FlexStyle>
               
              </FlexStyle>
            </HeaderStyle>
            <ColumnFlexStyle flexWidth="90%" as="main">
              {props.children}
            </ColumnFlexStyle>
            <FooterStyle as="footer">
            <FadeAnimation direction ='top'delay={250}cascade triggerOnce>
              <FlexStyle>
             
              <ALinkStyle href={sergioUrl} >
                  <FlexStyle>
                   
                    <ResponsiveImg
                      imgWidth="30px"
                      src={Ash}
                      alt="github"
                    />
                      {`Sergio D.L-${year}`}
                  </FlexStyle>
                </ALinkStyle>

                <div>{footerText}</div>
                <ALinkStyle href={githubUrl} >
                  <FlexStyle>
                    {githubText}
                    <ResponsiveImg
                      imgWidth="16px"
                      src={GithubIcon}
                      alt="github"
                    />
                  </FlexStyle>
                </ALinkStyle>
         
              </FlexStyle>
              </FadeAnimation>
            </FooterStyle>
          </LayoutSyle>
        );
      }}
    </AppContextConsumer>
  );
};

export default Layout;
/*
 <ALinkStyle href={sergioUrl}>
<ResponsiveImg
                      imgWidth="30px"
                      src={Ash}
                      alt="github"
                    />
              
                   
              
                   {`Sergio D.L-${year}`}
               
               
               </ALinkStyle>

               */