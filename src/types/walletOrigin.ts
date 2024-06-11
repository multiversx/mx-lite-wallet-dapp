import { QueryParamNamesEnum } from 'localConstants';

export interface WalletOriginType {
  search: string;
  pathname: string;
}

export interface SendModalRouteState {
  previousPath?: string;
}

export interface SearchParamsType {
  [QueryParamNamesEnum.page]?: number;
  [QueryParamNamesEnum.after]?: number;
  [QueryParamNamesEnum.before]?: number;
  [QueryParamNamesEnum.search]?: string;
  [QueryParamNamesEnum.type]?: string;
}
