import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ModalContainer, Status, StatusTypeEnum } from 'components';
import { useGetAccount } from 'hooks';
import { hookSelector } from 'redux/selectors';
import { HooksEnum } from 'routes';

let persistedHook: HooksEnum | null = null;

export const IdleModal = () => {
  const { type: hook, wasCancelled, callbackUrl } = useSelector(hookSelector);
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
      : 'Transactions signed'
  };

  if (!window.opener || hook || !isLoggedIn) {
    return null;
  }

  return (
    <ModalContainer visible className='idle-modal'>
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
    </ModalContainer>
  );
};
