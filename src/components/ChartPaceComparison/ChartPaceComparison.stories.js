import React from 'react';
import { storiesOf } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import { text, withKnobs } from '@storybook/addon-knobs';
import ChartPaceComparison from './ChartPaceComparison';
import SelectedItemProvider from '../../contexts/SelectedItemProvider';
import Container from '../Container';

export const props = {
  runs: [
    {
      id: 1418692812,
      name: 'Lunch Run',
      max_speed: 4.9,
      average_speed: 2.776,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1450775497,
      name: 'Parc de Nanterre mon frère ',
      max_speed: 5.2,
      average_speed: 2.588,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1465575891,
      name: 'Nanterre mon frère ',
      max_speed: 6,
      average_speed: 2.981,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1472741289,
      name: 'Nanterre mon frère ',
      max_speed: 6.3,
      average_speed: 2.87,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1486900857,
      name: 'Lunch Run',
      max_speed: 5.9,
      average_speed: 2.92,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1503912745,
      name: 'Lunch Run',
      max_speed: 6.2,
      average_speed: 3.011,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1513533402,
      name: 'Jarvis🐵',
      max_speed: 4.3,
      average_speed: 2.949,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1618383989,
      name: 'Nanterre avec la team Metabot',
      max_speed: 6.5,
      average_speed: 3.035,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1693044259,
      name: 'Quatre Tours ft. Melloulite',
      max_speed: 5.2,
      average_speed: 2.852,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1744562884,
      name: 'Endurance Fion damentale',
      max_speed: 6.2,
      average_speed: 2.31,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1897847832,
      name: 'To The Dome ft Mamar & Pablo',
      max_speed: 6.3,
      average_speed: 2.888,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1952881385,
      name: 'Cuatro avec Jarvis + Marvin',
      max_speed: 6.1,
      average_speed: 2.957,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1965905852,
      name: '4',
      max_speed: 5,
      average_speed: 2.846,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1978589855,
      name: 'Sanic',
      max_speed: 8.2,
      average_speed: 3.006,
      type: 'SEGMENT_GROUP',
    },
  ],
};

storiesOf('Chart: Pace Comparison', module)
  .addDecorator((story, context) =>
    withConsole()(() => (
      <SelectedItemProvider>
        <Container>{story()}</Container>
      </SelectedItemProvider>
    ))(context)
  )
  .addDecorator(withKnobs)
  .add('default', () => (
    <ChartPaceComparison {...props} mode={text('mode', 'absolute')} />
  ));
