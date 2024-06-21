import { formatAmount } from 'lib';
import { DECIMALS, DIGITS } from 'localConstants';
import { PartialNftType, TokenType } from 'types';
import { TokenOptionType } from '../types';

export const getSelectedTokenBalance = ({
  isNFT,
  tokens,
  tokenOption
}: {
  isNFT: boolean;
  tokens?: PartialNftType[] | TokenType[];
  tokenOption?: TokenOptionType;
}) => {
  if (!tokens || tokens.length === 0) {
    return '0';
  }

  const currentToken = tokens.find(
    (token) => token.identifier === tokenOption?.value
  );

  if (!currentToken) {
    return '0';
  }

  // There may be NFTs without balance, so we return 1 by default
  if (!('balance' in currentToken) && isNFT) {
    return '1';
  }

  if (!currentToken.decimals) {
    return currentToken.balance ?? '0';
  }

  return formatAmount({
    input: currentToken.balance ?? '0',
    decimals: currentToken.decimals ?? DECIMALS,
    digits: DIGITS,
    showLastNonZeroDecimal: false
  });
};
