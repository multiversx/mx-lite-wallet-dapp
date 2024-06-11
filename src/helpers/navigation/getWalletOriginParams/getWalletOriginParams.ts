import { WalletOriginType, SearchParamsType } from 'types';
import { getQueryParams } from './getQueryParamsByModules';

export interface WalletOriginParamsType {
  searchParams: SearchParamsType;
  hrefValue: string;
}

export const getWalletOriginParams = (
  walletOrigin: WalletOriginType
): WalletOriginParamsType => {
  const { search, pathname } = walletOrigin;
  const searchParams = getQueryParams(search) as SearchParamsType;

  return {
    searchParams,
    hrefValue: `${pathname}${search}`
  };
};
