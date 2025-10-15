import { getCurrentNetwork } from './getCurrentNetwork';

export function getExtrasApi() {
  const { extrasApi } = getCurrentNetwork();

  return extrasApi;
}
