import * as React from 'react';




export const initialAppContext = {
  totalPokemon:807,
  lightMode: true,
    setLightMode: (light:boolean) => { initialAppContext.lightMode= light },
    locale: 'es',
    setLocale: (newLocale: string) => { initialAppContext.locale = newLocale},
}
export type AppContextInterface = typeof initialAppContext;

const appCtx = React.createContext<AppContextInterface | null>(null);

export const AppContextProvider = appCtx.Provider;

export const AppContextConsumer = appCtx.Consumer;