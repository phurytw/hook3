import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { orderBy, truncate, pick } from 'lodash-es';
import ChartEvolutionOverTime from '../ChartEvolutionOverTime';
import ChartDistanceComparison from '../ChartDistanceComparison';
import ChartPaceComparison from '../ChartPaceComparison';
import ReferenceList from '../ReferenceList';
import { secondary, active, bgSecondary } from '../colors';

const Title = styled.h1`
  text-align: center;
`;

const ChartList = styled.nav`
  margin: 20px 0;

  text-align: center;
`;

const ChartListItem = styled.a`
  margin-left: 32px;
  margin-right: 32px;
  display: inline-block;
  background: ${bgSecondary}

  font-size: 48px;
  font-style: oblique;
  letter-spacing: 2px;
  text-decoration: none;

  cursor: pointer;

  &:hover, &:active, &:focus, &.selected {
    color: ${secondary};
    text-decoration: underline;
  }

  &:active {
    color: ${active};
  }
`;

const MainView = styled.div`
  display: flex;
`;

const Graph = styled.div`
  flex: 2;
`;

const List = styled.div`
  flex: 1;
`;

const charts = [
  {
    label: 'Progress over time',
  },
  {
    label: 'Pace comparison',
  },
  {
    label: 'Distance comparison',
  },
];

const RunComparison = ({ title, runs, type, location, history, match }) => {
  const [currentChart, setChart] = useState(charts[0]);
  return (
    <div>
      <Title>{title}</Title>
      <ChartList>
        {charts.map((c, i) => (
          <ChartListItem
            key={i}
            className={currentChart === c ? 'selected' : ''}
            onClick={() => setChart(c)}
          >
            {c.label}
          </ChartListItem>
        ))}
      </ChartList>
      <MainView>
        <Graph>
          {currentChart === charts[0] && (
            <ChartEvolutionOverTime
              runs={runs.map(({ id, splits_metric }) => ({
                id,
                type,
                splits: splits_metric.map(
                  ({ average_speed, distance, elapsed_time }) => ({
                    speed: average_speed,
                    distance: distance,
                    time: elapsed_time,
                  })
                ),
              }))}
            />
          )}
          {currentChart === charts[1] && (
            <ChartPaceComparison
              runs={runs.map(r => ({
                ...pick(r, 'id', 'name', 'max_speed', 'average_speed'),
                type,
              }))}
            />
          )}
          {currentChart === charts[2] && (
            <ChartDistanceComparison
              runs={runs.map(r => ({
                ...pick(r, 'id', 'name', 'distance'),
                type,
              }))}
            />
          )}
        </Graph>
        <List>
          <ReferenceList
            ordered
            items={orderBy(runs, 'start_date', 'desc').map(({ name, id }) => ({
              label: truncate(name, {
                separator: /,? +/,
              }),
              onClick: () =>
                window.open(
                  `https://www.strava.com/activities/${id}`,
                  '_blank'
                ),
              id,
              type,
            }))}
          />
        </List>
      </MainView>
    </div>
  );
};

RunComparison.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  history: PropTypes.shape({}),
  location: PropTypes.shape({}),
  match: PropTypes.shape({}),
  runs: PropTypes.arrayOf(PropTypes.object),
};

export default RunComparison;
