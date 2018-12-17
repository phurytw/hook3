import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { primary, bgSecondary } from '../colors';

const HighlightContainer = styled.a`
  width: 50%;
  min-height: 200px;
  text-align: center;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  color: ${primary};
  line-height: 48px;
  text-decoration: none;
`;

const HighlightTop = styled.div``;

const HightlightStat = styled.div`
  font-size: 48px;
  font-weight: bold;
  padding: 5px;
  transition: all 0.2s ease-in-out;
  background: ${bgSecondary};

  &:hover {
    transform: scale(1.1);
  }
`;

const HightlightBottom = styled.div``;

const Highlight = ({ url, renderTitle, renderHighlight, renderSubtitle }) => (
  <HighlightContainer href={url} target="_blank">
    <HighlightTop>{renderTitle()}</HighlightTop>
    <HightlightStat>{renderHighlight()}</HightlightStat>
    <HightlightBottom>{renderSubtitle()}</HightlightBottom>
  </HighlightContainer>
);

Highlight.defaultProps = {
  renderTitle: () => undefined,
  renderHighlight: () => undefined,
  renderSubtitle: () => undefined,
  url: undefined,
};

Highlight.propTypes = {
  renderTitle: PropTypes.func,
  renderHighlight: PropTypes.func,
  renderSubtitle: PropTypes.func,
  url: PropTypes.string,
};

export default Highlight;
