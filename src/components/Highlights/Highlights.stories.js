import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import Highlights from './Highlights';
import i18n from '../../i18n';

export const highLightsProps = {
  longestRun: {
    id: 1860198287,
    name: 'Paris Versailles',
    distance: 16337.6,
    date: '2018-09-23T08:54:30Z',
  },
  mostFrequentRun: {
    id: 1990920713,
    name: 'Bois de boulove',
    count: 18,
    date: '2018-11-29T11:17:47Z',
  },
  biggestFan: {
    id: 2719443,
    name: 'caroline chupin',
    count: 29,
    picture:
      'https://dgalywyr863hv.cloudfront.net/pictures/athletes/2719443/9220373/1/large.jpg',
  },
  totalRuns: {
    athleteId: 28445856,
    count: 39,
  },
};

storiesOf('Highlights', module)
  .addDecorator((story, context) =>
    withConsole()(() => (
      <IntlProvider locale="en-US" messages={i18n['en-US']}>
        {story()}
      </IntlProvider>
    ))(context)
  )
  .add('highlights', () => <Highlights {...highLightsProps} />)
  .add('highlights with truncated run names', () => (
    <Highlights
      {...highLightsProps}
      longestRun={{
        ...highLightsProps.longestRun,
        name: 'Paris Versailles and more and more and more and more',
      }}
      mostFrequentRun={{
        ...highLightsProps.mostFrequentRun,
        name: 'Bois de boulove and more and more and more and more',
      }}
    />
  ));
