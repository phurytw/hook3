import { useState, useEffect } from 'react';

export default ref => {
  const [hasElementEntered, setHasElementEntered] = useState(false);
  const checkIfVisible = e => {
    try {
      const { top, right, bottom, left } = e.getBoundingClientRect();
      return (
        top >= 0 &&
        left >= 0 &&
        bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    } catch (error) {
      return false;
    }
  };

  useEffect(
    () => {
      const listener = () => {
        if (checkIfVisible(ref.current)) {
          setHasElementEntered(true);
          return true;
        }
        return false;
      };
      if (!listener()) {
        if (ref) {
          window.addEventListener('scroll', listener);
          window.addEventListener('resize', listener);
        }
        return () => {
          window.removeEventListener('scroll', listener);
          window.removeEventListener('resize', listener);
        };
      }
      return () => undefined;
    },
    [ref]
  );

  return hasElementEntered;
};
