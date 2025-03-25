import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AddressTable } from 'components';
import { useAddressScreens } from 'lib';
import { WALLET_FILE, WALLET_FILE_NAME } from 'localConstants';
import { setAddressIndex } from 'redux/slices';

import { AccessWalletType, getKeystoreAddresses } from '../../helpers';
import { useOnKeystoreSubmit } from '../../hooks';

export const AddressScreens = ({
  kdContent,
  accessPassVal,
  fileName
}: AccessWalletType & { fileName: string }) => {
  const {
    accounts,
    setAccounts,
    startIndex,
    selectedAddress,
    onGoToPrevPage,
    onGoToNextPage,
    onSelectAddress: handleSelectAddress,
    defaultAddressesPerPage
  } = useAddressScreens();
  const onKeystoreSubmit = useOnKeystoreSubmit();
  const dispatch = useDispatch();

  useEffect(() => {
    const addresses = getKeystoreAddresses({
      kdContent,
      accessPassVal,
      index: startIndex,
      count: defaultAddressesPerPage
    }).map(({ address }) => address);

    setAccounts(addresses);
    onSelectAddress(null);
  }, [startIndex]);

  const onConfirmSelectedAddress = () => {
    if (!selectedAddress) {
      return;
    }

    onKeystoreSubmit({
      [WALLET_FILE_NAME]: fileName,
      [WALLET_FILE]: kdContent,
      accessPass: accessPassVal
    });
  };

  const onSelectAddress: typeof handleSelectAddress = (address) => {
    if (address) {
      dispatch(setAddressIndex({ addressIndex: address.index }));
    }

    handleSelectAddress(address);
  };

  const onGoToSpecificPage = (pageIndex: number) => {
    setAccounts([]);
    onSelectAddress(null);
    handleSelectAddress({ address: '', index: pageIndex });
  };

  return (
    <AddressTable
      accounts={accounts}
      loading={false}
      onGoToNextPage={onGoToNextPage}
      onGoToPrevPage={onGoToPrevPage}
      onGoToSpecificPage={onGoToSpecificPage}
      onSelectAddress={onSelectAddress}
      startIndex={startIndex}
      selectedAddress={selectedAddress?.address}
      onConfirmSelectedAddress={onConfirmSelectedAddress}
    />
  );
};
