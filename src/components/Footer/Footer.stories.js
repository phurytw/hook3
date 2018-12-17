import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import Footer from './Footer';
import Container from '../Container';
import i18n from '../../i18n';

storiesOf('Layout: Footer', module)
  .addDecorator((story, context) =>
    withConsole()(() => (
      <IntlProvider locale="en-US" messages={i18n['en-US']}>
        <Container>{story()}</Container>
      </IntlProvider>
    ))(context)
  )
  .add('default', () => <Footer />);
