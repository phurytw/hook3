import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { bgSecondary, primary } from '../colors';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ProfilePicture = styled.div`
  background: ${bgSecondary};
  padding: 10px;
  flex: 0;

  & img {
    border: 5px solid ${primary};
  }
`;

const Main = styled.div`
  padding: 10px 30px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;

const Title = styled.h1`
  font-size: 48px;
`;

const Header = ({ profilePicture, fullName }) => (
  <HeaderContainer>
    <ProfilePicture>
      <Link to="/">
        <img src={profilePicture} alt="" />
      </Link>
    </ProfilePicture>
    <Main>
      <Title>
        <FormattedMessage id="header.hello" values={{ name: fullName }} />
      </Title>
    </Main>
  </HeaderContainer>
);

Header.propTypes = {
  athleteId: PropTypes.number,
  profilePicture: PropTypes.string,
  fullName: PropTypes.string,
};

Header.defaultProps = {
  athleteId: undefined,
  profilePicture: '',
  fullName: '',
};

export default Header;
