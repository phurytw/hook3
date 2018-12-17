import { truncate } from 'lodash-es';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  FormattedMessage,
  FormattedHTMLMessage,
  FormattedDate,
} from 'react-intl';
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
          <FormattedHTMLMessage
            id="highlights.longestRunTitle"
            values={{
              run: truncate(longestRun.name, {
                separator: /,? +/,
              }),
            }}
          />
        )}
        renderHighlight={() => (
          <strong>
            <FormattedMessage
              id="highlights.longestRunHighlight"
              values={{ distance: (longestRun.distance / 1000).toPrecision(3) }}
            />
          </strong>
        )}
        renderSubtitle={() => (
          <span>
            <FormattedMessage id="highlights.longestRunSubtitle" />
            <FormattedDate
              value={new Date(longestRun.date)}
              day="2-digit"
              weekday="long"
              month="long"
              year="numeric"
            />
          </span>
        )}
      />
      <Highlight
        url={`https://www.strava.com/activities/${mostFrequentRun.id}`}
        renderTitle={() => (
          <FormattedHTMLMessage
            id="highlights.mostFrequentRunTitle"
            values={{
              run: truncate(mostFrequentRun.name, {
                separator: /,? +/,
              }),
            }}
          />
        )}
        renderHighlight={() => (
          <strong>
            <FormattedMessage
              id="highlights.mostFrequentRunHighlight"
              values={{ count: mostFrequentRun.count }}
            />
          </strong>
        )}
        renderSubtitle={() => (
          <span>
            <FormattedMessage id="highlights.mostFrequentRunSubtitle" />
            <FormattedDate
              value={new Date(mostFrequentRun.date)}
              day="2-digit"
              weekday="long"
              month="long"
              year="numeric"
            />
          </span>
        )}
      />
      <Highlight
        url={`https://www.strava.com/athletes/${biggestFan.id}`}
        renderTitle={() => (
          <FormattedHTMLMessage
            id="highlights.biggestFanTitle"
            values={{ fan: biggestFan.name }}
          />
        )}
        renderHighlight={() => <img src={biggestFan.picture} alt="" />}
        renderSubtitle={() => (
          <strong>
            <FormattedMessage
              id="highlights.biggestFanSubtitle"
              values={{ kudos: biggestFan.count }}
            />
          </strong>
        )}
      />
      <Highlight
        url={`https://www.strava.com/athletes/${totalRuns.athleteId}`}
        renderTitle={() => <FormattedMessage id="highlights.totalRunsTitle" />}
        renderHighlight={() => (
          <strong>
            <FormattedMessage
              id="highlights.totalRunsHighlight"
              values={{ runs: totalRuns.count }}
            />
          </strong>
        )}
        renderSubtitle={() => (
          <FormattedMessage id="highlights.totalRunsSubtitle" />
        )}
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
