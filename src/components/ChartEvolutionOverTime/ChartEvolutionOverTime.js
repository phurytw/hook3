import { axisBottom, axisLeft } from 'd3-axis';
import { easeLinear, easeQuadOut } from 'd3-ease';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { curveCardinal, line, area } from 'd3-shape';
import { transition } from 'd3-transition';
import dateAddHours from 'date-fns/add_hours';
import { find, maxBy, random, sumBy, take } from 'lodash-es';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import SelectedItemContext from '../../contexts/SelectedItemContext';
import useHasElementEntered from '../../hooks/useHasElementEntered';
import { bgSecondary, secondary, active } from '../colors';

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
`;

const ChartDistanceComparison = ({ runs }) => {
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
  const containerRef = useRef();
  const xAxisContainerRef = useRef();
  const yAxisContainerRef = useRef();
  const runsWithColors = useMemo(() =>
    runs.map(
      r => ({
        ...r,
        color: `rgb(${random(64)}, ${random(64)}, ${random(128)})`,
      }),
      [runs]
    )
  );

  const getTotalTime = r => sumBy(r, ({ time }) => time);
  const getTotalDistance = r => sumBy(r, ({ distance }) => distance);

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

      // gradient defs
      const areaGradient = svg
        .append('defs')
        .append('linearGradient')
        .attr('id', 'areaGradient');
      areaGradient
        .append('stop')
        .attr('offset', '0%')
        .attr('stop-color', bgSecondary);
      areaGradient
        .append('stop')
        .attr('offset', '100%')
        .attr('stop-color', active);

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

      xScaleRef.current = scaleLinear().range([0, width]);
      yScaleRef.current = scaleLinear().range([0, height]);
      xAxisRef.current = axisBottom(xScaleRef.current);
      yAxisRef.current = axisLeft(yAxisRef.current);
    },
    [chart]
  );

  // SVG drawing and updating
  useEffect(
    () => {
      if (hasElementEntered) {
        const xScale = xScaleRef.current;
        const yScale = yScaleRef.current;
        const xAxis = xAxisRef.current;
        const yAxis = yAxisRef.current;
        const container = containerRef.current;
        const xAxisContainer = xAxisContainerRef.current;
        const yAxisContainer = yAxisContainerRef.current;

        if (Object.keys(runs).length === 0) {
          xScale.domain([0, dateAddHours(new Date(0), 1).getTime()]);
          yScale.domain([21097, 0]);
        } else {
          xScale.domain([
            0,
            getTotalTime(maxBy(runs.map(({ splits }) => splits), getTotalTime)),
          ]);
          yScale.domain([
            getTotalDistance(
              maxBy(runs.map(({ splits }) => splits), getTotalDistance)
            ),
            0,
          ]);
        }

        const axisTransition = transition()
          .duration(750)
          .ease(easeQuadOut);

        xAxis.scale(xScale);
        yAxis.scale(yScale);

        xAxisContainer.transition(axisTransition).call(xAxis);
        yAxisContainer.transition(axisTransition).call(yAxis);

        const lineFn = line()
          .x(d => xScale(d.time))
          .y(d => yScale(d.distance))
          .curve(curveCardinal);

        const update = container
          .selectAll('g.runs')
          .data(runsWithColors, d => d.id);
        const enter = update.enter();
        const exit = update.exit();

        // enter selection
        enter
          .append('path')
          .attr('class', 'line')
          .attr('d', d =>
            lineFn([
              {
                speed: 0,
                distance: 0,
                time: 0,
              },
              ...d.splits.map((split, i) =>
                take(d.splits, i + 1).reduce((acc, cur) => ({
                  ...acc,
                  time: acc.time + cur.time,
                  distance: acc.distance + cur.distance,
                }))
              ),
            ])
          )
          .attr('stroke', d => d.color)
          .attr('stroke-width', 2)
          .attr('fill', 'none')
          .attr('stroke-dasharray', function() {
            const totalLength = this.getTotalLength();
            return totalLength + ' ' + totalLength;
          })
          .attr('stroke-dashoffset', function() {
            return this.getTotalLength();
          })
          .on('mouseover', d => setSelectedItem(d))
          .on('mouseout', () => setSelectedItem())
          .transition()
          .duration(10000)
          .ease(easeLinear)
          .attr('stroke-dashoffset', 0);

        // exit selection
        exit.remove();
      }
    },
    [runs, chart, hasElementEntered]
  );

  // selected item
  useEffect(
    () => {
      if (hasElementEntered) {
        const xScale = xScaleRef.current;
        const yScale = yScaleRef.current;
        const container = containerRef.current;

        const { type, id } = selectedItem;
        const selectedRun = find(
          runs,
          run => run.id === id && run.type === type
        );
        if (selectedRun) {
          // stroke colors
          const update = container
            .selectAll('.line')
            .data([selectedRun], d => d.id);
          update.attr('stroke', 'white');
          const exit = update.exit();
          exit.attr('stroke', 'black');

          // km areas
          const areaFn = area()
            .x(d => xScale(d.time))
            .y1(0)
            .y0(yScale(0));

          let data = [
            {
              speed: 0,
              distance: 0,
              time: 0,
            },
            ...selectedRun.splits.map((split, i) =>
              take(selectedRun.splits, i + 1).reduce((acc, cur) => ({
                ...acc,
                time: acc.time + cur.time,
                distance: acc.distance + cur.distance,
              }))
            ),
          ];

          data = data
            .map((split, i) => {
              if (data[i + 1]) {
                return [split, data[i + 1]];
              }
              return undefined;
            })
            .filter(v => v);
          const enter = container
            .selectAll('.area')
            .data(data)
            .enter();
          const g = enter
            .append('g')
            .attr('class', 'area')
            .attr('opacity', 0);
          g.transition()
            .duration(250)
            .attr('opacity', 0.2);
          g.append('path')
            .attr('d', d => areaFn(d))
            .attr('fill', 'url(#areaGradient)')
            .attr('stroke', secondary);
        } else {
          container
            .selectAll('.line')
            .data(runsWithColors, d => d.id)
            .attr('stroke', d => d.color);
          container.selectAll('.area').remove();
        }
      }
    },
    [runs, chart, hasElementEntered, selectedItem]
  );

  return <Chart className="ChartEvolutionOverTime" ref={chart} />;
};

ChartDistanceComparison.defaultProps = {
  runs: [],
};

ChartDistanceComparison.propTypes = {
  runs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
      splits: PropTypes.arrayOf(
        PropTypes.shape({
          // speed in mps
          speed: PropTypes.number,
          // distance in m
          distance: PropTypes.number,
          // time in s
          time: PropTypes.number,
        })
      ),
    })
  ),
};

export default ChartDistanceComparison;
