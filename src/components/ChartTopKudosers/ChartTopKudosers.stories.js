import React from 'react';
import { storiesOf } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import ChartTopKudosers from './ChartTopKudosers';
import Container from '../Container';
import SelectedItemProvider from '../../contexts/SelectedItemProvider';

export const kudosers = [
  {
    id: 2719443,
    username: 'caroline_chupin',
    firstname: 'caroline',
    lastname: 'chupin',
    premium: false,
    profile_medium:
      'https://dgalywyr863hv.cloudfront.net/pictures/athletes/2719443/9220373/1/medium.jpg',
    profile:
      'https://dgalywyr863hv.cloudfront.net/pictures/athletes/2719443/9220373/1/large.jpg',
    kudosCount: 29,
  },
  {
    id: 29813127,
    username: null,
    firstname: 'Alexis',
    lastname: 'Louart',
    profile_medium:
      'https://dgalywyr863hv.cloudfront.net/pictures/athletes/29813127/9446140/1/medium.jpg',
    profile:
      'https://dgalywyr863hv.cloudfront.net/pictures/athletes/29813127/9446140/1/large.jpg',
    kudosCount: 22,
  },
  {
    id: 22888162,
    username: 'fplanchs',
    firstname: 'Frédéric',
    lastname: "Planch's",
    profile_medium:
      'https://graph.facebook.com/1369295626452200/picture?height=256&width=256',
    profile:
      'https://graph.facebook.com/1369295626452200/picture?height=256&width=256',
    kudosCount: 14,
  },
  {
    id: 32581967,
    username: null,
    firstname: 'Omar',
    lastname: 'Mellouli',
    profile_medium: 'avatar/athlete/medium.png',
    profile: 'avatar/athlete/large.png',
    kudosCount: 9,
  },
  {
    id: 27166802,
    username: 'karim_mansoura',
    firstname: 'karim',
    lastname: 'mansoura',
    profile_medium:
      'https://lh5.googleusercontent.com/-aLBjKaVfPnU/AAAAAAAAAAI/AAAAAAAAAPQ/ovV4i5yOrko/photo.jpg',
    profile:
      'https://lh5.googleusercontent.com/-aLBjKaVfPnU/AAAAAAAAAAI/AAAAAAAAAPQ/ovV4i5yOrko/photo.jpg',
    kudosCount: 8,
  },
  {
    id: 114328,
    username: 'mbellenger',
    firstname: 'Max',
    lastname: 'BELLENGER',
    profile_medium:
      'https://dgalywyr863hv.cloudfront.net/pictures/athletes/114328/5375764/7/medium.jpg',
    profile:
      'https://dgalywyr863hv.cloudfront.net/pictures/athletes/114328/5375764/7/large.jpg',
    kudosCount: 7,
  },
  {
    id: 15530194,
    username: 'kseysen',
    firstname: 'Kevin',
    lastname: 'Seysen',
    profile_medium:
      'https://graph.facebook.com/10153828359683422/picture?height=256&width=256',
    profile:
      'https://graph.facebook.com/10153828359683422/picture?height=256&width=256',
    kudosCount: 7,
  },
  {
    id: 25804767,
    username: 'johntaupin',
    firstname: 'John',
    lastname: 'Taupin',
    profile_medium:
      'https://dgalywyr863hv.cloudfront.net/pictures/athletes/25804767/9740905/1/medium.jpg',
    profile:
      'https://dgalywyr863hv.cloudfront.net/pictures/athletes/25804767/9740905/1/large.jpg',
    kudosCount: 1,
  },
  {
    id: 31271337,
    username: 'lefrancois_maxime',
    firstname: 'Maxime',
    lastname: 'Lefrancois',
    profile_medium:
      'https://graph.facebook.com/10214399371837067/picture?height=256&width=256',
    profile:
      'https://graph.facebook.com/10214399371837067/picture?height=256&width=256',
    kudosCount: 1,
  },
];

storiesOf('Chart: Top Kudosers', module)
  .addDecorator((story, context) =>
    withConsole()(() => (
      <SelectedItemProvider>
        <Container>{story()}</Container>
      </SelectedItemProvider>
    ))(context)
  )
  .add('default', () => <ChartTopKudosers kudosers={kudosers} />);
