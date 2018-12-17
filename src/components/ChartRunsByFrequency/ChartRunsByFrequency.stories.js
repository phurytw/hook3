import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import ChartRunsByFrequency from './ChartRunsByFrequency';
import Container from '../Container';
import SelectedItemProvider from '../../contexts/SelectedItemProvider';

export const matchingRunsBySegmentGroups = [
  {
    id: 1418692812,
    count: 14,
    label: 'Lunch Run',
    distance: 11183.5,
    date: new Date('2018-11-22T11:15:56Z'),
  },
  {
    id: 1431182956,
    count: 3,
    label: 'Lunch Run',
    distance: 10799.7,
    date: new Date('2018-10-18T10:21:05Z'),
  },
  {
    id: 1443766020,
    count: 18,
    label: 'Bois de boulove avec Coach Karime',
    distance: 12540.5,
    date: new Date('2018-11-29T11:17:47Z'),
  },
  {
    id: 1551726651,
    count: 3,
    label: "L'allée royale / carré sénart",
    distance: 14018.2,
    date: new Date('2018-11-01T14:12:44Z'),
  },
  {
    id: 1577567231,
    count: 1,
    label: 'Fractionné avec la FNTP',
    distance: 10025,
    date: new Date('2018-07-03T10:19:23Z'),
  },
  {
    id: 1860198287,
    count: 1,
    label:
      "Paris Vershype 16km oklm avec Jarvis (à part Karim), et des types qu'on aime pas mais qu'on tolère quand même",
    distance: 16337.6,
    date: new Date('2018-09-23T08:54:30Z'),
  },
];

export const matchingRunsByHighestBestEfforts = [
  {
    id: 5000,
    count: 23,
    label: '5k',
    distance: 9559.6,
    date: new Date('2018-10-11T10:18:57Z'),
  },
  {
    id: 10000,
    count: 16,
    label: '10k',
    distance: 14018.2,
    date: new Date('2018-11-29T11:17:47Z'),
  },
  {
    id: 16090,
    count: 1,
    label: '10 mile',
    distance: 16337.6,
    date: new Date('2018-09-23T08:54:30Z'),
  },
];

export const matchingRunsBySegments = [
  {
    id: 2340254,
    count: 1,
    label: 'Cote des gardes',
    distance: 2009.79,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 2483661,
    count: 1,
    label: 'Paris → Versailles',
    distance: 16247.8,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 2483676,
    count: 1,
    label: 'Av. de Paris_D10',
    distance: 1254.03,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 2662318,
    count: 1,
    label: 'Fort Dénivelé',
    distance: 98.8597,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 2708323,
    count: 14,
    label: 'Tour parc André Malraux',
    distance: 2064.46,
    date: new Date('2018-11-22T11:15:56Z'),
  },
  {
    id: 2817861,
    count: 1,
    label: 'Piste Puteaux',
    distance: 453.941,
    date: new Date('2018-07-03T10:19:23Z'),
  },
  {
    id: 3059883,
    count: 1,
    label: 'Boulevard Grenelle→Quai de Stalingrad',
    distance: 5636.71,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 4325462,
    count: 1,
    label: 'Souvenir seller dodge - from ramp',
    distance: 338.5,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 5028972,
    count: 15,
    label: "Place de l'Iris Climb",
    distance: 578,
    date: new Date('2018-11-29T11:17:47Z'),
  },
  {
    id: 5650594,
    count: 1,
    label: 'Paris Versailles Final',
    distance: 6589,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 5651088,
    count: 1,
    label: 'the final sprint Paris _ Versailles',
    distance: 1933.1,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 6493219,
    count: 1,
    label: 'Longe le lac Dauphine -> Auteuil',
    distance: 1141.9,
    date: new Date('2018-11-29T11:17:47Z'),
  },
  {
    id: 6599570,
    count: 3,
    label: 'Avenue Pablo Picasso Climb',
    distance: 346.7,
    date: new Date('2018-10-18T10:21:05Z'),
  },
  {
    id: 6750028,
    count: 1,
    label: 'Retour Pre Catelan-Allée de Longchamp',
    distance: 996.2,
    date: new Date('2018-11-29T11:17:47Z'),
  },
  {
    id: 7112492,
    count: 1,
    label: 'Côte des Gardes version light',
    distance: 1053.5,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 7505186,
    count: 18,
    label: 'Allée Georges Hassoux remontée',
    distance: 664.7,
    date: new Date('2018-11-29T11:17:47Z'),
  },
  {
    id: 7827456,
    count: 3,
    label: 'Parc André Malraux - Clockwise',
    distance: 2070.5,
    date: new Date('2018-10-18T10:21:05Z'),
  },
  {
    id: 7890075,
    count: 3,
    label: 'Malraux tour église > entrée',
    distance: 1030.7,
    date: new Date('2018-10-18T10:21:05Z'),
  },
  {
    id: 7934929,
    count: 1,
    label: 'Route des Lacs a Madrid - Neuilly les Lacs',
    distance: 889.8,
    date: new Date('2018-11-29T11:17:47Z'),
  },
  {
    id: 7949045,
    count: 1,
    label: 'Meudon > Viroflay via Paris > Versailles',
    distance: 6765.3,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 8068477,
    count: 1,
    label: 'Lagardere - Going North',
    distance: 371.1,
    date: new Date('2018-11-29T11:17:47Z'),
  },
  {
    id: 8123313,
    count: 5,
    label: "Mur d'escalade via lacets",
    distance: 91.6,
    date: new Date('2018-11-22T11:15:56Z'),
  },
  {
    id: 8136027,
    count: 1,
    label: 'car free racing',
    distance: 414.1,
    date: new Date('2018-11-29T11:17:47Z'),
  },
  {
    id: 8251068,
    count: 1,
    label: 'Parc Andre Malraux & Hill',
    distance: 2324.3,
    date: new Date('2018-11-22T11:15:56Z'),
  },
  {
    id: 8410167,
    count: 1,
    label: 'Boulevard du General Koening',
    distance: 1223.1,
    date: new Date('2018-03-09T11:19:40Z'),
  },
  {
    id: 8497086,
    count: 1,
    label: 'Pont Neuilly-Puteaux',
    distance: 334.3,
    date: new Date('2018-08-13T10:36:54Z'),
  },
  {
    id: 8711579,
    count: 5,
    label: 'Côte "Jardin de collection" - longue',
    distance: 166.8,
    date: new Date('2018-11-15T11:15:09Z'),
  },
  {
    id: 9000392,
    count: 15,
    label: 'Ligne droite de L’île de Puteaux',
    distance: 892.1,
    date: new Date('2018-11-29T11:17:47Z'),
  },
  {
    id: 9423868,
    count: 14,
    label: "Tour Pars André Malraux (par point d'eau)",
    distance: 2127.3,
    date: new Date('2018-11-22T11:15:56Z'),
  },
  {
    id: 9484967,
    count: 1,
    label: 'Côte des gardes part 1',
    distance: 1065.1,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 9832166,
    count: 1,
    label: 'Côte des Gardes 1',
    distance: 558.2,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 9832186,
    count: 1,
    label: 'Côte des Gardes 2',
    distance: 826.2,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 9999217,
    count: 3,
    label: 'Tour Malraux (entrée Nord)',
    distance: 2117,
    date: new Date('2018-10-18T10:21:05Z'),
  },
  {
    id: 10393772,
    count: 2,
    label: 'Boulevard Koenig (autre sens)',
    distance: 1294.6,
    date: new Date('2018-07-19T10:31:17Z'),
  },
  {
    id: 10568073,
    count: 1,
    label: 'Descente de la Route des Fonds de la Chapelle',
    distance: 588.7,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 11013404,
    count: 2,
    label: 'Palais des Sport Stade de Rugby avec tour Terrain de Foot',
    distance: 553.6,
    date: new Date('2018-11-29T11:17:47Z'),
  },
  {
    id: 11328195,
    count: 3,
    label: 'Allée Royale JGD',
    distance: 1502.8,
    date: new Date('2018-11-01T14:12:44Z'),
  },
  {
    id: 11384866,
    count: 1,
    label: 'cote meudon',
    distance: 321.5,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 11527952,
    count: 1,
    label: 'André Malraux 2eme tour (2 pentes)',
    distance: 2341.6,
    date: new Date('2018-03-01T11:30:59Z'),
  },
  {
    id: 11781934,
    count: 1,
    label: 'Route Royale, 1 km',
    distance: 1096.7,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 11935923,
    count: 1,
    label: 'Parc André Malraux : 200m côte',
    distance: 195,
    date: new Date('2018-03-01T11:30:59Z'),
  },
  {
    id: 12528741,
    count: 11,
    label: 'Vers les lacs',
    distance: 1220.7,
    date: new Date('2018-11-29T11:17:47Z'),
  },
  {
    id: 12794476,
    count: 2,
    label: 'Montée des marches vers la Grande Arche',
    distance: 1307.3,
    date: new Date('2018-10-25T10:06:32Z'),
  },
  {
    id: 13056685,
    count: 1,
    label: 'Pont de Neuilly - Les coureurs du Bois de Boulogne',
    distance: 238.6,
    date: new Date('2018-03-09T11:19:40Z'),
  },
  {
    id: 13079757,
    count: 1,
    label: "30'-30' DOWN",
    distance: 155.7,
    date: new Date('2018-08-02T10:37:28Z'),
  },
  {
    id: 13109161,
    count: 17,
    label: "Route du champ d'entrainement",
    distance: 427.8,
    date: new Date('2018-11-29T11:17:47Z'),
  },
  {
    id: 13124907,
    count: 1,
    label: 'Boulevard du Général Koenig - Les coureurs du Bois de Boulogne',
    distance: 395.3,
    date: new Date('2018-03-09T11:19:40Z'),
  },
  {
    id: 13134131,
    count: 1,
    label: 'Parc André Malraux 1.8km',
    distance: 1897.2,
    date: new Date('2018-08-02T10:37:28Z'),
  },
  {
    id: 13162174,
    count: 1,
    label: 'Pavé de Bir-Hakeim',
    distance: 125.2,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 13187206,
    count: 1,
    label: '1000m Piste Puteaux',
    distance: 1019.7,
    date: new Date('2018-07-03T10:19:23Z'),
  },
  {
    id: 13245665,
    count: 1,
    label: 'Quai de Stalingrad (Est > Ouest)',
    distance: 1239,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 13269406,
    count: 1,
    label: 'Côte du cimetière Paris Versailles',
    distance: 258,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 13293671,
    count: 1,
    label: 'Paris-Versailles départ! ⓜⒼ',
    distance: 1992.3,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 13293672,
    count: 1,
    label: 'Paris-Versailles avant la côte ⓜⒼ',
    distance: 3198.1,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 13841882,
    count: 1,
    label: 'Route forestière royale',
    distance: 612,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 13841888,
    count: 1,
    label: 'Côte route forestière royale',
    distance: 102.7,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 13959637,
    count: 2,
    label: 'Carré vers Savigny',
    distance: 1042.5,
    date: new Date('2018-05-12T10:10:01Z'),
  },
  {
    id: 14702219,
    count: 10,
    label: "Jardins de l'Arche",
    distance: 433.4,
    date: new Date('2018-11-22T11:15:56Z'),
  },
  {
    id: 15849152,
    count: 1,
    label: 'MILE PISTE PUTEAUX',
    distance: 1653.4,
    date: new Date('2018-07-03T10:19:23Z'),
  },
  {
    id: 15891289,
    count: 1,
    label: 'Finish team E&S',
    distance: 339.1,
    date: new Date('2018-09-23T08:54:30Z'),
  },
  {
    id: 15964777,
    count: 1,
    label: 'Diagonale N/S Stade de Puteaux',
    distance: 118.9,
    date: new Date('2018-07-03T10:19:23Z'),
  },
  {
    id: 15964787,
    count: 1,
    label: 'Diagonale O/E Stade de Puteaux',
    distance: 150.1,
    date: new Date('2018-07-03T10:19:23Z'),
  },
  {
    id: 16020573,
    count: 10,
    label: 'esplanade de la defense',
    distance: 1479.3,
    date: new Date('2018-08-29T10:22:40Z'),
  },
  {
    id: 16256389,
    count: 9,
    label: 'Côte Malraux "Vincent Souchon"',
    distance: 137.8,
    date: new Date('2018-11-22T11:15:56Z'),
  },
  {
    id: 16338433,
    count: 2,
    label: 'Parking Rougeau Golf',
    distance: 1458.5,
    date: new Date('2018-11-01T14:12:44Z'),
  },
  {
    id: 16341792,
    count: 1,
    label: 'tr malraux',
    distance: 966.1,
    date: new Date('2018-08-02T10:37:28Z'),
  },
  {
    id: 17811611,
    count: 3,
    label: 'Le raidard du square',
    distance: 120.8,
    date: new Date('2018-10-18T10:21:05Z'),
  },
  {
    id: 18576388,
    count: 1,
    label: 'Le sprint de Sarah',
    distance: 121.3,
    date: new Date('2018-11-29T11:17:47Z'),
  },
  {
    id: 18794296,
    count: 2,
    label: 'Sous Bois Allée Royale',
    distance: 247.5,
    date: new Date('2018-11-01T14:12:44Z'),
  },
];

export const chartRunsByFrequencyProps = {
  matchingRunsBySegmentGroups,
  matchingRunsByHighestBestEfforts,
  matchingRunsBySegments,
};

storiesOf('Chart: Runs By Frequency', module)
  .addDecorator(storyFn => (
    <SelectedItemProvider>
      <Container>{storyFn()}</Container>
    </SelectedItemProvider>
  ))
  .addDecorator(withKnobs)
  .add('with only matching segments runs', () => (
    <ChartRunsByFrequency
      {...chartRunsByFrequencyProps}
      showBestEffortRuns={boolean('Show best effort runs', false)}
      showSegmentGroupRuns={boolean('Show segment groups runs', true)}
      showSegmentRuns={boolean('Show segments runs', false)}
    />
  ))
  .add('with only best efforts', () => (
    <ChartRunsByFrequency
      {...chartRunsByFrequencyProps}
      showBestEffortRuns={boolean('Show best effort runs', true)}
      showSegmentGroupRuns={boolean('Show segment groups runs', false)}
      showSegmentRuns={boolean('Show segments runs', false)}
    />
  ))
  .add('with only segments runs', () => (
    <ChartRunsByFrequency
      {...chartRunsByFrequencyProps}
      showBestEffortRuns={boolean('Show best effort runs', false)}
      showSegmentGroupRuns={boolean('Show segment groups runs', false)}
      showSegmentRuns={boolean('Show segments runs', true)}
    />
  ))
  .add('with matching segments runs and best efforts', () => (
    <ChartRunsByFrequency
      {...chartRunsByFrequencyProps}
      showBestEffortRuns={boolean('Show best effort runs', true)}
      showSegmentGroupRuns={boolean('Show segment groups runs', true)}
      showSegmentRuns={boolean('Show segments runs', false)}
    />
  ))
  .add('with all', () => (
    <ChartRunsByFrequency
      {...chartRunsByFrequencyProps}
      showBestEffortRuns={boolean('Show best effort runs', true)}
      showSegmentGroupRuns={boolean('Show segment groups runs', true)}
      showSegmentRuns={boolean('Show segments runs', true)}
    />
  ));
