import { useEffect } from 'react';
import { TokenType } from '@multiversx/sdk-dapp/types/tokens.types';
import { OutputContainer } from 'components';
import { useGetAccountInfo } from 'hooks';
import { useLazyGetTokensQuery } from 'redux/endpoints';
import { TokenRow } from './components';

export const Tokens = () => {
  const { websocketEvent, address } = useGetAccountInfo();
  const [fetchTokens, { data: tokens, isLoading }] = useLazyGetTokensQuery();

  useEffect(() => {
    fetchTokens(address);
  }, [address, websocketEvent]);

  if (!isLoading && tokens?.length === 0) {
    return (
      <OutputContainer>
        <p className='text-gray-400'>No tokens found</p>
      </OutputContainer>
    );
  }

  return (
    <div className='flex flex-col'>
      <OutputContainer isLoading={isLoading} className='p-0 max-h-screen'>
        {tokens?.map((token: TokenType) => (
          <TokenRow key={token.identifier} token={token} />
        ))}
      </OutputContainer>
    </div>
  );
};
