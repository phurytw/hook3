import dateFormat from 'date-fns/format';
import { truncate } from 'lodash-es';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Highlight from '../Highlight';
import useHasElementEntered from '../../hooks/useHasElementEntered';
import { primary } from '../colors';

const borderThickness = 5;
const singleBorderThickness = borderThickness / 2;

const HighlightsContainer = styled.div`
  min-height: 500px;
  padding: 50px 20px;
  position: relative;

  & > *:nth-child(1) {
    position: relative;
  }
  & > *:nth-child(1):after {
    content: '';
    background: ${primary};
    position: absolute;
    bottom: 25%;
    right: -${singleBorderThickness}px;
    height: ${props => (props.showBorders ? 50 : 0)}%;
    width: ${borderThickness}px;
    transition: all 1s ease-in-out;
  }
  & > *:nth-child(1):before {
    content: '';
    background: ${primary};
    position: absolute;
    right: 25%;
    bottom: -${singleBorderThickness}px;
    width: ${props => (props.showBorders ? 50 : 0)}%;
    height: ${borderThickness}px;
    transition: all 1s ease-in-out;
  }

  & > *:nth-child(2) {
    position: relative;
  }
  & > *:nth-child(2):after {
    content: '';
    background: ${primary};
    position: absolute;
    left: 25%;
    bottom: -${singleBorderThickness}px;
    width: ${props => (props.showBorders ? 50 : 0)}%;
    height: ${borderThickness}px;
    transition: all 1s ease-in-out;
  }

  & > *:nth-child(3) {
    position: relative;
  }
  & > *:nth-child(3):after {
    content: '';
    background: ${primary};
    position: absolute;
    top: 25%;
    right: -${singleBorderThickness}px;
    height: ${props => (props.showBorders ? 50 : 0)}%;
    width: ${borderThickness}px;
    transition: all 1s ease-in-out;
  }

  & > *:nth-child(4) {
    position: relative;
  }
`;

const Highlights = ({ longestRun, mostFrequentRun, biggestFan, totalRuns }) => {
  const containerRef = useRef();
  const hasElementEntered = useHasElementEntered(containerRef);
  return (
    <HighlightsContainer ref={containerRef} showBorders={hasElementEntered}>
      <Highlight
        url={`https://www.strava.com/activities/${longestRun.id}`}
        renderTitle={() => (
          <span>
            Your longest run was{' '}
            <strong>
              {truncate(longestRun.name, {
                separator: /,? +/,
              })}
            </strong>
          </span>
        )}
        renderHighlight={() => (
          <strong>{(longestRun.distance / 1000).toPrecision(5)} km</strong>
        )}
        renderSubtitle={() => (
          <span>
            Done on {dateFormat(longestRun.date, 'dddd DD MMMM YYYY')}
          </span>
        )}
      />
      <Highlight
        url={`https://www.strava.com/activities/${mostFrequentRun.id}`}
        renderTitle={() => (
          <span>
            Your most frequent run is{' '}
            <strong>
              {truncate(mostFrequentRun.name, {
                separator: /,? +/,
              })}
            </strong>
          </span>
        )}
        renderHighlight={() => <strong>{mostFrequentRun.count} times</strong>}
        renderSubtitle={() => (
          <span>
            Last run on{' '}
            <em>{dateFormat(mostFrequentRun.date, 'dddd DD MMMM YYYY')}</em>
          </span>
        )}
      />
      <Highlight
        url={`https://www.strava.com/athletes/${biggestFan.id}`}
        renderTitle={() => (
          <span>
            Your biggest fan is <strong>{biggestFan.name}</strong>
          </span>
        )}
        renderHighlight={() => <img src={biggestFan.picture} alt="" />}
        renderSubtitle={() => <strong>{biggestFan.count} total kudos!</strong>}
      />
      <Highlight
        url={`https://www.strava.com/athletes/${totalRuns.athleteId}`}
        renderTitle={() => <span>You have run a total of</span>}
        renderHighlight={() => <strong>{totalRuns.count} times</strong>}
        renderSubtitle={() => <span>so far!</span>}
      />
    </HighlightsContainer>
  );
};

Highlights.propTypes = {
  longestRun: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    date: PropTypes.string,
    distance: PropTypes.number,
  }).isRequired,
  mostFrequentRun: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    date: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
  biggestFan: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    picture: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
  totalRuns: PropTypes.shape({
    athleteId: PropTypes.number,
    count: PropTypes.number,
  }),
};

export default Highlights;
