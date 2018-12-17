import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
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
    <Link href="https://github.com/lith-light-g/hook3">
      <FormattedMessage id="footer.source" />
    </Link>
    -
    <Link href="https://lith-light-g.github.io/hook3/storybook">Storybook</Link>
  </Footer>
);
