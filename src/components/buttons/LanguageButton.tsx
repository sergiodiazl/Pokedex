import React from 'react';
import { v4 as uuid } from 'uuid';
import FlexStyle from '../../styles/FlexStyle';
import { AppContextConsumer } from '../../contexts/appContext';
import { LanguageButtonStyle } from '../../styles/ButtonStyle';
import useLocalStorage from '../../hooks/useLocalStorage';

const locales = [
  { name: 'Español', value: 'es' },
  { name: 'English', value: 'en' },
  { name: 'Deustch', value: 'de' },
  {
    name: `
  日本語`,
    value: 'ja',
  },
];
interface LocaleOptionProp {
  setLocale: Function;

  locale: { name: string; value: string };
}
const LocaleOptionsButton :React.FC<LocaleOptionProp>= (props: LocaleOptionProp) => {
  const { locale, setLocale } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [storedLocale, setStoredLocale] = useLocalStorage('locale', 'en');
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLocale(locale.value);
    setStoredLocale(locale.value);
    event.currentTarget.blur();
  };
  return (
    <LanguageButtonStyle onClick={handleClick}>
      {locale.name}
    </LanguageButtonStyle>
  );
};
const LocaleOptionsButtons:React.FC = () => {
  return (
    <AppContextConsumer>
      {(context) => {
        const buttonArrayId: string = uuid();
        return locales.map((locale) => (
          <LocaleOptionsButton
            key={`${locale.name}${buttonArrayId}`}
            setLocale={context!.setLocale}
            locale={locale}
          />
        ));
      }}
    </AppContextConsumer>
  );
};
const LanguageButton:React.FC = () => {
  return (
    <FlexStyle flexWidth="100%">
      <LocaleOptionsButtons />
    </FlexStyle>
  );
};

export default LanguageButton;
