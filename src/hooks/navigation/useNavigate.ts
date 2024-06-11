import {
  NavigateFunction,
  NavigateOptions,
  To,
  useNavigate as originalUseNavigate
} from 'react-router-dom';

export const NAVIGATE_DEBUG = false;

export const useNavigate = (props?: { from: string }) => {
  const navigate = originalUseNavigate();
  // create a wrapper around the original useNavigate hook
  const wrapper: NavigateFunction = (
    to: To | number,
    options?: NavigateOptions
  ) => {
    if (NAVIGATE_DEBUG) {
      console.log(`Navigating from ${props?.from} to:`, { to });
    }
    navigate(to as To, options);
  };

  return wrapper;
};
