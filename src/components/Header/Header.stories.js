import React from 'react';
import { storiesOf } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import Header from './Header';
import Container from '../Container';

export const headerProps = {
  athleteId: 28445856,
  profilePicture:
    'https://dgalywyr863hv.cloudfront.net/pictures/athletes/28445856/8537819/1/large.jpg',
  fullName: 'François Nguyen',
};

storiesOf('Layout: Header', module)
  .addDecorator((story, context) =>
    withConsole()(() => <Container>{story()}</Container>)(context)
  )
  .add('default', () => <Header {...headerProps} />);
