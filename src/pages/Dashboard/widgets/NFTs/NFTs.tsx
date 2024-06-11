import { OutputContainer } from 'components';
import { useLazyGetNftsQuery } from 'redux/endpoints';
import { useGetAccountInfo } from 'hooks';
import { useEffect } from 'react';
import { NFTRow } from './components';

export const NFTs = () => {
  const { websocketEvent, address } = useGetAccountInfo();
  const [fetchNFTs, { data: nfts, isError, isLoading }] = useLazyGetNftsQuery();

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
        {nfts?.map((nft) => <NFTRow key={nft.identifier} nft={nft} />)}
      </OutputContainer>
    </div>
  );
};
