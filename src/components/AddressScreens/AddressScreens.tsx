import { MvxAddressSelect } from '@multiversx/sdk-dapp-ui/react';
import { type MvxAddressSelect as MvxAddressSelectPropsType } from '@multiversx/sdk-dapp-ui/web-components/mvx-address-select';

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

export interface AddressScreensPropsType extends MvxAddressSelectPropsType {}

export const AddressScreens = ({
  accountScreenData,
  selectedIndex,
  className
}: AddressScreensPropsType) => {
  const handleAccessWallet = () => {
    console.log('handleAccessWallet');
  };

  const handleSelectAccount = (event: CustomEvent) => {
    console.log('handleSelectAccount', event);
  };

  const handlePageChange = (event: CustomEvent) => {
    console.log('handlePageChange', event);
  };

  return (
    <MvxAddressSelect
      className={className}
      selectedIndex={selectedIndex}
      accountScreenData={accountScreenData}
      onAccessWallet={handleAccessWallet}
      onSelectAccount={handleSelectAccount}
      onPageChange={handlePageChange}
    />
  );
};
