import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { PageState } from 'components';

import { ScreenStatePropsType } from 'types';
import { useWalletOrigin } from 'hooks/navigation/useWalletOrigin';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export const SuccessState = ({
  title = 'Success',
  message,
  'data-testid': dataTestId,
  hideButton = false,
  className
}: ScreenStatePropsType) => {
  const walletOrigin = useWalletOrigin();

  return (
    <PageState
      title={title}
      icon={faCheck}
      iconClass='fa-3x text-success'
      className={classNames('mt-3', className)}
      description={message}
      action={
        !hideButton && (
          <Link
            to={walletOrigin.hrefValue}
            className='btn btn-lg btn-primary'
            data-testid={dataTestId}
          >
            Close
          </Link>
        )
      }
    />
  );
};
