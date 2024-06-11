import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ModalLayout, Status } from 'components';
import { StatusTypeEnum } from 'components/shared/Status/status.types';
import { useGetAccount } from 'hooks';
import { hookSelector } from 'redux/selectors';
import { HooksEnum } from 'routes';
import { PendingConnection } from './PendingConnection';

let persistedHook: HooksEnum | null = null;

export const IdleModal = () => {
  const {
    type: hook,
    wasCancelled,
    callbackUrl,
    isWalletConnectV2Initializing
  } = useSelector(hookSelector);
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);
  const [lastHookAction, setlastHookAction] = useState<HooksEnum | null>(
    persistedHook
  );

  useEffect(() => {
    if (hook) {
      setlastHookAction(hook);
      persistedHook = hook;
    }
  }, [hook]);

  const messageMap: Record<string, string> = {
    [HooksEnum.login]: 'Logged in successfully',
    [HooksEnum.sign]: wasCancelled
      ? '❌ Transactions signing cancelled'
      : 'Transactions signed',
    [HooksEnum.signMessage]: wasCancelled
      ? '❌ Message signing cancelled'
      : 'Message signed'
  };

  if (isWalletConnectV2Initializing) {
    return <PendingConnection />;
  }

  if (!window.opener || hook || !isLoggedIn) {
    return null;
  }

  return (
    <ModalLayout show hideHeaderCloseBtn narrowModal className='idle-modal'>
      <div className='idle-modal-wrapper'>
        <Status
          title='Connected'
          subtitle={messageMap[lastHookAction ?? ''] ?? ''}
          type={StatusTypeEnum.success}
          className='idle-modal-status'
        />

        <div className='idle-modal-description'>
          You can now return to <b>{callbackUrl}</b>
        </div>
      </div>
    </ModalLayout>
  );
};
