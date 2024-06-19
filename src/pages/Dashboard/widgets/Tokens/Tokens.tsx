import { useEffect } from 'react';
import { OutputContainer } from 'components';
import { useGetAccountInfo } from 'lib';
import { useLazyGetTokensQuery } from 'redux/endpoints';
import { TokenType } from 'types';
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
      <OutputContainer isLoading={isLoading} className='p-0'>
        {tokens?.map((token: TokenType) => (
          <TokenRow key={token.identifier} token={token} />
        ))}
      </OutputContainer>
    </div>
  );
};
