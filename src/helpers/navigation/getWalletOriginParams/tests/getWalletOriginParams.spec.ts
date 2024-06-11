import { getWalletOriginParams } from '../index';

const TX_HASH =
  '23c93d0667c91d58c55edd50416de3104d1f7c7a11da3d887cc9654fd6ce06f5';
const PAGE_NR = 10;

const walletOriginMock = {
  search: `?search=${TX_HASH}&page=${PAGE_NR}`,
  pathname: 'activity'
};

describe('getWalletOriginParams tests', () => {
  const walletOriginParams = getWalletOriginParams(walletOriginMock);

  it('contains all attributes', () => {
    expect(walletOriginParams).not.toBeNull();
    expect(walletOriginParams).toHaveProperty('searchParams');
    expect(walletOriginParams).toHaveProperty('hrefValue');
  });

  it('parses query params correctly', () => {
    expect(walletOriginParams.searchParams).toStrictEqual({
      after: undefined,
      before: undefined,
      page: PAGE_NR,
      search: TX_HASH,
      type: ''
    });
  });
});
