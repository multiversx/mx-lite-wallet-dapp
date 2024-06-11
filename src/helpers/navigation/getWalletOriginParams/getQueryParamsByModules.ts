import { stringIsInteger } from 'helpers';
import { QueryParamNamesEnum } from 'localConstants';
import { SearchParamsType } from 'types';

export const getQueryParams = (searchString: string): SearchParamsType => {
  const query = new URLSearchParams(searchString);
  const search = query.get(QueryParamNamesEnum.search) ?? '';
  const page = query.get(QueryParamNamesEnum.page) ?? '';
  const after = query.get(QueryParamNamesEnum.after) ?? '';
  const before = query.get(QueryParamNamesEnum.before) ?? '';
  const type = query.get(QueryParamNamesEnum.type) ?? '';

  return {
    [QueryParamNamesEnum.page]: stringIsInteger(page) ? parseInt(page) : 1,
    [QueryParamNamesEnum.after]: stringIsInteger(after)
      ? parseInt(after)
      : undefined,
    [QueryParamNamesEnum.before]: stringIsInteger(before)
      ? parseInt(before)
      : undefined,
    [QueryParamNamesEnum.search]: search,
    [QueryParamNamesEnum.type]: type
  };
};
