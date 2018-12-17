import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import Introduction from './Introduction';
import i18n from '../../i18n';

storiesOf('Screen: Introduction', module)
  .addDecorator((story, context) =>
    withConsole()(() => (
      <IntlProvider locale="en-US" messages={i18n['en-US']}>
        {story()}
      </IntlProvider>
    ))(context)
  )
  .add('default', () => <Introduction />);
