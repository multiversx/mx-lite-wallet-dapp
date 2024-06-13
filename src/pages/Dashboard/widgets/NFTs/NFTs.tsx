import { useEffect } from 'react';
import { PartialNftType } from '@multiversx/sdk-dapp-form';
import { OutputContainer } from 'components';
import { useGetAccountInfo } from 'hooks';
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
        className='p-0 max-h-screen flex flex-wrap gap-4'
      >
        {nfts?.map((nft: PartialNftType) => (
          <NFTRow key={nft.identifier} nft={nft} />
        ))}
      </OutputContainer>
    </div>
  );
};
