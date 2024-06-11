import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SignTransactionsModals,
  SignWithDeviceModal,
  SignWithExtensionModal,
  SignWithLedgerModal
} from 'components/SdkDapp';
import {
  useGetAccount,
  useGetActiveTransactionsStatus,
  useReplyWithCancelled
} from 'hooks';

import { hookSelector } from 'redux/selectors';
import { resetHook } from 'redux/slices';
import { HooksEnum } from 'routes';
import { SignModalPropsType } from 'types';
import { GuardianScreen } from './GuardianScreen';

const DappUI = {
  SignWithDeviceModal,
  SignWithExtensionModal,
  SignWithLedgerModal
};

export const SignModals = () => {
  const { fail, pending } = useGetActiveTransactionsStatus();
  const replyWithCancelled = useReplyWithCancelled({
    caller: 'SignModals'
  });

  const { isGuarded } = useGetAccount();
  const dispatch = useDispatch();
  const { type } = useSelector(hookSelector);

  const handleClose = () => {
    replyWithCancelled({ shouldResetHook: true });
  };

  useEffect(() => {
    if (fail) {
      replyWithCancelled({ shouldResetHook: true });
    }
  }, [fail]);

  useEffect(() => {
    if (pending && type === HooksEnum.sign) {
      dispatch(resetHook());
    }
  }, [pending]);

  enum ModalEnum {
    'ledger' = 'SignWithLedgerModal',
    'extension' = 'SignWithExtensionModal'
  }
  const getSignModal =
    (modalType: ModalEnum) => (props: SignModalPropsType) => {
      const Component = DappUI[modalType];

      return (
        <Component
          {...props}
          title='Sign Transaction'
          handleClose={handleClose}
          className='modal-layout sign-modal-panel'
          signStepInnerClasses={{
            inputGroupClassName: 'modal-layout-field',
            inputValueClassName: 'sign-modal-step-values',
            buttonsWrapperClassName: 'sign-modal-step-buttons',
            buttonClassName: 'modal-layout-button sign-modal-step-button'
          }}
        />
      );
    };

  const CustomConfirmScreens = {
    Extra: getSignModal(ModalEnum.ledger),
    Ledger: getSignModal(ModalEnum.ledger),
    Extension: getSignModal(ModalEnum.extension)
  };

  const Memoized = useMemo(
    () => (
      <SignTransactionsModals
        className='sign-modal'
        CustomConfirmScreens={CustomConfirmScreens}
        GuardianScreen={isGuarded ? GuardianScreen : undefined}
      />
    ),
    [GuardianScreen, isGuarded]
  );

  return Memoized;
};
