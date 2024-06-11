import { NftEnumType } from '@multiversx/sdk-dapp/types/tokens.types';
import classNames from 'classnames';
import { PartialNftType } from '@multiversx/sdk-dapp-form/types';
import { CollectionTypeByNftEnum } from 'localConstants';

export const NFTRow = ({ nft }: { nft: PartialNftType }) => {
  const isSft = nft.type === NftEnumType.SemiFungibleESDT;
  const nftType =
    CollectionTypeByNftEnum[nft.type as NftEnumType].toUpperCase();

  return (
    <div className='nft' data-testid={`${nft.identifier}-${nftType}-container`}>
      <img
        className='nft-img'
        src={nft.media?.[0]?.thumbnailUrl}
        alt={`${nft.identifier} ${nftType} Image`}
      />
      <div className='centered p-3'>
        <div className='column flex'>
          <span className='mb-1 d-flex gap-2 align-items-center'>
            <span className='nft-name'>
              {nft.balance && (
                <span className='nft-balance me-2'>{nft.balance}</span>
              )}
              {nft.name}
            </span>
            <span
              className={classNames('badge badge-outline', {
                'badge-outline-orange': isSft,
                'badge-outline-yellow': !isSft
              })}
            >
              {nftType}
            </span>
          </span>
          <span className='nft-artist'>{nft.collection}</span>
        </div>
        {/*<SendNFTButton*/}
        {/*  disabled={disabled}*/}
        {/*  identifier={identifier}*/}
        {/*  isSuspicious={isSuspicious}*/}
        {/*  type={nftType}*/}
        {/*/>*/}
      </div>
    </div>
  );
};
