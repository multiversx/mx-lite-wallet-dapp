import { MouseEvent } from 'react';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import { useNavigate } from 'react-router-dom';
import { NftEnumType, PartialNftType } from 'lib';
import { CollectionTypeByNftEnum, SearchParamsEnum } from 'localConstants';
import { sendRouteBuilder } from 'routes';

export const NFTRow = ({ nft }: { nft: PartialNftType }) => {
  const navigate = useNavigate();
  const nftType =
    CollectionTypeByNftEnum[nft.type as NftEnumType]?.toUpperCase();

  const handleSend = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    navigate(
      sendRouteBuilder({
        [SearchParamsEnum.tokenId]: nft.identifier,
        [SearchParamsEnum.isNFT]: 'true'
      })
    );
  };

  return (
    <div className='bg-primary rounded-xl w-48 border border-secondary'>
      <img
        src={nft.media?.[0]?.thumbnailUrl}
        alt={`${nft.identifier} ${nftType} Image`}
        className='w-full h-48 object-cover rounded-t-xl'
      />
      <div className='mt-2 p-4'>
        <div className='flex flex-row justify-between align-middle'>
          <div className='text-base lg:text-lg text-primary'>
            {nft.balance ?? '1'} <span className='opacity-70'>{nft.name}</span>
          </div>

          <div className='text-secondary text-xs lg:text-sm my-auto'>
            {nftType}
          </div>
        </div>

        <div className='flex items-center justify-between mt-1'>
          <div className='text-xs lg:text-sm text-secondary'>
            {nft.collection}
          </div>

          <MvxButton
            data-testid={`send-${nft.identifier}`}
            onClick={handleSend}
            size='small'
          >
            <FontAwesomeIcon icon={faArrowUp} className='text-sm font-normal' />
          </MvxButton>
        </div>
      </div>
    </div>
  );
};
