import { Dispatch, SetStateAction, useState } from 'react';
import { Transaction, TransactionOptions } from '@multiversx/sdk-core/out';

import { AxiosError } from 'axios';
import { GuardianScreenType } from 'types';
import { useGuardianProvider } from '../../../hooks';
import {
  GuardianFormPropsType,
  GuardianSubmitPropsType
} from '../../GuardianForm';
import { GuardianErrorDataType } from '../../GuardianForm/helpers';

export interface GuardianScreenHookType {
  signedTransactions: GuardianScreenType['signedTransactions'];
  onSignTransaction: GuardianScreenType['onSignTransaction'];
  setSignedTransactions: GuardianScreenType['setSignedTransactions'];
  address: string;
}

export interface GuardianScreenHookReturnType {
  onGuardianSubmit: GuardianFormPropsType['onGuardianSubmit'];
  setGuardianError: Dispatch<
    SetStateAction<AxiosError<GuardianErrorDataType> | null>
  >;
  guardianError: AxiosError<GuardianErrorDataType> | null;
  isDisabled: boolean;
}

export const useGuardianScreen = ({
  signedTransactions,
  setSignedTransactions,
  onSignTransaction,
  address
}: GuardianScreenHookType): GuardianScreenHookReturnType => {
  const { guardianProvider } = useGuardianProvider(address);
  const [guardianError, setGuardianError] =
    useState<AxiosError<GuardianErrorDataType> | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  /*
   * Get all input values, join into single string, then validate, and throw errors (if the case), or submit successfully.
   */
  const onGuardianSubmit = async ({
    code,
    secondCode
  }: GuardianSubmitPropsType) => {
    if (!guardianProvider || !signedTransactions) {
      return setGuardianError({
        response: {
          data: {
            error: 'Guardian provider unavailable'
          }
        }
      } as unknown as AxiosError<GuardianErrorDataType>);
    }

    try {
      const transactions = Object.values(signedTransactions).map((tx) => {
        const hasCorrectVersion = tx.getVersion().valueOf() >= 2;

        if (!hasCorrectVersion) {
          tx.setOptions(TransactionOptions.withOptions({ guarded: true }));
        }

        return tx;
      });

      const guardedTransactions = await guardianProvider.applyGuardianSignature(
        {
          transactions,
          code,
          secondCode
        }
      );

      const newTransactions = guardedTransactions.reduce(
        (
          acc: Record<number, Transaction>,
          transaction: Transaction,
          index: number
        ) => {
          acc[index] = transaction;
          return acc;
        },
        {}
      );

      setSignedTransactions?.(newTransactions);
      onSignTransaction();
      setIsDisabled(true);
    } catch (error) {
      setGuardianError(error as AxiosError<GuardianErrorDataType>);
      setIsDisabled(false);
      throw error;
    }
  };

  /*
   * Return all callbacks, states and additional input checks.
   */
  return {
    onGuardianSubmit,
    guardianError,
    setGuardianError,
    isDisabled
  };
};
