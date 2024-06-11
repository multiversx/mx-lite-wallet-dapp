import { MouseEvent } from 'react';

export interface ScreenStatePropsType {
  ['data-testid']?: string;
  buttonLabel?: string;
  className?: string;
  hideButton?: boolean;
  message?: string;
  onButtonClick?: (e: MouseEvent) => void;
  onRedirect?: (e: MouseEvent) => void;
  showBackButton?: boolean;
  title?: string;
}
