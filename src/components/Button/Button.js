import { active, secondary } from '../colors';
import styled from 'styled-components';

export default styled.button`
  background: ${secondary};
  padding: 5px 10px;
  margin: 5px;

  border: none;
  border-radius: 5px;

  color: white;

  cursor: pointer;

  &:hover {
    background: ${active};
  }
`;
