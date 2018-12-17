import React from 'react';
import { storiesOf } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import ChartDistanceComparison from './ChartDistanceComparison';
import SelectedItemProvider from '../../contexts/SelectedItemProvider';
import Container from '../Container';

export const props = {
  runs: [
    {
      id: 1418692812,
      name: 'Lunch Run',
      distance: 5615.5,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1450775497,
      name: 'Parc de Nanterre mon frère ',
      distance: 8955.6,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1465575891,
      name: 'Nanterre mon frère ',
      distance: 8631.6,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1472741289,
      name: 'Nanterre mon frère ',
      distance: 9112.9,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1486900857,
      name: 'Lunch Run',
      distance: 7075.2,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1503912745,
      name: 'Lunch Run',
      distance: 6969.7,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1513533402,
      name: 'Jarvis🐵',
      distance: 9113.5,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1618383989,
      name: 'Nanterre avec la team Metabot',
      distance: 8203.3,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1693044259,
      name: 'Quatre Tours ft. Melloulite',
      distance: 11107.5,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1744562884,
      name: 'Endurance Fion damentale',
      distance: 8159.7,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1897847832,
      name: 'To The Dome ft Mamar & Pablo',
      distance: 8586.6,
      type: 'SEGMENT_GROUP',
    },
    {
      id: 1952881385,
      name: 'Cuatro avec Jarvis + Marvin',
      distance: 11101.1,
      type: 'SEGMENT_GROUP',
    },
    { id: 1965905852, name: '4', distance: 11168.7, type: 'SEGMENT_GROUP' },
    { id: 1978589855, name: 'Sanic', distance: 11183.5, type: 'SEGMENT_GROUP' },
  ],
};

storiesOf('Chart: Distance Comparison', module)
  .addDecorator((story, context) =>
    withConsole()(() => (
      <SelectedItemProvider>
        <Container>{story()}</Container>
      </SelectedItemProvider>
    ))(context)
  )
  .add('default', () => <ChartDistanceComparison {...props} />);
