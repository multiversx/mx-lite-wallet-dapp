import { EnvironmentsEnum } from 'types';

export * from './sharedConfig';

export const API_URL = ''; // either GATEWAY_URL or API_URL must be set
export const GATEWAY_URL = 'https://devnet-gateway.multiversx.com';
export const sampleAuthenticatedDomains = [API_URL];
export const environment = EnvironmentsEnum.devnet;
export const sovereignContractAddress = '';
