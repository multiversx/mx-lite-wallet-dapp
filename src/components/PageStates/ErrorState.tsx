import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

import { PageState } from 'components';

import { routeNames } from 'routes';
import { useWalletOrigin } from 'hooks/navigation/useWalletOrigin';
import { ScreenStatePropsType } from 'types';

export const ErrorState = ({
  'data-testid': dataTestId,
  buttonLabel = 'Close',
  className,
  hideButton = false,
  message = 'Try again',
  onButtonClick,
  onRedirect,
  showBackButton,
  title = 'Failed loading data'
}: ScreenStatePropsType) => {
  const walletOrigin = useWalletOrigin();
  const navigate = useNavigate();
  const pathname =
    window.location.pathname === walletOrigin.pathname
      ? routeNames.dashboard
      : walletOrigin.pathname;

  const onClick = (e: React.MouseEvent) => {
    if (onButtonClick) {
      onButtonClick(e);
    } else {
      navigate(pathname);
    }
  };

  return (
    <PageState
      icon={faTimes}
      iconClass='fa-3x danger'
      title={title}
      description={message}
      className={className}
      action={
        !hideButton && (
          <div className='centered-column'>
            <button
              onClick={onClick}
              className='btn btn-lg btn-primary'
              data-testid={dataTestId}
            >
              {buttonLabel}
            </button>

            {showBackButton && (
              <Link
                onClick={onRedirect}
                to={pathname}
                className='btn'
                data-testid={dataTestId}
              >
                Go back
              </Link>
            )}
          </div>
        )
      }
    />
  );
};
