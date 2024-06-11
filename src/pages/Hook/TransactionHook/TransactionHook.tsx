import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getToken } from 'apiRequests';
import { getGlobalNftByIdentifier } from 'apiRequests/nfts';
import {
  DECIMALS as egldDenomination,
  DIGITS,
  GAS_PRICE as configGasPrice,
  TOKEN_GAS_LIMIT
} from 'config';
import {
  decodeAndSanitizeUrl,
  formatAmount,
  getIdentifierType,
  getTokenFromData,
  stringIsInteger
} from 'helpers';
import { ZERO } from 'localConstants';
import { initFormState, initialFormState, setHook } from 'redux/slices';
import { HooksEnum } from 'routes';
import { NftTypeEnum } from 'types';
import { useGetTransactionHookData } from './helpers';
import { HookValidationOutcome } from '../HookValidationOutcome';
import { HookStateEnum } from '../types';

// example: hook/transaction?receiver=erd1qqqqqqqqqqqqqpgqxwakt2g7u9atsnr03gqcgmhcv38pt7mkd94q6shuwt&value=0&gasLimit=350000000&data=unStake@021e0c0013070adc0000&callbackUrl=https%3A%2F%2Flocalhost%3A3000%2Fdashboard
// example: hook/transaction?receiver=erd1qqqqqqqqqqqqqpgqxwakt2g7u9atsnr03gqcgmhcv38pt7mkd94q6shuwt&value=1000000000000000000&gasPrice=1000000000&gasLimit=350000000&data=unStake@021e0c0013070adc0000
// example Ping: /hook/transaction?receiver=erd1qqqqqqqqqqqqqpgq72l6vl07fkn3alyfq753mcy4nakm0l72396qkcud5x&value=1000000000000000000&gasLimit=60000000&data=ping&callbackUrl=https%3A%2F%2Flocalhost%3A3001%2Fdashboard
// example: hook/transaction?receiver=erd1qqqqqqqqqqqqqpgqxwakt2g7u9atsnr03gqcgmhcv38pt7mkd94q6shuwt&value=0&gasLimit=350000000&data=unStake@021e0c0013070adc0000
// example: https://localhost:3002/hook/transaction/?receiver=erd1qqqqqqqqqqqqqpgqdc8x7znweap54gssx0n2s2x9lax76uzp6tqsd0h9y9&value=50000000000000000&gasLimit=3000000&nonce=647&data=registerTicket@31666463663762362d303339622d343136332d623161642d383439316466303966393939@30303261616566382d653965612d343430332d396135652d396635633636373432616465&callbackUrl=https://village.elrondgiants.com/raffle
// example: ttps://localhost:3002/hook/transaction?receiver=erd1qqqqqqqqqqqqqpgqdc8x7znweap54gssx0n2s2x9lax76uzp6tqsd0h9y9&value=0&gasLimit=3000000&nonce=260&data=ESDTTransfer@4749414e542d373631643237@15af1d78b58c400000@72656769737465725469636b6574@38396465636366652d353630632d343032392d383162372d663538653130636433643031@30303261616566382d653965612d343430332d396135652d396635633636373432616465&callbackUrl=https://village.elrondgiants.com/raffle

interface InitializeFormDataParamsType {
  denomination: number;
  isEsdt?: boolean;
  isNft?: boolean;
  nftType?: NftTypeEnum;
  nominatedTokenAmount: string;
  transactionHook: any;
}

/**
 * Sending a valid NFT trough Data field
 * @params hook/transaction/?receiver=erd198q9ghf93ah2508ds5gmd02zvdc256ydx7uxqa3za6403wsyh8tsj474p4&value=0&gasLimit=8000000&nonce=778&data=ESDTNFTTransfer@5449524544434c55422d623863666238@0927@01@000000000000000005007499a1f0fadefe8675b4af7fbd28dd23e0ba4e89a938@7374616b655365636f6e64&callbackUrl=http://localhost:3000/?address=erd198q9ghf93ah2508ds5gmd02zvdc256ydx7uxqa3za6403wsyh8tsj474p4
 */

export const TransactionHook = () => {
  const dispatch = useDispatch();
  const getTransactionHookData = useGetTransactionHookData();
  const transactionHookData = getTransactionHookData(window.location.search);

  const [validUrl, setValidUrl] = useState<HookStateEnum>(
    HookStateEnum.pending
  );

  const initializeFormData = ({
    denomination,
    isEsdt,
    isNft,
    nftType,
    nominatedTokenAmount,
    transactionHook
  }: InitializeFormDataParamsType) => {
    if (!transactionHook) {
      return;
    }

    const tokenAmount = nominatedTokenAmount
      ? formatAmount({
          input: stringIsInteger(nominatedTokenAmount)
            ? nominatedTokenAmount
            : ZERO,
          decimals: denomination,
          digits: denomination,
          showLastNonZeroDecimal: true,
          addCommas: false
        })
      : formatAmount({
          input: stringIsInteger(String(transactionHook.value))
            ? String(transactionHook.value)
            : ZERO,
          decimals: denomination,
          digits: Math.min(denomination, DIGITS),
          showLastNonZeroDecimal: true,
          addCommas: false
        });

    let nftAmount =
      isNft && !transactionHook.token ? nominatedTokenAmount : null;

    nftAmount =
      nftType === NftTypeEnum.MetaESDT
        ? formatAmount({
            input: stringIsInteger(String(transactionHook.value))
              ? String(transactionHook.value)
              : ZERO,
            decimals: denomination,
            digits: Math.min(denomination, DIGITS),
            showLastNonZeroDecimal: true,
            addCommas: false
          })
        : nftAmount || transactionHook.value || ZERO;

    const gasLimit =
      nominatedTokenAmount || isEsdt
        ? TOKEN_GAS_LIMIT
        : initialFormState.gasLimit;

    const formData = {
      receiver: String(transactionHook.receiver),
      amount: isNft ? String(nftAmount) : tokenAmount,
      tokenId: transactionHook.token,
      sender: transactionHook.sender,
      gasLimit: transactionHook.gasLimit ? transactionHook.gasLimit : gasLimit,
      gasPrice: formatAmount({
        input: stringIsInteger(String(transactionHook.gasPrice))
          ? String(transactionHook.gasPrice)
          : configGasPrice,
        decimals: egldDenomination,
        digits: DIGITS,
        showLastNonZeroDecimal: true,
        addCommas: false
      }),
      data: String(transactionHook.data),
      readonly: true,
      skipToConfirm: true
    };

    dispatch(initFormState(formData));
    setValidUrl(HookStateEnum.valid);
  };

  const saveTransactionHook = async () => {
    if (transactionHookData == null) {
      return setValidUrl(HookStateEnum.invalid);
    }

    dispatch(
      setHook({
        type: HooksEnum.transaction,
        hookUrl: transactionHookData.hookUrl,
        callbackUrl: transactionHookData.callbackUrl
      })
    );

    const {
      tokenId,
      amount: nominatedTokenAmount,
      receiver
    } = getTokenFromData(transactionHookData.data);

    const transactionHook = {
      ...transactionHookData,
      receiver: receiver || transactionHookData.receiver,
      token: tokenId || transactionHookData.token,
      callbackUrl: transactionHookData.callbackUrl
        ? decodeAndSanitizeUrl(transactionHookData.callbackUrl)
        : '',
      data: transactionHookData.data
        ? decodeURIComponent(String(transactionHookData.data))
        : ''
    };

    const { isNft, isEsdt } = getIdentifierType(transactionHook?.token);

    try {
      if (isEsdt) {
        const { data: tokenData } = await getToken(
          String(transactionHook.token)
        );

        initializeFormData({
          denomination: tokenData.decimals,
          isEsdt,
          nominatedTokenAmount,
          transactionHook
        });
        return;
      }

      if (isNft) {
        const data = await getGlobalNftByIdentifier(
          String(transactionHook.token)
        );

        const nftDecimals =
          data?.type === NftTypeEnum.MetaESDT
            ? data.decimals
            : egldDenomination;

        initializeFormData({
          denomination: nftDecimals,
          isNft,
          nftType: data?.type,
          nominatedTokenAmount,
          transactionHook
        });
        return;
      }
    } catch (err) {
      console.error('Unable to find token', transactionHook.token, err);
    }

    initializeFormData({
      denomination: egldDenomination,
      nominatedTokenAmount,
      transactionHook
    });
  };

  useEffect(() => {
    saveTransactionHook();
  }, []);

  return (
    <HookValidationOutcome hook={HooksEnum.transaction} validUrl={validUrl} />
  );
};
