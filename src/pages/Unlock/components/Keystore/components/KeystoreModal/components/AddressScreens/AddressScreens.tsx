import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AddressTable } from 'components';
import { useAddressScreens } from 'hooks';
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

  if (isRelogin) {
    return null;
  }

  return (
    <AddressTable
      accounts={accounts}
      loading={false}
      onGoToNextPage={onGoToNextPage}
      onGoToPrevPage={onGoToPrevPage}
      onSelectAddress={onSelectAddress}
      startIndex={startIndex}
      selectedAddress={selectedAddress?.address}
      className='p-0'
      onConfirmSelectedAddress={onConfirmSelectedAddress}
      addressTableClassNames={{
        ledgerModalTitleClassName: 'ledger-modal-title',
        ledgerModalSubtitleClassName: 'ledger-modal-subtitle',
        ledgerModalTableHeadClassName: 'ledger-modal-table-head',
        ledgerModalTableItemClassName: 'ledger-modal-table-item',
        ledgerModalButtonClassName:
          'btn btn-primary w-auto m-0 ledger-modal-button',
        ledgerModalTableNavigationButtonClassName:
          'ledger-modal-navigation-button',
        ledgerModalTableNavigationButtonDisabledClassName:
          'ledger-modal-navigation-button-disabled',
        ledgerModalTableSelectedItemClassName:
          'ledger-modal-table-selected-item'
      }}
    />
  );
};
