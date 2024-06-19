import { useEffect } from 'react';
import { OutputContainer } from 'components';
import { useGetAccountInfo } from 'lib';
import { useLazyGetNftsQuery } from 'redux/endpoints';
import { NFTRow } from './components';

export const NFTs = () => {
  const { websocketEvent, address } = useGetAccountInfo();
  const [fetchNFTs, { data: nfts, isLoading }] = useLazyGetNftsQuery();

  useEffect(() => {
    fetchNFTs({ address });
  }, [address, websocketEvent]);

  if (!isLoading && nfts?.length === 0) {
    return (
      <OutputContainer>
        <p className='text-gray-400'>No NFTs found</p>
      </OutputContainer>
    );
  }

  return (
    <div className='flex flex-col'>
      <OutputContainer
        isLoading={isLoading}
        className='p-0 max-h-screen flex flex-wrap justify-center gap-3 py-3'
      >
        {nfts?.map((nft) => <NFTRow key={nft.identifier} nft={nft} />)}
      </OutputContainer>
    </div>
  );
};
