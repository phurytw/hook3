import React from 'react';
import { storiesOf } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import ReferenceList from './ReferenceList';

const goToAthleteFactory = id => () =>
  window.open(`https://www.strava.com/athletes/${id}`, '_blank');

export const kudosers = [
  {
    label: 'caroline chupin',
    onClick: goToAthleteFactory(2719443),
  },
  {
    label: 'Alexis Louart',
    onClick: goToAthleteFactory(2981312),
  },
  {
    label: "Frédéric Planch's",
    onClick: goToAthleteFactory(2288816),
  },
  {
    label: 'Omar Mellouli',
    onClick: goToAthleteFactory(3258196),
  },
  {
    label: 'karim mansoura',
    onClick: goToAthleteFactory(2716680),
  },
  {
    label: 'Max BELLENGER',
    onClick: goToAthleteFactory(114328),
  },
  {
    label: 'Kevin Seysen',
    onClick: goToAthleteFactory(1553019),
  },
  {
    label: 'John Taupin',
    onClick: goToAthleteFactory(25804767),
  },
  {
    label: 'Maxime Lefrancois',
    onClick: goToAthleteFactory(3127133),
  },
].map(k => ({ ...k, type: 'KUDOSER' }));

storiesOf('Reference List', module)
  .addDecorator((story, context) => withConsole()(story)(context))
  .add('unordered', () => <ReferenceList items={kudosers} ordered={false} />)
  .add('ordered', () => <ReferenceList items={kudosers} ordered={true} />)
  .add('non clickable', () => (
    <ReferenceList items={kudosers.map(({ label }) => ({ label }))} />
  ));
