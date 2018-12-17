import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Introduction from './components/Introduction';
import Main from './components/Main';

export default () => {
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (code && error !== 'access_denied') {
    return (
      <BrowserRouter>
        <Route render={() => <Main code={code} />} />
      </BrowserRouter>
    );
  }
  return (
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
  );
};
