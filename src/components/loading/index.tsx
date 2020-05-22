import React from 'react';
import ResposiveImg from '../../styles/ResponsiveImg';
import LoadingGif from '../../assets/img/loading.gif';
import { AppContextConsumer } from '../../contexts/appContext';
import { localizeAppTexts } from '../../locale/localizeAppTexts';
import { ColumnFlexStyle } from '../../styles/FlexStyle';
interface Props {}

const Loading = (props: Props) => {
  return (
    <AppContextConsumer>
      {(context) => {
        const { locale } = context!;
        const { loadingText } = localizeAppTexts(locale);
        return (
          <ColumnFlexStyle flexHeight='100%'>
            <ResposiveImg src={LoadingGif} imgWidth="60%" />

            <p>{loadingText}</p>
          </ColumnFlexStyle>
        );
      }}
    </AppContextConsumer>
  );
};

export default Loading;
