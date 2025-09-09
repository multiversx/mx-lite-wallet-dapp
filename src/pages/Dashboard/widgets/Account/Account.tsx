import { MouseEvent, ReactNode, useState } from 'react';
import { faChevronUp, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  MvxButton,
  MvxDataWithExplorerLink,
  MvxFormatAmount
} from '@multiversx/sdk-dapp-ui/react';
import classNames from 'classnames';
import QRCode from 'react-qr-code';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import XLogo from 'assets/img/x-logo.svg?react';
import { Label } from 'components';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  FormatAmountController,
  DIGITS,
  DECIMALS
} from 'lib';
import { DataTestIdsEnum } from 'localConstants';
import { FaucetButton } from 'pages/Faucet/components/FaucetButton/FaucetButton';
import { networkSelector } from 'redux/selectors';
import { routeNames } from 'routes';

interface AccountDetailsType {
  icon: ReactNode | string;
  label: string;
  value: string | ReactNode;
}

// prettier-ignore
const styles = {
  connectedAccountContainer: 'connected-account flex flex-col gap-4',
  connectedAccountHeader: 'connected-account-header flex justify-between items-center',
  connectedAccountHeaderTitle: 'connected-account-header-title text-base transition-all duration-200 ease-out text-secondary',
  connectedAccountHeaderIcon: 'connected-account-header-icon text-primary transition-transform duration-200 ease-out',
  connectedAccountHeaderIconRotated: 'rotate-180',
  connectedAccountDetails: 'connected-account-details flex flex-col',
  connectedAccountDetailsHidden: 'hidden',
  connectedAccountInfo: 'connected-account-info flex h-14 gap-2 items-center',
  connectedAccountInfoIcon: 'connected-account-info-icon min-w-10 min-h-10 max-h-10 max-w-10 flex items-center justify-center text-tertiary border border-secondary rounded-lg overflow-hidden p-1.5 transition-all duration-200 ease-out',
  connectedAccountInfoText: 'connected-account-info-text truncate flex flex-col',
  connectedAccountInfoTextValue: 'connected-account-info-text-value text-primary transition-all duration-200 ease-out text-base',
  connectedAccountDetailsIcon: 'connected-account-details-icon w-6 h-6',
  connectedAccountDetailsHerotag: 'connected-account-details-herotag rounded-full',
  connectedAccountDetailsXLogo: 'connected-account-details-xlogo fill-primary w-6 h-6 transition-all duration-200 ease-out',
  connectedAccountDetailsTrimAddress: 'w-max'
} satisfies Record<string, string>;

export const Account = () => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();
  const { activeNetwork } = useSelector(networkSelector);
  const { hasRegisterToken, hasSovereignTransfer } = activeNetwork as any;
  const explorerAddress = network.explorerAddress;
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSend = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(routeNames.send);
  };

  const handleSovereignTransfer = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(routeNames.sovereignTransfer);
  };

  const handleRegisterToken = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(routeNames.registerToken);
  };

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
        <MvxDataWithExplorerLink
          data={address}
          withTooltip={true}
          explorerLink={`${explorerAddress}/accounts/${address}`}
        />
      )
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

      <div className='flex flex-row flex-wrap gap-4'>
        <FaucetButton />

        <MvxButton
          onClick={handleSend}
          data-testid={DataTestIdsEnum.sendBtn}
          size='small'
        >
          <span className='text-sm font-normal'>Send</span>
        </MvxButton>

        {hasSovereignTransfer && (
          <MvxButton
            onClick={handleSovereignTransfer}
            data-testid={DataTestIdsEnum.sovereignTransferBtn}
            size='small'
          >
            <span className='text-sm font-normal'>Sovereign Transfer</span>
          </MvxButton>
        )}

        {hasRegisterToken && (
          <MvxButton
            onClick={handleRegisterToken}
            data-testid={DataTestIdsEnum.registerTokenBtn}
            size='small'
          >
            <span className='text-sm font-normal'>Register Token</span>
          </MvxButton>
        )}
      </div>
    </div>
  );
};
