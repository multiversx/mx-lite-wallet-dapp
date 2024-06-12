import { NftEnumType } from '@multiversx/sdk-dapp/types/tokens.types';
import { PartialNftType } from '@multiversx/sdk-dapp-form/types';
import { CollectionTypeByNftEnum } from 'localConstants';

export const NFTRow = ({ nft }: { nft: PartialNftType }) => {
  const nftType =
    CollectionTypeByNftEnum[nft.type as NftEnumType].toUpperCase();

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
        </div>
      </div>
    </div>
  );
};
