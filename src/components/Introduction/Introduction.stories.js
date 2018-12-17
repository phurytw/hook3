import React from 'react';
import { storiesOf } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import Introduction from './Introduction';

storiesOf('Screen: Introduction', module)
  .addDecorator((story, context) => withConsole()(story)(context))
  .add('default', () => <Introduction />);
