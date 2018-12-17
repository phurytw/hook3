import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SelectedItemContext from '../../contexts/SelectedItemContext';
import { primary, secondary, active } from '../colors';

const OList = styled.ol``;

const UList = styled.ul``;

const ListItem = styled.li`
  font-size: 24px;
  line-height: 32px;
`;

const Link = styled.a`
  color: ${primary};
  text-decoration: underline;

  cursor: pointer;

  &:hover {
    color: ${secondary};
  }

  &:active,
  &.selected {
    color: ${active};
  }
`;

const Text = styled.span`
  &.selected {
    color: ${active};
  }
`;

const ReferenceList = ({ items, ordered }) => {
  const { setSelectedItem, ...selectedItem } = useContext(SelectedItemContext);
  const ReferenceList = ordered ? OList : UList;
  return (
    <ReferenceList>
      {items.map(({ label, onClick, id, type }, key) => {
        const props = {
          onMouseOver: () => setSelectedItem({ type, id }),
          onMouseOut: () => setSelectedItem(),
          className:
            selectedItem.type === type && id === selectedItem.id
              ? 'selected'
              : '',
        };
        return (
          <ListItem key={key}>
            {onClick ? (
              <Link {...props} onClick={onClick}>
                {label}
              </Link>
            ) : (
              <Text {...props}>{label}</Text>
            )}
          </ListItem>
        );
      })}
    </ReferenceList>
  );
};

ReferenceList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func,
      id: PropTypes.number,
      type: PropTypes.string,
    })
  ),
  ordered: PropTypes.bool,
};

ReferenceList.defaultProps = {
  items: [],
  ordered: false,
};

export default ReferenceList;
