import { FormatAmountController } from '@multiversx/sdk-dapp/out/controllers';
import { MvxFormatAmount } from '@multiversx/sdk-dapp-ui/react';
import type { MvxFormatAmount as MvxFormatAmountPropsType } from '@multiversx/sdk-dapp-ui/web-components/mvx-format-amount';
import { useGetNetworkConfig } from 'lib';
import { WithClassnameType } from 'types';
import { DECIMALS, DIGITS } from '../../sdkDappUtils/sdkDappUtils';

interface FormatAmountPropsType
  extends Partial<MvxFormatAmountPropsType>,
    WithClassnameType {
  egldLabel?: string;
  value: string;
}

export const FormatAmount = (props: FormatAmountPropsType) => {
  const { network } = useGetNetworkConfig();

  const { isValid, valueDecimal, valueInteger, label } =
    FormatAmountController.getData({
      digits: DIGITS,
      decimals: DECIMALS,
      egldLabel: network.egldLabel,
      ...props,
      input: props.value
    });

  return (
    <MvxFormatAmount
      class={props.className}
      dataTestId={props['data-testid']}
      isValid={isValid}
      label={label}
      valueDecimal={valueDecimal}
      valueInteger={valueInteger}
    />
  );
};
