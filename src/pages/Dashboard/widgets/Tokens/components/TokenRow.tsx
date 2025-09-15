import { MouseEvent } from 'react';
import { faArrowUp, faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import { useNavigate } from 'react-router-dom';
import { FormatAmount, TokenType } from 'lib';
import { SearchParamsEnum } from 'localConstants';
import { sendRouteBuilder } from 'routes';

// prettier-ignore
const styles = {
  tokenRowContainer: 'token-row-container flex items-center justify-between border border-secondary rounded-xl p-2 transition-all duration-200 ease-in-out',
  tokenRowContent: 'token-row-content flex items-center space-x-4 transition-all duration-200 ease-in-out'
} satisfies Record<string, string>;

export const TokenRow = ({ token }: { token: TokenType }) => {
  const navigate = useNavigate();
  const logo = token.assets?.svgUrl;

  const handleSend = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    navigate(
      sendRouteBuilder({
        [SearchParamsEnum.tokenId]: token.identifier
      })
    );
  };

  return (
    <div className={styles.tokenRowContainer}>
      <div className={styles.tokenRowContent}>
        {logo ? (
          <img src={logo} alt={token.ticker} className='w-8 h-8' />
        ) : (
          <FontAwesomeIcon icon={faCoins} className='token-item-logo-coins' />
        )}

        <div>{token.ticker}</div>
      </div>

      <div className={styles.tokenRowContent}>
        {token.balance && (
          <div className='text-right'>
            <FormatAmount value={token.balance} showLabel={false} />
          </div>
        )}
        <MvxButton
          onClick={handleSend}
          data-testid={`send-${token.identifier}`}
          size='small'
        >
          <FontAwesomeIcon icon={faArrowUp} className='text-sm font-normal' />
        </MvxButton>
      </div>
    </div>
  );
};
