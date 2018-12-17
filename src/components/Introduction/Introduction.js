import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
          Welcome to Hook3! A Strava performance analyzer created using React
          hooks and D3!
        </h1>
        <article>
          Get pointless statistics about you such as:
          <div>Your performance over time on matching group of segments!</div>
          <div>Your name!</div>
        </article>
        <Button onClick={onStart}>Let's get started!</Button>
      </div>
    </Content>
    <Footer />
  </Container>
);

Introduction.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default Introduction;
