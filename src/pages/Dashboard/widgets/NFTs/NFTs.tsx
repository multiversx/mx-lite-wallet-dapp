import { OutputContainer } from 'components';
import { useLazyGetNftsQuery } from 'redux/endpoints';
import { useGetAccountInfo } from 'hooks';
import { useEffect } from 'react';
import { NFTRow } from './components';
import { PartialNftType } from '@multiversx/sdk-dapp-form';

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
      <OutputContainer isLoading={isLoading} className='p-0'>
        {nfts?.map((nft: PartialNftType) => (
          <NFTRow key={nft.identifier} nft={nft} />
        ))}
      </OutputContainer>
    </div>
  );
};
