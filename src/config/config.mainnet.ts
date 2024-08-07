import { EnvironmentsEnum } from 'types';

export * from './sharedConfig';

export const API_URL = 'https://api.multiversx.com';
export const GATEWAY_URL = ''; // either GATEWAY_URL or API_URL must be set
export const sampleAuthenticatedDomains = [API_URL];
export const environment = EnvironmentsEnum.mainnet;
export const sovereignContractAddress = '';
export const WEGLDID = '';
