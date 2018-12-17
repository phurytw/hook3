import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import SelectedItemContext from './SelectedItemContext';

const SelectedItemProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState({});
  const value = useMemo(
    () => ({
      ...selectedItem,
      setSelectedItem: item => {
        // const nextItem = item
        //   ? { id: item.id, type: item.type }
        //   : { id: undefined, type: '' };
        // if (nextItem.id) console.log(nextItem);
        setSelectedItem(item ? item : { id: undefined, type: '' });
      },
    }),
    [selectedItem]
  );
  return (
    <SelectedItemContext.Provider value={value}>
      {children}
    </SelectedItemContext.Provider>
  );
};

SelectedItemProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

SelectedItemProvider.defaultProps = {
  children: undefined,
};

export default SelectedItemProvider;
