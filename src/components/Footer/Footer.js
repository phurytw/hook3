import React from 'react';
import styled from 'styled-components';
import { primary, secondary } from '../colors';

const Footer = styled.footer`
  padding: 50px;
  text-align: center;
`;

const Link = styled.a`
  font-size: 24px;
  color: ${primary};
  margin: 30px;

  &:hover {
    color: ${secondary};
  }
`;

export default () => (
  <Footer>
    <Link href="https://github.com/lith-light-g/hook3">Source code</Link>-
    <Link href="https://lith-light-g.github.io/hook3/storybook">Storybook</Link>
  </Footer>
);
