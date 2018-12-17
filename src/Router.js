import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import Introduction from './components/Introduction';
import Main from './components/Main';
import i18n from './i18n';

addLocaleData([...en, ...fr]);

const locale =
  (navigator.language && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage ||
  'en-US';

export default () => {
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  return (
    <IntlProvider locale={locale} messages={i18n['fr-FR'] || i18n['en-US']}>
      {code && error !== 'access_denied' ? (
        <BrowserRouter basename={process.env.REACT_APP_BASENAME || '/'}>
          <Route render={() => <Main code={code} />} />
        </BrowserRouter>
      ) : (
        <Introduction
          onStart={() =>
            window.open(
              `https://www.strava.com/oauth/authorize?client_id=${
                process.env.REACT_APP_STRAVA_ID
              }&redirect_uri=${
                process.env.REACT_APP_STRAVA_REDIRECT_URI
              }&response_type=code&approval_prompt=auto&scope=profile:read_all,activity:read_all`,
              '_self'
            )
          }
        />
      )}
    </IntlProvider>
  );
};
