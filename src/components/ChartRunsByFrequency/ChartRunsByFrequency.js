import { axisBottom, axisLeft } from 'd3-axis';
import { easeQuadOut } from 'd3-ease';
import { scaleLinear, scaleQuantize, scaleTime } from 'd3-scale';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import dateSubYears from 'date-fns/sub_years';
import { maxBy, minBy, random, find } from 'lodash-es';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef, useContext } from 'react';
import styled from 'styled-components';
import { active, bgSecondary, primary, secondary } from '../colors';
import useHasElementEntered from '../../hooks/useHasElementEntered';
import SelectedItemContext from '../../contexts/SelectedItemContext';

const Chart = styled.div`
  font-size: 16px;

  & .x-axis,
  & .y-axis {
    fill: ${bgSecondary};

    & text {
      font-size: 16px;
      font-family: Acme;
    }
  }

  & .runs {
    cursor: pointer;

    & .circle {
      fill: ${secondary};
      stroke: ${primary};
      stroke-width: 1;
      position: relative;
      z-index: 5;

      &:hover,
      &--selected {
        fill: ${active};

        + .text {
          visibility: visible;
        }
      }
    }

    & .text {
      font-family: sans-serif;
      text-anchor: middle;
      fill: ${primary};
      position: relative;
      z-index: 10;
      pointer-events: none;
      visibility: hidden;
    }
  }
`;

const ChartRunsByFrequency = ({
  matchingRunsBySegmentGroups,
  matchingRunsByHighestBestEfforts,
  matchingRunsBySegments,
  showSegmentGroupRuns,
  showSegmentRuns,
  showBestEffortRuns,
}) => {
  const margin = { top: 60, right: 60, bottom: 60, left: 60 };
  const width = 800 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;
  const { setSelectedItem, ...selectedItem } = useContext(SelectedItemContext);
  const chart = useRef();
  const hasElementEntered = useHasElementEntered(chart);
  const xScaleRef = useRef();
  const xAxisRef = useRef();
  const yScaleRef = useRef();
  const yAxisRef = useRef();
  const radiusScaleRef = useRef();
  const containerRef = useRef();
  const xAxisContainerRef = useRef();
  const yAxisContainerRef = useRef();
  const runsBySegmentGroupsWithType = useMemo(
    () =>
      showSegmentGroupRuns
        ? matchingRunsBySegmentGroups.map(r => ({
            ...r,
            type: 'SEGMENT_GROUP',
          }))
        : [],
    [matchingRunsBySegmentGroups, showSegmentGroupRuns]
  );
  const runsByHighestBestEffortsWithType = useMemo(
    () =>
      showBestEffortRuns
        ? matchingRunsByHighestBestEfforts.map(r => ({
            ...r,
            type: 'HIGHEST_BEST_EFFORT',
          }))
        : [],
    [matchingRunsByHighestBestEfforts, showBestEffortRuns]
  );
  const runsBySegmentsWithType = useMemo(
    () =>
      showSegmentRuns
        ? matchingRunsBySegments.map(r => ({ ...r, type: 'SEGMENT' }))
        : [],
    [matchingRunsBySegments, showSegmentRuns]
  );
  const allRuns = useMemo(
    () => [
      ...runsByHighestBestEffortsWithType,
      ...runsBySegmentGroupsWithType,
      ...runsBySegmentsWithType,
    ],
    [
      matchingRunsByHighestBestEfforts,
      matchingRunsBySegmentGroups,
      matchingRunsBySegments,
      showBestEffortRuns,
      showSegmentGroupRuns,
      showSegmentRuns,
    ]
  );

  // SVG creation
  useEffect(
    () => {
      const svg = select(chart.current)
        .append('svg')
        .attr(
          'viewBox',
          `0 0 ${width + margin.left + margin.right} ${height +
            margin.top +
            margin.bottom}`
        );

      // main container
      const container = svg
        .append('g')
        .attr('class', 'container')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
      containerRef.current = container;

      // x-axis container
      xAxisContainerRef.current = container
        .append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${height})`);

      // y-axis container
      yAxisContainerRef.current = container.append('g').attr('class', 'y-axis');

      xScaleRef.current = scaleTime().range([0, width]);
      yScaleRef.current = scaleLinear().range([0, height]);
      radiusScaleRef.current = scaleQuantize().range([5, 10, 20, 30, 50]);
      xAxisRef.current = axisBottom(xScaleRef.current);
      yAxisRef.current = axisLeft(yAxisRef.current).ticks(10, '~s');
    },
    [chart]
  );

  // SVG drawing and updating
  useEffect(
    () => {
      if (hasElementEntered) {
        const xScale = xScaleRef.current;
        const yScale = yScaleRef.current;
        const radiusScale = radiusScaleRef.current;
        const xAxis = xAxisRef.current;
        const yAxis = yAxisRef.current;
        const container = containerRef.current;
        const xAxisContainer = xAxisContainerRef.current;
        const yAxisContainer = yAxisContainerRef.current;

        if (allRuns.length === 0) {
          const now = Date.now();
          xScale.domain([dateSubYears(now, 1), now]);
          yScale.domain([21097, 0]);
          radiusScale.domain([0, 5]);
        } else {
          xScale.domain([
            minBy(allRuns, ({ date }) => date).date,
            maxBy(allRuns, ({ date }) => date).date,
          ]);
          yScale.domain([
            maxBy(allRuns, ({ distance }) => distance).distance,
            0,
          ]);
          radiusScale.domain([0, maxBy(allRuns, ({ count }) => count).count]);
        }

        const axisTransition = transition()
          .duration(750)
          .ease(easeQuadOut);

        xAxis.scale(xScale);
        yAxis.scale(yScale);

        xAxisContainer.transition(axisTransition).call(xAxis);

        yAxisContainer.transition(axisTransition).call(yAxis);

        const update = container.selectAll('g.runs').data(allRuns, d => d.id);
        const enter = update.enter();
        const exit = update.exit();

        // fade away exit selection
        const t = transition().duration(250);
        exit
          .select('circle')
          .transition(t)
          .attr('r', 0);
        exit
          .transition(t)
          .attr('opacity', 0)
          .remove();

        // resize update selection
        update
          .select('circle')
          .transition(t)
          .attr('r', d => radiusScale(d.count));

        // enter selection
        const g = enter
          .append('g')
          .attr('opacity', 1)
          .attr('class', 'runs')
          .on('click', d => {
            switch (d.type) {
              case 'HIGHEST_BEST_EFFORT':
                window.open(`/BestEffort/${d.id}`, '_self');
                break;
              case 'SEGMENT_GROUP':
                window.open(`/SegmentGroup/${d.id}`, '_self');
                break;
              case 'SEGMENT':
                window.open(`/Segment/${d.id}`, '_self');
                break;
              default:
                break;
            }
          })
          .on('mouseover', setSelectedItem)
          .on('mouseout', () => setSelectedItem());
        g.append('circle')
          .attr('class', 'circle')
          .attr('r', 0)
          .attr('cx', d => xScale(d.date))
          .attr('cy', d => yScale(d.distance))
          .transition(t)
          .delay(() => random(750))
          .attr('r', d => radiusScale(d.count));
        g.append('text')
          .attr('class', 'text')
          .attr('x', d => xScale(d.date))
          .attr('y', d => yScale(d.distance))
          .text(d => d.label);
      }
    },
    [allRuns, chart, hasElementEntered]
  );

  // selected item
  useEffect(
    () => {
      if (hasElementEntered) {
        const yScale = yScaleRef.current;
        const radiusScale = radiusScaleRef.current;
        const container = containerRef.current;

        const { type, id } = selectedItem;
        let runsToScan = [];
        switch (type) {
          case 'HIGHEST_BEST_EFFORT':
            runsToScan = runsByHighestBestEffortsWithType;
            break;
          case 'SEGMENT_GROUP':
            runsToScan = runsBySegmentGroupsWithType;
            break;
          case 'SEGMENT':
            runsToScan = runsBySegmentsWithType;
            break;
          default:
            break;
        }
        const selectedRun = find(runsToScan, run => run.id === id);
        const t = transition().duration(250);
        const update = container
          .selectAll('g.runs')
          .data(selectedRun ? [selectedRun] : [], d => d.id);
        update.select('.circle').classed('circle--selected', true);
        update
          .select('.text')
          .transition(t)
          .attr('y', d => yScale(d.distance) - radiusScale(d.count) - 5);

        const exit = update.exit();
        exit.select('.circle').classed('circle--selected', false);
        exit.select('.text').attr('y', d => yScale(d.distance));
      }
    },
    [allRuns, chart, hasElementEntered, selectedItem]
  );

  return <Chart className="ChartRunsByFrequency" ref={chart} />;
};

ChartRunsByFrequency.defaultProps = {
  matchingRunsPerSegmentGroups: [],
  matchingRunsByHighestBestEfforts: [],
  matchingRunsPerSegments: [],
  showBestEffortRuns: false,
  showSegmentGroupRuns: false,
  showSegmentRuns: false,
};

ChartRunsByFrequency.propTypes = {
  matchingRunsBySegmentGroups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      count: PropTypes.number,
      label: PropTypes.string,
      distance: PropTypes.number,
      date: PropTypes.instanceOf(Date),
    })
  ),
  matchingRunsByHighestBestEfforts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      count: PropTypes.number,
      label: PropTypes.string,
      distance: PropTypes.number,
      date: PropTypes.instanceOf(Date),
    })
  ),
  matchingRunsBySegments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      count: PropTypes.number,
      label: PropTypes.string,
      distance: PropTypes.number,
      date: PropTypes.instanceOf(Date),
    })
  ),
  showBestEffortRuns: PropTypes.bool,
  showSegmentGroupRuns: PropTypes.bool,
  showSegmentRuns: PropTypes.bool,
};

export default ChartRunsByFrequency;
