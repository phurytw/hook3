import React from 'react';
import { storiesOf } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import Highlight from './Highlight';

export const highLightProps = {
  renderTitle: () => (
    <span>
      Highlight <strong>title</strong>
    </span>
  ),
  renderHighlight: () => <span>Highlight!</span>,
  renderSubtitle: () => <span>subtitle</span>,
};

storiesOf('Highlights', module)
  .addDecorator((story, context) => withConsole()(story)(context))
  .add('single highlight', () => <Highlight {...highLightProps} />)
  .add('single highlight with link', () => (
    <Highlight {...highLightProps} url="https://www.strava.com" />
  ))
  .add('single highlight without subtitle', () => (
    <Highlight
      renderTitle={highLightProps.renderTitle}
      renderHighlight={highLightProps.renderSubtitle}
    />
  ));
