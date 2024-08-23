import { AxiosRequestConfig } from 'axios';
import { apiTimeout } from 'config';
import { getBaseURL } from './getBaseURL';

export const getAxiosConfig = (url: string): AxiosRequestConfig => ({
  baseURL: getBaseURL(),
  url,
  method: 'GET',
  timeout: apiTimeout
});
