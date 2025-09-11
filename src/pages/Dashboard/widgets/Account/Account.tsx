import { ReactNode, useState } from 'react';
import {
  faChevronUp,
  faLayerGroup,
  faWallet
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MvxFormatAmount, MvxTrim } from '@multiversx/sdk-dapp-ui/react';
import classNames from 'classnames';
import QRCode from 'react-qr-code';

import XLogo from 'assets/img/x-logo.svg?react';
import { Label } from 'components';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  FormatAmountController,
  DIGITS,
  DECIMALS
} from 'lib';
import { styles } from './account.styles';
import { Username } from './components';
import { useGetUserHerotag } from './hooks/useGetUserHerotag';

interface AccountDetailsType {
  icon: ReactNode;
  label: string;
  value: string | ReactNode;
}

export const Account = () => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();
  const { herotag, profileUrl } = useGetUserHerotag(address);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const { isValid, valueDecimal, valueInteger, label } =
    FormatAmountController.getData({
      digits: DIGITS,
      decimals: DECIMALS,
      egldLabel: network.egldLabel,
      input: account.balance
    });

  const img = profileUrl && (
    <img src={profileUrl} className={styles.connectedAccountDetailsHerotag} />
  );

  const accountDetails: AccountDetailsType[] = [
    {
      icon: (
        <FontAwesomeIcon
          icon={faWallet}
          className={styles.connectedAccountDetailsIcon}
        />
      ),
      label: 'Address',
      value: (
        <MvxTrim
          text={address}
          className={styles.connectedAccountDetailsTrimAddress}
        />
      )
    },
    {
      icon: herotag ? img || herotag.slice(0, 3) : '@',
      label: 'Herotag',
      value: <Username address={address} />
    },
    {
      icon: (
        <FontAwesomeIcon
          icon={faLayerGroup}
          className={styles.connectedAccountDetailsIcon}
        />
      ),
      label: 'Shard',
      value: account.shard
    },
    {
      icon: <XLogo className={styles.connectedAccountDetailsXLogo} />,
      label: 'Balance',
      value: (
        <MvxFormatAmount
          isValid={isValid}
          valueInteger={valueInteger}
          valueDecimal={valueDecimal}
          label={label}
          data-testid='balance'
          decimalClass='opacity-70'
          labelClass='opacity-70'
        />
      )
    }
  ];

  return (
    <div className={styles.connectedAccountContainer}>
      <div className={styles.connectedAccountHeader}>
        <h2 className={styles.connectedAccountHeaderTitle}>
          Connected account details
        </h2>

        <FontAwesomeIcon
          icon={faChevronUp}
          className={classNames(styles.connectedAccountHeaderIcon, {
            [styles.connectedAccountHeaderIconRotated]: isCollapsed
          })}
          onClick={toggleCollapse}
        />
      </div>

      <div
        data-testid='topInfo'
        className={classNames(styles.connectedAccountDetails, {
          [styles.connectedAccountDetailsHidden]: isCollapsed
        })}
      >
        <div className='my-1 flex justify-center sm:hidden'>
          <QRCode
            className='rounded-lg border-8 border-white bg-white'
            value={address ?? ''}
            size={200}
            fgColor='#030712'
          />
        </div>
        {accountDetails.map((accountDetail, index) => (
          <div key={index} className={styles.connectedAccountInfo}>
            <div className={styles.connectedAccountInfoIcon}>
              {accountDetail.icon}
            </div>

            <p className={styles.connectedAccountInfoText}>
              <Label>{accountDetail.label}</Label>
              <span className={styles.connectedAccountInfoTextValue}>
                {accountDetail.value}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
