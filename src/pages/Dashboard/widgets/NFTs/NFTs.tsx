import { MouseEvent, useEffect } from 'react';
import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import { useNavigate } from 'react-router-dom';
import { OutputContainer } from 'components';
import { useGetAccountInfo } from 'lib';
import { DataTestIdsEnum } from 'localConstants';
import { ItemsIdentifiersEnum } from 'pages/Dashboard/dashboard.types';
import { useLazyGetNftsQuery } from 'redux/endpoints';
import { routeNames } from 'routes';
import { NFTRow } from './components';

export const NFTs = () => {
  const { websocketEvent, address } = useGetAccountInfo();
  const [fetchNFTs, { data: nftsData, isLoading }] = useLazyGetNftsQuery();
  const navigate = useNavigate();

  const handleCreateNft = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(routeNames.createNft);
  };

  const handleIssueCollection = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(routeNames.issueCollection);
  };

  useEffect(() => {
    fetchNFTs({ address });
  }, [address, websocketEvent]);

  if ((!isLoading && nftsData?.length === 0) || nftsData == null) {
    return (
      <div id={ItemsIdentifiersEnum.nfts} className='flex flex-col'>
        <OutputContainer>
          <p>No NFTs found</p>
        </OutputContainer>

        <div className='mt-5 flex flex-row gap-4'>
          <MvxButton
            data-testid={DataTestIdsEnum.issueNftBtn}
            onClick={handleCreateNft}
          >
            <span className='text-sm font-normal'>Create NFT</span>
          </MvxButton>

          <MvxButton
            data-testid={DataTestIdsEnum.issueCollectionBtn}
            onClick={handleIssueCollection}
          >
            <span className='text-sm font-normal'>Issue Collection</span>
          </MvxButton>
        </div>
      </div>
    );
  }

  return (
    <div id={ItemsIdentifiersEnum.nfts} className='flex flex-col'>
      <OutputContainer
        isLoading={isLoading}
        className='p-0 max-h-screen flex flex-wrap justify-center gap-3 py-3'
      >
        {nftsData?.map((nft) => <NFTRow key={nft.identifier} nft={nft} />)}
      </OutputContainer>

      <div className='mt-5 flex flex-row gap-4'>
        <MvxButton
          data-testid={DataTestIdsEnum.issueNftBtn}
          onClick={handleCreateNft}
        >
          <span className='text-sm font-normal'>Create NFT</span>
        </MvxButton>

        <MvxButton
          data-testid={DataTestIdsEnum.issueCollectionBtn}
          onClick={handleIssueCollection}
        >
          <span className='text-sm font-normal'>Issue Collection</span>
        </MvxButton>
      </div>
    </div>
  );
};
