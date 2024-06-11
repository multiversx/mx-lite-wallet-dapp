import { TokenType } from '@multiversx/sdk-dapp/types/tokens.types';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { activeNetworkSelector } from 'redux/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Balance } from '@multiversx/sdk-dapp/UI';

export const TokenRow = ({ token }: { token: TokenType }) => {
  const { egldLabel } = useSelector(activeNetworkSelector);
  const logo = token.assets?.svgUrl;

  return (
    <div className='token-item' data-testid={token.identifier}>
      <div
        className={classNames('token-item-logo', {
          egld: egldLabel === token.ticker,
          empty: !logo
        })}
      >
        {logo ? (
          <img src={logo} className='token-item-logo-icon' />
        ) : (
          <FontAwesomeIcon icon={faCoins} className='token-item-logo-coins' />
        )}
      </div>

      <div className='token-item-wrapper'>
        <div className='token-item-left'>
          <div className='token-item-ticker'>{token.ticker}</div>
        </div>

        <div className='token-item-right'>
          <Balance amount={String(token.balance)} showTokenLabel={false} />
        </div>
      </div>
    </div>
  );
};
