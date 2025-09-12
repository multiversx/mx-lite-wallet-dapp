import { MouseEvent } from 'react';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import { useNavigate } from 'react-router-dom';
import { NftEnumType, PartialNftType } from 'lib';
import { CollectionTypeByNftEnum, SearchParamsEnum } from 'localConstants';
import { sendRouteBuilder } from 'routes';
import { styles } from './nftRow.styles';

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
    <div className={styles.nftsRowContainer}>
      <img
        src={nft.media?.[0]?.thumbnailUrl}
        alt={`${nft.identifier} ${nftType} Image`}
        className={styles.nftImg}
      />

      <div className={styles.nftTextContainer}>
        <div className={styles.nftTextFirstRow}>
          <div className={styles.nftTextFirstRowLeft}>
            {nft.balance ?? '1'} <span className='opacity-70'>{nft.name}</span>
          </div>

          <div className={styles.nftTextFirstRowRight}>{nftType}</div>
        </div>

        <div className={styles.nftTextSecondRow}>
          <div className={styles.nftTextSecondRowCollection}>
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
