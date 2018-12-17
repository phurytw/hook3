import React from 'react';
import { storiesOf } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import Footer from './Footer';
import Container from '../Container';

storiesOf('Layout: Footer', module)
  .addDecorator((story, context) =>
    withConsole()(() => <Container>{story()}</Container>)(context)
  )
  .add('default', () => <Footer />);
