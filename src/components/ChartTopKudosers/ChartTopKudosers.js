import React, { useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { maxBy, take, find } from 'lodash-es';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisBottom } from 'd3-axis';
import { easeQuadOut, easeQuadInOut } from 'd3-ease';
import 'd3-transition';
import { secondary, bgSecondary, active } from '../colors';
import useHasElementEntered from '../../hooks/useHasElementEntered';
import SelectedItemContext from '../../contexts/SelectedItemContext';

const Chart = styled.div`
  & .x-axis text {
    font-size: 16px;
    text-anchor: middle;
    font-family: Acme;
  }

  & .bar {
    fill: ${secondary};

    &:hover,
    &--selected {
      fill: ${active};
    }
  }

  & .kudoser {
    cursor: pointer;

    & .label {
      text-anchor: start;
      font-size: 24px;
      fill: white;
      pointer-events: none;
    }
  }
`;

const ChartTopKudosers = props => {
  const { setSelectedItem, ...selectedItem } = useContext(SelectedItemContext);
  const chart = useRef();
  const hasElementEntered = useHasElementEntered(chart);
  const xScaleRef = useRef();
  const xAxisRef = useRef();
  const yScaleRef = useRef();
  const containerRef = useRef();
  const xAxisContainerRef = useRef();
  const kudosers = take(props.kudosers, 10);

  // SVG creation (only run once)
  useEffect(
    () => {
      const margin = { top: 10, right: 10, bottom: 30, left: 10 };
      const width = 600 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const svg = select(chart.current)
        .append('svg')
        .attr(
          'viewBox',
          `0 0 ${width + margin.left + margin.right} ${height +
            margin.top +
            margin.bottom}`
        );

      // background
      svg
        .append('rect')
        .attr('fill', bgSecondary)
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

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

      xScaleRef.current = scaleLinear().range([0, width]);
      yScaleRef.current = scaleBand()
        .padding(0.2)
        .range([0, height]);
      xAxisRef.current = axisBottom(xScaleRef.current);
    },
    [chart]
  );

  // SVG drawing and update
  useEffect(
    () => {
      if (hasElementEntered) {
        const xScale = xScaleRef.current;
        const yScale = yScaleRef.current;
        const xAxis = xAxisRef.current;
        const container = containerRef.current;
        const xAxisContainer = xAxisContainerRef.current;

        // set domains
        xScale.domain([
          0,
          maxBy(kudosers, ({ kudosCount }) => kudosCount).kudosCount,
        ]);
        yScale.domain(kudosers.map(d => d.id));

        // update scales
        xAxis.scale(xScale);
        xAxisContainer.call(xAxis).selectAll('text');

        const enter = container
          .selectAll('rect')
          .data(kudosers)
          .enter();

        const g = enter
          .append('g')
          .attr('class', 'kudoser')
          .on('click', d =>
            window.open(`https://www.strava.com/athletes/${d.id}`, '_blank')
          )
          .on('mouseover', ({ id }) => setSelectedItem({ type: 'KUDOSER', id }))
          .on('mouseout', () => setSelectedItem());
        g.append('rect')
          .attr('class', 'bar')
          .attr('y', d => yScale(d.id))
          .attr('height', yScale.bandwidth())
          .transition()
          .duration(750)
          .ease(easeQuadOut)
          .attr('x', () => 0)
          .attr('width', d => xScale(d.kudosCount));
        const textContainer = g.append('g');
        textContainer
          .attr('opacity', 0)
          .transition()
          .duration(500)
          .delay((d, i) => 750 + i * 50)
          .ease(easeQuadInOut)
          .attr('opacity', 1);
        textContainer
          .append('text')
          .attr('class', 'label')
          .attr('y', d => yScale(d.id) + 28)
          .transition()
          .duration(500)
          .delay((d, i) => 750 + i * 50)
          .ease(easeQuadInOut)
          .attr('x', () => 5)
          .text(d => `${d.firstname} ${d.lastname}`);
      }
    },
    [kudosers, chart, hasElementEntered]
  );

  // selected item
  useEffect(
    () => {
      if (hasElementEntered) {
        const { id, type } = selectedItem;

        let selectedKudoser;
        switch (type) {
          case 'KUDOSER':
            selectedKudoser = find(kudosers, k => k.id === id);
            break;
          default:
            break;
        }
        const container = containerRef.current;
        const update = container
          .selectAll('.bar')
          .data(selectedKudoser ? [selectedKudoser] : [], d => d.id);
        update.classed('bar--selected', true);
        update.exit().classed('bar--selected', false);
      }
    },
    [selectedItem, kudosers, hasElementEntered, chart]
  );

  return <Chart className="ChartTopKudosers" ref={chart} />;
};

ChartTopKudosers.propTypes = {
  kudosers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      kudosCount: PropTypes.number,
    })
  ),
};

ChartTopKudosers.defaultProps = {
  kudosers: [],
};

export default ChartTopKudosers;
