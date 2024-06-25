import { EnvironmentsEnum } from 'types';

export * from './sharedConfig';

export const API_URL = 'https://devnet-api.multiversx.com'; // replace here with actual sovereign URL
export const sampleAuthenticatedDomains = [API_URL];
export const environment = EnvironmentsEnum.devnet;
