import React,{useState} from 'react';
import {BrowserRouter as Router,Switch,Route, Redirect, useLocation} from 'react-router-dom'
import Main from './pages/main'
import Pokemon from './pages/pokemon'
//import useLocalStorage from './hooks/useLocalStorage'
import {AppContextProvider, AppContextConsumer}from './appContext'
import styled, {ThemeProvider}from 'styled-components'
import {lightTheme} from './themes/light'
import {darkTheme} from './themes/dark'
import {GlobalStyles} from './themes/global'
import NotFound from './pages/notFound';
import Layout from './components/layout';


import { TransitionGroup, CSSTransition } from "react-transition-group";

import useLocalStorage from './hooks/useLocalStorage';

///rutas
function AppSwitch(){
  const appLocation=useLocation()
  
  return(
<Wrapper>

<TransitionGroup className="transition-group">
     <CSSTransition
     key={appLocation.key}
     timeout={{ enter: 300, exit: 300 }}
          classNames={"fade"}
     >
       <section className='route-section'>
       <Switch>
           <Route exact path='/'>
             <Redirect from='/' to='/page/1'/>
           </Route>
           <Route path='/page/:page'component={Main}/>
           <Route path ='/pokemon/:name' component ={Pokemon}/>
           <Route  component ={NotFound}/>
         </Switch>

       </section>
    
     </CSSTransition>
   </TransitionGroup>
</Wrapper>
  )
}


const Wrapper = styled.div`
.fade-enter {
        opacity: 0.01;
    }
    .fade-enter.fade-enter-active {
        opacity: 1;
        transition: opacity 300ms ease-in;
    }
    .fade-exit {
        opacity: 1;
    }
      
    .fade-exit.fade-exit-active {
        opacity: 0.01;
        display:none;
        transition: opacity 300ms ease-in;
    }
    div.transition-group {
         position:relative;
      }
      section.route-section {
        position: relative;
        width: 100%;
        top: 0;
        left: 0;
      }
`;


//////////////////////////////
function App() {
  const totalPokemon=807
  const [page,setPage]=useState(1)
  const [storedLightMode]=useLocalStorage('lightMode',false)
  const[storedLocale]=useLocalStorage('locale','en')
  const [lightMode,setLightMode]=useState(storedLightMode)
  const[locale,setLocale]=useState(storedLocale)
  const initialAppContext={totalPokemon,page,setPage,lightMode,setLightMode,locale,setLocale}
 // const [context]=useLocalStorage('context',initialAppContext)
  //const location =useLocation()

  return (
    

<AppContextProvider value={initialAppContext}>
      <AppContextConsumer>{
        context=>(
          <ThemeProvider theme={context!.lightMode?lightTheme:darkTheme}>

           <GlobalStyles/>                                                                                                                                                                
          <Router>
          <Layout>
          <AppSwitch/>
          </Layout>
         </Router>
      
         </ThemeProvider>
        
        )
        
        }


      </AppContextConsumer>
   
    </AppContextProvider>
    
  );
}

export default App;
