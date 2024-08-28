import { useEffect } from 'react';
import { MxLink, OutputContainer } from 'components';
import { useGetAccountInfo } from 'lib';
import { DataTestIdsEnum } from 'localConstants';
import { useLazyGetTokensQuery } from 'redux/endpoints';
import { routeNames } from 'routes';
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
      <div className='flex flex-col'>
        <OutputContainer>
          <p className='text-gray-400'>No tokens found</p>
        </OutputContainer>
        <div className='mt-5'>
          <MxLink
            className='inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm text-white'
            data-testid={DataTestIdsEnum.issueTokenBtn}
            to={routeNames.issueToken}
          >
            Issue Token
          </MxLink>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col'>
      <OutputContainer isLoading={isLoading} className='p-0'>
        {tokens?.map((token: TokenType) => (
          <TokenRow key={token.identifier} token={token} />
        ))}
      </OutputContainer>
      <div className='mt-5'>
        <MxLink
          className='inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm text-white'
          data-testid={DataTestIdsEnum.issueTokenBtn}
          to={routeNames.issueToken}
        >
          Issue Token
        </MxLink>
      </div>
    </div>
  );
};
