import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TokenType } from '@multiversx/sdk-dapp/types/tokens.types';
import { FormatAmount } from 'components';

export const TokenRow = ({ token }: { token: TokenType }) => {
  const logo = token.assets?.svgUrl;

  return (
    <div className='flex items-center justify-between p-4 rounded-lg'>
      <div className='flex items-center space-x-4'>
        {logo ? (
          <img src={logo} alt={token.ticker} className='w-8 h-8' />
        ) : (
          <FontAwesomeIcon icon={faCoins} className='token-item-logo-coins' />
        )}
        <div>{token.ticker}</div>
      </div>
      {token.balance && (
        <div className='text-right'>
          <FormatAmount value={token.balance} showLabel={false} />
        </div>
      )}
    </div>
  );
};
