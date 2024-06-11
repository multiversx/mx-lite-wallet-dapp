import React, { PropsWithChildren, ReactNode, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams
} from 'react-router-dom';

import { useWalletOrigin, useGetIsLoggedIn } from 'hooks';

import { sendModalRouteStateSelector } from 'redux/selectors';
import { routeNames, RouteType } from 'routes';
import { ModalBackButton } from './components/ModalBackButton';
import { ModalCloseButton } from './components/ModalCloseButton';
import { ModalContainer, PageState } from 'components';
import { ACCESS_TOKEN_KEY } from 'localConstants';

export interface ModalLayoutPropsType
  extends PropsWithChildren,
    Omit<RouteType, 'component' | 'path'> {
  handleClose?: () => void;
  noTabindex?: boolean;
  path?: string;
  progressBar?: ReactNode;
  show?: boolean;
}

export const ModalLayout = ({
  authenticatedRoute,
  children,
  className,
  closeOnEscape,
  'data-testid': dataTestId,
  handleClose,
  hideHeaderCloseBtn,
  nestedRoutes,
  noTabindex,
  onBack,
  progressBar,
  show = true,
  subtitle,
  title
}: ModalLayoutPropsType) => {
  let modalTitle = title;
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const sendModalRouteState = useSelector(sendModalRouteStateSelector);
  const accessToken = searchParams.get(ACCESS_TOKEN_KEY);
  const isLoggedIn = useGetIsLoggedIn();
  const navigate = useNavigate();
  const walletOrigin = useWalletOrigin();
  const showHeaderCloseButton = !hideHeaderCloseBtn;
  const hasHeader = onBack || showHeaderCloseButton;
  const isForbiddenModalRouteAccess =
    authenticatedRoute && !isLoggedIn && !accessToken;

  const isModalNarrow = sendModalRouteState?.narrowModal !== false;

  if (!title && nestedRoutes) {
    const currentRoute = nestedRoutes.find((route) =>
      pathname.endsWith(route.path)
    );

    if (currentRoute) {
      modalTitle = currentRoute.title;
    }
  }

  const onClose = () => {
    handleClose?.();

    if (showHeaderCloseButton || closeOnEscape) {
      navigate(walletOrigin.hrefValue);
    }
  };

  useEffect(() => {
    if (noTabindex) {
      const bsModal = document.querySelector(`.modal-layout.${className}`);
      bsModal?.removeAttribute('tabindex');
    }
  }, [noTabindex]);

  if (isForbiddenModalRouteAccess) {
    return <Navigate to={routeNames.unlock} />;
  }

  return (
    <ModalContainer
      data-testid={dataTestId ?? 'modal'}
      visible={show}
      className={classNames('modal-layout', className, {
        hasProgressbar: Boolean(progressBar),
        small: isModalNarrow
      })}
    >
      <PageState
        description={
          <>
            {hasHeader && (
              <div
                className={classNames('modal-layout-heading', {
                  hasProgressBar: Boolean(progressBar)
                })}
              >
                {onBack && <ModalBackButton onClick={onBack} />}
                {showHeaderCloseButton && (
                  <ModalCloseButton onClick={onClose} />
                )}
              </div>
            )}
            <div
              className={classNames('modal-layout-content', {
                spaced: !hasHeader
              })}
            >
              {progressBar && (
                <div className='modal-layout-progress'>{progressBar}</div>
              )}

              {Boolean(modalTitle) && (
                <div className='modal-layout-title' data-testid='modalTitle'>
                  {modalTitle}
                </div>
              )}

              {subtitle && (
                <div className='modal-layout-subtitle'>{subtitle}</div>
              )}
              <div className='modal-layout-children'>{children}</div>
            </div>
          </>
        }
      />
    </ModalContainer>
  );
};
