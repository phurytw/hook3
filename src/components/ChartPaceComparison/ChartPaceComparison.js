import { axisLeft } from 'd3-axis';
import { easeQuadOut } from 'd3-ease';
import { scaleBand, scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { find, maxBy } from 'lodash-es';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SelectedItemContext from '../../contexts/SelectedItemContext';
import useHasElementEntered from '../../hooks/useHasElementEntered';
import { active, primary, bgSecondary, secondary } from '../colors';

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

  & .bar {
    rect {
      &.average {
        fill: black;
      }
      &.max {
        fill: ${secondary};
      }
    }

    text {
      &.bar-label {
        fill: ${primary};
        opacity: 0;
        text-anchor: middle;
      }
      &.speed {
        fill: white;
        font-size: 12px;
      }
    }

    &--selected,
    &:hover,
    &:focus {
      rect {
        &.average,
        &.max {
          fill: ${active};
        }
      }

      text.bar-label {
        opacity: 1;
      }
    }
  }

  & .bar-label {
  }
`;

const ChartPaceComparison = ({ runs, mode }) => {
  const margin = { top: 60, right: 60, bottom: 60, left: 60 };
  const width = 800 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;
  const { setSelectedItem, ...selectedItem } = useContext(SelectedItemContext);
  const chart = useRef();
  const hasElementEntered = useHasElementEntered(chart);
  const xScaleRef = useRef();
  const yScaleRef = useRef();
  const yAxisRef = useRef();
  const containerRef = useRef();
  const yAxisContainerRef = useRef();

  const convertMPSToKMPH = mps => (mps * 3600) / 1000;
  const convertMPSToMinPKM = mps => 16.666666666667 / mps;

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

      // y-axis container
      yAxisContainerRef.current = container.append('g').attr('class', 'y-axis');

      xScaleRef.current = scaleBand()
        .padding(0.2)
        .range([0, width]);
      yScaleRef.current = scaleLinear().range([height, 0]);
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
        const yAxis = yAxisRef.current;
        const container = containerRef.current;
        const yAxisContainer = yAxisContainerRef.current;

        if (Object.keys(runs).length === 0) {
          xScale.domain([]);
          yScale.domain([0, 25]);
        } else {
          xScale.domain(runs.map(r => r.id));
          yScale.domain([
            0,
            convertMPSToKMPH(maxBy(runs, r => r.max_speed).max_speed),
          ]);
        }

        const axisTransition = transition()
          .duration(750)
          .ease(easeQuadOut);

        yAxis.scale(yScale);

        yAxisContainer.transition(axisTransition).call(yAxis);

        const update = container.selectAll('g.bar').data(runs, d => d.id);
        const enter = update.enter();

        // enter selection
        const g = enter.append('g').attr('class', 'bar');
        // avg rect
        g.append('rect')
          .attr('class', 'average')
          .attr('x', d => xScale(d.id))
          .attr('y', d => yScale(convertMPSToKMPH(d.average_speed)))
          .attr('width', () => xScale.bandwidth())
          .on('mouseover', setSelectedItem)
          .on('mouseout', () => setSelectedItem())
          .transition()
          .duration(750)
          .ease(easeQuadOut)
          .attr('y', d => yScale(convertMPSToKMPH(d.average_speed)))
          .attr(
            'height',
            d => height - yScale(convertMPSToKMPH(d.average_speed))
          );
        // max rect
        g.append('rect')
          .attr('class', 'max')
          .attr('x', d => xScale(d.id))
          .attr(
            'y',
            d =>
              height -
              yScale(convertMPSToKMPH(d.max_speed)) +
              yScale(convertMPSToKMPH(d.average_speed))
          )
          .attr('width', () => xScale.bandwidth())
          .on('mouseover', setSelectedItem)
          .on('mouseout', () => setSelectedItem())
          .transition()
          .duration(750)
          .ease(easeQuadOut)
          .attr('y', d => yScale(convertMPSToKMPH(d.max_speed)))
          .attr(
            'height',
            d =>
              height -
              yScale(convertMPSToKMPH(d.max_speed)) -
              (height - yScale(convertMPSToKMPH(d.average_speed)))
          );
        // name label
        g.append('text')
          .attr('class', 'bar-label')
          .attr('x', d => xScale(d.id) + xScale.bandwidth() / 2)
          .attr('y', () => height + 20)
          .text(d => d.name);
        // avg speed label
        g.append('text')
          .attr('class', 'speed')
          .attr('x', d => xScale(d.id) + xScale.bandwidth() - 5)
          .attr('y', () => height)
          .attr(
            'transform',
            d =>
              `rotate(-90, ${xScale(d.id) + xScale.bandwidth() - 5}, ${height})`
          )
          .text(
            d =>
              `${convertMPSToKMPH(d.average_speed).toPrecision(
                2
              )} km/h (${convertMPSToMinPKM(d.average_speed).toPrecision(
                2
              )} min/km)`
          );
        // max speed label
        g.append('text')
          .attr('class', 'speed')
          .attr('x', d => xScale(d.id) + 16)
          .attr(
            'y',
            d => height - (height - yScale(convertMPSToKMPH(d.average_speed)))
          )
          .attr(
            'transform',
            d =>
              `rotate(-90, ${xScale(d.id) + 16}, ${height -
                (height - yScale(convertMPSToKMPH(d.average_speed)))})`
          )
          .text(
            d =>
              `${convertMPSToKMPH(d.max_speed).toPrecision(
                2
              )} km/h (${convertMPSToMinPKM(d.max_speed).toPrecision(
                2
              )} min/km)`
          );
      }
    },
    [runs, chart, hasElementEntered, mode]
  );

  // selected item
  useEffect(
    () => {
      if (hasElementEntered) {
        const container = containerRef.current;
        const { type, id } = selectedItem;
        const selectedRun = find(
          runs,
          run => run.id === id && run.type === type
        );
        // stroke colors
        const update = container
          .selectAll('.bar')
          .data(selectedRun ? [selectedRun] : [], d => d.id);
        update.classed('bar--selected', true);
        const exit = update.exit();
        exit.classed('bar--selected', false);
      }
    },
    [runs, chart, hasElementEntered, selectedItem]
  );

  return <Chart className="ChartPaceComparison" ref={chart} />;
};

ChartPaceComparison.defaultProps = {
  runs: [],
  mode: 'absolute',
};

ChartPaceComparison.propTypes = {
  runs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      max_speed: PropTypes.number,
      average_speed: PropTypes.number,
      type: PropTypes.string,
    })
  ),
  mode: PropTypes.string,
};

export default ChartPaceComparison;
