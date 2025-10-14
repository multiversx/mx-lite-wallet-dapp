import { useEffect } from 'react';
import { useGetAccountInfo, TokenType } from 'lib/sdkDapp';
import { useSelector } from 'react-redux';
import { MxLink } from 'components/MxLink';
import { OutputContainer } from 'components/OutputContainer';
import { DataTestIdsEnum } from 'localConstants';
import { RouteNamesEnum } from 'localConstants/routes';
import { useLazyGetTokensQuery } from 'redux/endpoints';
import { networkSelector } from 'redux/selectors';
import { TokenRow } from './components';

export const Tokens = () => {
  const { websocketEvent, address } = useGetAccountInfo();
  const [fetchTokens, { data: tokens, isLoading }] = useLazyGetTokensQuery();
  const { activeNetwork } = useSelector(networkSelector);

  useEffect(() => {
    fetchTokens(address);
  }, [address, websocketEvent, activeNetwork]);

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
            to={RouteNamesEnum.issueToken}
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
          to={RouteNamesEnum.issueToken}
        >
          Issue Token
        </MxLink>
      </div>
    </div>
  );
};
