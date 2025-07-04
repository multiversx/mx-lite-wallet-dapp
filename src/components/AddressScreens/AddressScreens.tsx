import { useEffect, useState, useCallback } from 'react';
import { MvxAddressSelect } from '@multiversx/sdk-dapp-ui/react';
import { type MvxAddressSelect as MvxAddressSelectPropsType } from '@multiversx/sdk-dapp-ui/web-components/mvx-address-select';
import type { AccessWalletType } from '../../providers/Keystore/accessWallet';
import { getKeystoreAddresses } from '../../providers/Keystore/getKeystoreAddresses';

export interface IAccount {
  address: string;
  balance: string;
  usdValue?: string;
  index: number;
}
export interface IAccountScreenData {
  accounts: IAccount[];
  startIndex: number;
  addressesPerPage: number;
  isLoading: boolean;
}

export interface AddressScreensPropsType
  extends Partial<MvxAddressSelectPropsType> {
  kdContent: AccessWalletType['kdContent'];
  accessPassVal: string;
  addressesPerPage?: number;
  onConfirmSelectedAddress?: (account: IAccount) => void;
  onPageChange?: (pageIndex: number) => void;
}

const DEFAULT_ADDRESSES_PER_PAGE = 5;

export const AddressScreens = ({
  kdContent,
  accessPassVal,
  addressesPerPage = DEFAULT_ADDRESSES_PER_PAGE,
  onPageChange,
  onConfirmSelectedAddress,
  className
}: AddressScreensPropsType) => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Derive addresses for the current page
  const loadAccounts = useCallback(() => {
    setIsLoading(true);

    try {
      const derived = getKeystoreAddresses({
        kdContent,
        accessPassVal,
        index: startIndex,
        count: addressesPerPage
      });

      setAccounts(
        derived.map((item, idx) => ({
          address: item.address,
          balance: '', // balance can be fetched separately if needed
          index: startIndex * addressesPerPage + idx
        }))
      );
    } catch (e) {
      setAccounts([]);
    }
    setIsLoading(false);
  }, [kdContent, accessPassVal, startIndex, addressesPerPage]);

  useEffect(() => {
    loadAccounts();
    setSelectedIndex(null);
  }, [loadAccounts, startIndex]);

  // Handler: Confirm selected address (access wallet)
  const handleAccessWallet = useCallback(() => {
    if (selectedIndex == null || !accounts[selectedIndex]) return;
    if (onConfirmSelectedAddress) {
      onConfirmSelectedAddress(accounts[selectedIndex]);
    }
    // You can add more logic here if needed
  }, [selectedIndex, accounts, onConfirmSelectedAddress]);

  // Handler: Select account
  const handleSelectAccount = useCallback((event: CustomEvent) => {
    const idx = event.detail?.index;
    if (typeof idx === 'number') {
      setSelectedIndex(idx);
    }
  }, []);

  // Handler: Page change
  const handlePageChange = useCallback((event: CustomEvent) => {
    const pageIdx = event.detail?.pageIndex;
    if (typeof pageIdx === 'number') {
      setStartIndex(pageIdx);
      setSelectedIndex(null);
      onPageChange?.(pageIdx);
    }
  }, []);

  const accountScreenData: IAccountScreenData = {
    accounts,
    startIndex,
    addressesPerPage,
    isLoading
  };

  return (
    <MvxAddressSelect
      className={className}
      selectedIndex={selectedIndex ?? undefined}
      accountScreenData={accountScreenData}
      onAccessWallet={handleAccessWallet}
      onSelectAccount={handleSelectAccount}
      onPageChange={handlePageChange}
    />
  );
};
