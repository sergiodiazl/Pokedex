import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import Main from './pages/main';
import Pokemon from './pages/pokemon';
import { AppContextProvider, AppContextConsumer } from './contexts/appContext';

import { lightTheme } from './themes/light';
import { darkTheme } from './themes/dark';
import { GlobalStyles } from './themes/global';
import NotFound from './pages/notFound';
import Layout from './components/layout';

import useLocalStorage from './hooks/useLocalStorage';
import { ThemeProvider } from 'styled-components';

///
function AppSwitch() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Switch>
      <Route exact path="/">
        <Redirect from="/" to="/page/1" />
      </Route>
      <Route path="/page/:page" component={Main} />
      <Route path="/pokemon/:name" component={Pokemon} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const totalPokemon = 807;
  const [page, setPage] = useState(1);
  const [storedLightMode] = useLocalStorage('lightMode', false);
  const [storedLocale] = useLocalStorage('locale', 'en');
  const [lightMode, setLightMode] = useState(storedLightMode);
  const [locale, setLocale] = useState(storedLocale);
  const initialAppContext = {
    totalPokemon,
    page,
    setPage,
    lightMode,
    setLightMode,
    locale,
    setLocale,
  };

  return (
    <AppContextProvider value={initialAppContext}>
      <AppContextConsumer>
        {(context) => (
          <ThemeProvider theme={context!.lightMode ? lightTheme : darkTheme}>
            <GlobalStyles />
            <Router>
              <Layout>
                <AppSwitch />
              </Layout>
            </Router>
          </ThemeProvider>
        )}
      </AppContextConsumer>
    </AppContextProvider>
  );
}

export default App;
