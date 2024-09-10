import { formatAmount, getEgldLabel } from 'lib';
import { DECIMALS, DIGITS } from 'localConstants';
import { PartialNftType, TokenType } from 'types';

export const getSelectedTokenBalance = ({
  isNFT,
  selectedToken,
  tokens
}: {
  isNFT: boolean;
  selectedToken?: string;
  tokens?: PartialNftType[] | TokenType[];
}) => {
  if (!tokens || tokens.length === 0) {
    return '0';
  }

  const currentToken = tokens.find(
    ({ identifier }) => identifier === selectedToken
  );

  if (!currentToken) {
    return '0';
  }

  // There may be NFTs without balance, so we return 1 by default
  if (!('balance' in currentToken) && isNFT) {
    return '1';
  }

  if (!currentToken.decimals && currentToken.identifier !== getEgldLabel()) {
    return currentToken.balance ?? '0';
  }

  return formatAmount({
    input: currentToken.balance ?? '0',
    decimals: currentToken.decimals ?? DECIMALS,
    digits: DIGITS,
    showLastNonZeroDecimal: true
  });
};
