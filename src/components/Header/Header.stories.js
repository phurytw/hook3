import React from 'react';
import { IntlProvider } from 'react-intl';
import { withRouter, BrowserRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import HeaderBase from './Header';
import Container from '../Container';
import i18n from '../../i18n';

export const headerProps = {
  athleteId: 28445856,
  profilePicture:
    'https://dgalywyr863hv.cloudfront.net/pictures/athletes/28445856/8537819/1/large.jpg',
  fullName: 'François Nguyen',
};

const Header = withRouter(HeaderBase);

storiesOf('Layout: Header', module)
  .addDecorator((story, context) =>
    withConsole()(() => (
      <IntlProvider locale="en-US" messages={i18n['en-US']}>
        <BrowserRouter>
          <Container>{story()}</Container>
        </BrowserRouter>
      </IntlProvider>
    ))(context)
  )
  .add('default', () => <Header {...headerProps} />);
