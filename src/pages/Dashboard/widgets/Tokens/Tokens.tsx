import { MouseEvent, useEffect } from 'react';
import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import { useNavigate } from 'react-router-dom';
import { OutputContainer } from 'components';
import { useGetAccountInfo, TokenType } from 'lib';
import { DataTestIdsEnum } from 'localConstants';
import { ItemsIdentifiersEnum } from 'pages/Dashboard/dashboard.types';
import { useLazyGetTokensQuery } from 'redux/endpoints';
import { routeNames } from 'routes';
import { TokenRow } from './components';

// prettier-ignore
const styles = {
  tokensContainer: 'batch-tx flex flex-col gap-6',
  buttonsContainer: 'buttons-container flex flex-col md:flex-row gap-2 items-start',
  batchTxButton: 'batch-tx-button text-sm font-normal'
} satisfies Record<string, string>;

export const Tokens = () => {
  const { websocketEvent, address } = useGetAccountInfo();
  const [fetchTokens, { data: tokens, isLoading }] = useLazyGetTokensQuery();
  const navigate = useNavigate();

  const handleIssueToken = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(routeNames.issueToken);
  };

  useEffect(() => {
    fetchTokens(address);
  }, [address, websocketEvent]);

  if (!isLoading && tokens?.length === 0) {
    return (
      <div id={ItemsIdentifiersEnum.tokens} className={styles.tokensContainer}>
        <OutputContainer>
          <p>No tokens found</p>
        </OutputContainer>

        <MvxButton
          onClick={handleIssueToken}
          data-testid={DataTestIdsEnum.issueTokenBtn}
          size='small'
        >
          <span className='text-sm font-normal'>Issue Token</span>
        </MvxButton>
      </div>
    );
  }

  return (
    <div id={ItemsIdentifiersEnum.tokens} className={styles.tokensContainer}>
      <OutputContainer isLoading={isLoading}>
        <div className='flex flex-col gap-2'>
          {tokens?.map((token: TokenType) => (
            <TokenRow key={token.identifier} token={token} />
          ))}
        </div>
      </OutputContainer>

      <MvxButton
        onClick={handleIssueToken}
        data-testid={DataTestIdsEnum.issueTokenBtn}
        size='small'
      >
        <span className='text-sm font-normal'>Issue Token</span>
      </MvxButton>
    </div>
  );
};
