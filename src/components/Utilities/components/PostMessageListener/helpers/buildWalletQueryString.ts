import qs from 'qs';

export const buildWalletQueryString = (options: { params?: Record<string, unknown> }): string => {
  const callbackUrl = options.params?.callbackUrl ?? window.location?.href;
  const params = { ...options.params };
  delete params.callbackUrl;

  const partialQueryString = qs.stringify(params || {});

  return partialQueryString
    ? `${partialQueryString}&callbackUrl=${callbackUrl}`
    : `callbackUrl=${callbackUrl}`;
};
