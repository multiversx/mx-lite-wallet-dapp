import { MouseEvent } from 'react';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NftEnumType } from '@multiversx/sdk-dapp/types/tokens.types';
import { PartialNftType } from '@multiversx/sdk-dapp-form/types';
import { useNavigate } from 'react-router-dom';
import {
  CollectionTypeByNftEnum,
  RouteNamesEnum,
  SearchParamsEnum
} from 'localConstants';

export const NFTRow = ({ nft }: { nft: PartialNftType }) => {
  const navigate = useNavigate();
  const nftType =
    CollectionTypeByNftEnum[nft.type as NftEnumType].toUpperCase();

  const handleSend = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    navigate(
      `${RouteNamesEnum.send}?${SearchParamsEnum.tokenId}=${nft.identifier}&${SearchParamsEnum.isNFT}=true`
    );
  };

  return (
    <div className='bg-black rounded-lg w-48'>
      <img
        src={nft.media?.[0]?.thumbnailUrl}
        alt={`${nft.identifier} ${nftType} Image`}
        className='w-full h-48 object-cover rounded-lg'
      />
      <div className='mt-2 p-4'>
        <div className='flex flex-row justify-between align-middle'>
          <div className='text-lg text-white'>
            {nft.balance ?? ''} {nft.name}
          </div>
          <div className='text-white text-xs my-auto'>{nftType}</div>
        </div>
        <div className='flex items-center justify-between mt-1'>
          <div className='text-xs text-gray-400'>{nft.collection}</div>
          <button
            className='text-white rounded bg-blue-500 px-2 py-1'
            onClick={handleSend}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
      </div>
    </div>
  );
};
