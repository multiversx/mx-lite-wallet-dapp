import { EnvironmentsEnum } from 'types';

export * from './sharedConfig';

export const API_URL = 'https://devnet-api.cyber.network';
export const sampleAuthenticatedDomains = [API_URL];
export const environment = EnvironmentsEnum.devnet;
