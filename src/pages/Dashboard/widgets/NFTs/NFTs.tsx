import { useEffect } from 'react';
import { MxLink, OutputContainer } from 'components';
import { useGetAccountInfo } from 'lib';
import { useLazyGetNftsQuery } from 'redux/endpoints';
import { NFTRow } from './components';
import { DataTestIdsEnum } from 'localConstants';
import { routeNames } from 'routes';

export const NFTs = () => {
  const { websocketEvent, address } = useGetAccountInfo();
  const [fetchNFTs, { data, isLoading }] = useLazyGetNftsQuery();

  useEffect(() => {
    fetchNFTs({ address });
  }, [address, websocketEvent]);

  if (!isLoading && data?.length === 0) {
    return (
      <div className='flex flex-col'>
        <OutputContainer>
          <p className='text-gray-400'>No NFTs found</p>
        </OutputContainer>
        <div className='mt-5'>
          <MxLink
            className='inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm text-white'
            data-testid={DataTestIdsEnum.issueNftBtn}
            to={routeNames.issueNft}
          >
            Issue NFT
          </MxLink>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col'>
      <OutputContainer
        isLoading={isLoading}
        className='p-0 max-h-screen flex flex-wrap justify-center gap-3 py-3'
      >
        {data?.map((nft) => <NFTRow key={nft.identifier} nft={nft} />)}
      </OutputContainer>
      <div className='mt-5'>
        <MxLink
          className='inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm text-white'
          data-testid={DataTestIdsEnum.issueNftBtn}
          to={routeNames.issueNft}
        >
          Issue NFT
        </MxLink>
      </div>
    </div>
  );
};
