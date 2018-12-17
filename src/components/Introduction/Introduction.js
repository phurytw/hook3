import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import Button from '../Button';
import ContainerBase from '../Container';
import Footer from '../Footer';

const Container = styled(ContainerBase)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Content = styled.main`
  text-align: center;
`;

const Introduction = ({ onStart }) => (
  <Container>
    <Content>
      <div>
        <h1>
          <FormattedMessage id="introduction.title" />
        </h1>
        <article>
          <FormattedHTMLMessage id="introduction.description" />
        </article>
        <Button onClick={onStart}>
          <FormattedMessage id="introduction.getStartedButton" />
        </Button>
      </div>
    </Content>
    <Footer />
  </Container>
);

Introduction.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default Introduction;
