import { EnvironmentsEnum } from 'types';

export * from './sharedConfig';

export const API_URL = 'https://testnet-api.cyber.network';
export const sampleAuthenticatedDomains = [API_URL];
export const environment = EnvironmentsEnum.testnet;
