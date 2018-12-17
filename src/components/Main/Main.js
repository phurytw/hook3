import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import useStrava from '../../hooks/useStrava';
import Container from '../Container';
import Header from '../Header';
import Footer from '../Footer';
import Summary from '../Summary';
import RunComparison from '../RunComparison';
import SelectedItemProvider from '../../contexts/SelectedItemProvider';

const Main = ({ code }) => {
  const {
    isReady,
    athleteId,
    profilePicture,
    fullName,
    longestRun,
    topKudosers,
    biggestFan,
    matchingRunsBySegmentGroups,
    matchingRunsByHighestBestEfforts,
    totalRuns,
  } = useStrava(code);
  return (
    <SelectedItemProvider>
      <Container>
        <Header
          athleteId={athleteId}
          profilePicture={profilePicture}
          fullName={fullName}
        />
        <Switch>
          <Route
            path="/"
            exact
            render={props =>
              isReady ? (
                <Summary
                  {...props}
                  athleteId={athleteId}
                  longestRun={longestRun}
                  biggestFan={biggestFan}
                  totalRuns={totalRuns}
                  topKudosers={topKudosers}
                  matchingRunsBySegmentGroups={matchingRunsBySegmentGroups}
                  matchingRunsByHighestBestEfforts={
                    matchingRunsByHighestBestEfforts
                  }
                />
              ) : null
            }
          />
          <Route
            path="/SegmentGroup/:id"
            render={props => {
              const runs = matchingRunsBySegmentGroups[props.match.params.id];
              const [firstRun] = runs;
              return (
                <RunComparison
                  {...props}
                  runs={runs}
                  title={firstRun && firstRun.name}
                  type="SEGMENT_GROUP"
                />
              );
            }}
          />
          <Route
            path="/HighestBestEffort/:id"
            render={props => {
              const runs =
                matchingRunsByHighestBestEfforts[props.match.params.id];
              const [firstRun] = runs;
              return (
                <RunComparison
                  {...props}
                  runs={runs}
                  title={firstRun && firstRun.name}
                  type="HIGHEST_BEST_EFFORT"
                />
              );
            }}
          />
        </Switch>
        <Footer />
      </Container>
    </SelectedItemProvider>
  );
};

Main.propTypes = {
  code: PropTypes.string.isRequired,
};

export default Main;
