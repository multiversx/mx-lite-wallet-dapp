import React, { useEffect } from 'react';
import { Navigate as RouterNavigate, NavigateProps } from 'react-router-dom';

const NAVIGATE_DEBUG = false;

export const Navigate = (
  props: NavigateProps & {
    from: string;
  }
) => {
  const { from, ...rest } = props;
  useEffect(() => {
    if (NAVIGATE_DEBUG) {
      console.log(`Navigating from ${from} to:`, { to: props.to });
    }
  }, []);

  return <RouterNavigate {...rest} />;
};
