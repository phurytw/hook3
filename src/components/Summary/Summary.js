import {
  values,
  mapValues,
  find,
  maxBy,
  pickBy,
  isEmpty,
  head,
  last,
  orderBy,
  truncate,
} from 'lodash-es';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Highlights from '../Highlights';
import ChartTopKudosers from '../ChartTopKudosers';
import ReferenceList from '../ReferenceList';
import ChartRunsByFrequency from '../ChartRunsByFrequency';

const Section = styled.section`
  margin: 50px 20px;
  position: relative;
  display: flex;
`;

const SectionTitle = styled.h2`
  font-size: 48px;
  text-align: center;
`;

const SectionGraph = styled.div`
  flex: 2;
  max-height: 600px;
`;

const SectionList = styled.div`
  flex: 1;
`;

export const Summary = props => {
  const {
    athleteId,
    longestRun,
    biggestFan,
    totalRuns,
    topKudosers,
    matchingRunsBySegmentGroups,
    matchingRunsByHighestBestEfforts,
    matchingRunsBySegments,
    history,
  } = props;
  const chartDataForSegmentGroups = useMemo(
    () =>
      values(
        mapValues(matchingRunsBySegmentGroups, (v, k) => {
          const { distance } = maxBy(v, a => a.distance);
          const { name, id } = head(v);

          return {
            id,
            count: v.length,
            label: name,
            distance: distance,
            date: new Date(maxBy(v, a => a.start_date).start_date),
          };
        })
      ),
    [matchingRunsBySegmentGroups]
  );
  const chartDataForSegments = useMemo(
    () =>
      values(
        mapValues(matchingRunsBySegments, (v, k) => {
          const { name, distance, id } = find(
            v[0].segment_efforts,
            segE => segE.segment.id.toString() === k
          ).segment;

          return {
            id,
            count: v.length,
            label: name,
            distance: distance,
            date: new Date(maxBy(v, a => a.start_date).start_date),
          };
        })
      ),
    [matchingRunsBySegments]
  );
  const chartDataForBestEfforts = useMemo(
    () =>
      values(
        mapValues(
          pickBy(matchingRunsByHighestBestEfforts, v => !isEmpty(v)),
          (v, k) => {
            const { name, distance } = find(
              v[0].best_efforts,
              be => be.distance.toString() === k
            );
            return {
              id: distance,
              count: v.length,
              label: name,
              distance: distance,
              date: new Date(maxBy(v, a => a.start_date).start_date),
            };
          }
        )
      ),
    [matchingRunsByHighestBestEfforts]
  );
  const [mostFrequentRun, mostFrequentCount] = useMemo(
    () => {
      const mostFrequentRuns = maxBy(
        values(matchingRunsBySegmentGroups),
        v => v.length
      );
      return [last(mostFrequentRuns), mostFrequentRuns.length];
    },
    [matchingRunsBySegmentGroups]
  );

  return (
    <div>
      <Highlights
        longestRun={{
          id: longestRun.id,
          name: longestRun.name,
          distance: longestRun.distance,
          date: longestRun.start_date,
        }}
        mostFrequentRun={{
          id: mostFrequentRun.id,
          name: mostFrequentRun.name,
          count: mostFrequentCount,
          date: new Date(mostFrequentRun.start_date).toISOString(),
        }}
        biggestFan={{
          id: biggestFan.id,
          name: `${biggestFan.firstname} ${biggestFan.lastname}`,
          count: biggestFan.kudosCount,
          picture: biggestFan.profile,
        }}
        totalRuns={{ athleteId, count: totalRuns.count }}
      />
      <SectionTitle>Your most frequent runs</SectionTitle>
      <Section>
        <SectionGraph>
          <ChartRunsByFrequency
            matchingRunsBySegmentGroups={chartDataForSegmentGroups}
            matchingRunsByHighestBestEfforts={chartDataForBestEfforts}
            matchingRunsBySegments={chartDataForSegments}
            showBestEffortRuns
            showSegmentGroupRuns
          />
        </SectionGraph>
        <SectionList>
          <ReferenceList
            ordered
            items={orderBy(
              [
                ...chartDataForSegmentGroups.map(v => ({
                  ...v,
                  type: 'SEGMENT_GROUP',
                  onClick: () => history.push(`/SegmentGroup/${v.id}`),
                })),
                ...chartDataForBestEfforts.map(v => ({
                  ...v,
                  type: 'HIGHEST_BEST_EFFORT',
                  onClick: () => history.push(`/HighestBestEffort/${v.id}`),
                })),
              ],
              'count',
              'desc'
            ).map(({ label, count, id, type, onClick }) => ({
              onClick,
              label: `${truncate(label, {
                separator: /,? +/,
              })} (${count})`,
              id,
              type,
            }))}
          />
        </SectionList>
      </Section>
      <SectionTitle>People who give you the most kudos</SectionTitle>
      <Section>
        <SectionGraph>
          <ChartTopKudosers kudosers={topKudosers} />
        </SectionGraph>
        <SectionList>
          <ReferenceList
            ordered
            items={topKudosers.map(
              ({ id, kudosCount, firstname, lastname }) => ({
                onClick: () =>
                  window.open(
                    `https://www.strava.com/athletes/${id}`,
                    '_blank'
                  ),
                label: `${firstname} ${lastname} (${kudosCount})`,
                id,
                type: 'KUDOSER',
              })
            )}
          />
        </SectionList>
      </Section>
    </div>
  );
};

Summary.propTypes = {
  athleteId: PropTypes.number,
  longestRun: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    distance: PropTypes.number,
    start_date: PropTypes.string,
  }),
  biggestFan: PropTypes.shape({
    id: PropTypes.number,
    kudosCount: PropTypes.number,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    profile: PropTypes.string,
  }),
  totalRuns: PropTypes.shape({
    count: PropTypes.number,
  }),
  topKudosers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      kudosCount: PropTypes.number,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
    })
  ),
  matchingRunsBySegmentGroups: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        distance: PropTypes.number,
        name: PropTypes.string,
        start_date: PropTypes.string,
      })
    )
  ),
  matchingRunsByBestEfforts: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        distance: PropTypes.number,
        name: PropTypes.string,
        start_date: PropTypes.string,
      })
    )
  ),
  matchingRunsByHighestBestEfforts: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        distance: PropTypes.number,
        name: PropTypes.string,
        start_date: PropTypes.string,
      })
    )
  ),
  matchingRunsBySegments: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        distance: PropTypes.number,
        name: PropTypes.string,
        start_date: PropTypes.string,
      })
    )
  ),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

Summary.defaultProps = {
  longestRun: undefined,
  biggestFan: undefined,
  totalRuns: undefined,
  topKudosers: [],
  matchingRunsBySegmentGroups: {},
  matchingRunsByBestEfforts: {},
  matchingRunsByHighestBestEfforts: {},
  matchingRunsBySegments: {},
  history: {
    push: () => undefined,
  },
};

export default Summary;
