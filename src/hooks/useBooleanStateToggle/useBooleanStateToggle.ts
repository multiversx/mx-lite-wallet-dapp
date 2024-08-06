import { MouseEvent, useState } from 'react';

export const useBooleanStateToggle = (initialState = false) => {
  const [isSet, setState] = useState(Boolean(initialState));

  const toggleState = (e?: MouseEvent) => {
    e?.preventDefault();
    setState((current) => !current);
  };

  return {
    isSet,
    setState,
    toggleState
  };
};
