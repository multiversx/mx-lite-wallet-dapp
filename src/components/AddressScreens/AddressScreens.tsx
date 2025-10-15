import { useEffect, useState, useCallback } from 'react';
import { MvxAddressTable } from '@multiversx/sdk-dapp-ui/react';
import type {
  IndexedAccountType,
  IAddressTableData
} from '@multiversx/sdk-dapp-ui/types/types/address-table.types';
import { type MvxAddressTable as MvxAddressTablePropsType } from '@multiversx/sdk-dapp-ui/web-components/mvx-address-table';
import type { AccessWalletType } from '../../providers/Keystore/accessWallet';
import { getKeystoreAddresses } from '../../providers/Keystore/getKeystoreAddresses';

export interface AddressScreensPropsType
  extends Partial<MvxAddressTablePropsType> {
  kdContent: AccessWalletType['kdContent'];
  accessPassVal: string;
  addressesPerPage?: number;
  onConfirmSelectedAddress: (account: IndexedAccountType) => void;
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
  const [accounts, setAccounts] = useState<IndexedAccountType[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);

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
          balance: '',
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
    setSelectedIndex(undefined);
  }, [loadAccounts, startIndex]);

  const handleAccessWallet = useCallback(() => {
    if (selectedIndex == null || !accounts[selectedIndex]) return;

    onConfirmSelectedAddress(accounts[selectedIndex]);
  }, [selectedIndex, accounts, onConfirmSelectedAddress]);

  const handleSelectAccount = useCallback((event: CustomEvent) => {
    const idx = event.detail;

    if (typeof idx === 'number') {
      setSelectedIndex(idx);
    }
  }, []);

  const handlePageChange = useCallback((event: CustomEvent) => {
    const pageIdx = event.detail;

    if (typeof pageIdx === 'number') {
      setStartIndex(pageIdx);
      setSelectedIndex(undefined);
      onPageChange?.(pageIdx);
    }
  }, []);

  const accountScreenData: IAddressTableData = {
    accounts,
    startIndex,
    addressesPerPage,
    isLoading
  };

  return (
    <MvxAddressTable
      className={className}
      selectedIndex={selectedIndex}
      accountScreenData={accountScreenData}
      onAccessWallet={handleAccessWallet}
      onSelectAccount={handleSelectAccount}
      onPageChange={handlePageChange}
    />
  );
};
