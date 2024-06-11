import { useEffect } from 'react';
import { TransactionPayload } from '@multiversx/sdk-core/out';
import { useDispatch } from 'react-redux';
import {
  delegationContractData,
  GuardianActionsEnum,
  stakingContractData
} from 'config';
import { getTokenFromData } from 'helpers';
import { useGetPendingTransactions } from 'hooks';
import { DELEGATION_CONTRACT } from 'localConstants';
import {
  NodesKeysFunctionsEnum,
  NodesValidatorFunctionsEnum
} from 'localConstants/nodes.enum';
import { MultiSigTransactionDataEnum } from 'modules/MultiSig/types';
import { resetHook, setActiveTransactionIdentifiers } from 'redux/slices';
import { SignedTransactionType } from 'types';

export const delegationActions: string[] = Object.keys(DELEGATION_CONTRACT).map(
  (key) => {
    return DELEGATION_CONTRACT[key].data;
  }
);

const legacyDelegationActions = [
  delegationContractData.claim.data,
  delegationContractData.delegate.data,
  delegationContractData.initializeWithdrawal.data,
  delegationContractData.unBond.data
];

export const validateActions = [
  stakingContractData.unStakeTokens.data,
  stakingContractData.unBond.data,
  stakingContractData.reStakeUnStakedNodes.data,
  stakingContractData.stake.data,
  stakingContractData.changeRewardAddress.data,
  stakingContractData.unJail.data
];

const delegationManagerNodesActions = Object.values(NodesKeysFunctionsEnum);
const delegationManagerContractActions = Object.values(
  NodesValidatorFunctionsEnum
);

export const ActiveTransactionTracker = () => {
  const { pendingTransactionsArray } = useGetPendingTransactions();
  const dispatch = useDispatch();

  useEffect(() => {
    const restrictedIds: string[] = []; // contains disabled token identifiers and receivers while transaction is in progress
    pendingTransactionsArray.forEach(([, tx]) => {
      tx.transactions?.forEach(({ data, receiver }: SignedTransactionType) => {
        if (!data) {
          return;
        }

        const decodedData = TransactionPayload.fromEncoded(data)
          .getEncodedArguments()
          .join('@');

        const isProposalCreated = Object.values(
          MultiSigTransactionDataEnum
        ).some((multiSigTx) => decodedData?.startsWith(multiSigTx));

        if (isProposalCreated) {
          dispatch(resetHook());
          restrictedIds.push(receiver);
        }

        const { tokenId } = getTokenFromData(decodedData);

        if (tokenId) {
          restrictedIds.push(tokenId);
        }

        delegationActions.forEach((action) => {
          if (decodedData.includes(action)) {
            restrictedIds.push(receiver);
            // pushing action will prevent stake now button
            restrictedIds.push(action);
          }
        });

        delegationManagerNodesActions.forEach((action) => {
          if (decodedData.includes(action)) {
            restrictedIds.push(action);
          }
        });

        delegationManagerContractActions.forEach((action) => {
          if (decodedData.includes(action)) {
            restrictedIds.push(action);
          }
        });

        legacyDelegationActions.forEach((action) => {
          if (decodedData.includes(action)) {
            restrictedIds.push(receiver);
          }
        });

        validateActions.forEach((action) => {
          if (decodedData.includes(action)) {
            restrictedIds.push(receiver);
          }
        });

        Object.values(GuardianActionsEnum).forEach((action) => {
          if (decodedData.includes(action)) {
            restrictedIds.push(receiver);
          }
        });
      });
    });

    dispatch(setActiveTransactionIdentifiers(restrictedIds));
  }, [pendingTransactionsArray]);

  return null;
};
