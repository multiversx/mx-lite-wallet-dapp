import { MouseEventHandler } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PasswordVisibilityTogglePropsType {
  isVisible: boolean;
  onVisibilityChange: MouseEventHandler;
}

export const PasswordVisibilityToggle = ({
  isVisible,
  onVisibilityChange
}: PasswordVisibilityTogglePropsType) => (
  <span className='password-visibility-toggle' onClick={onVisibilityChange}>
    <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} />
  </span>
);
