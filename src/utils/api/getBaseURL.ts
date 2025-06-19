import { getCurrentNetwork } from './getCurrentNetwork';

export function getBaseURL() {
  const { apiAddress } = getCurrentNetwork();

  return apiAddress;
}
