import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { REHYDRATE } from 'redux-persist';

const axiosBaseQuery =
  (): BaseQueryFn<AxiosRequestConfig, unknown, unknown> => async (props) => {
    const {
      url,
      method,
      data,
      params,
      baseURL,
      validateStatus,
      withCredentials
    } = props;

    try {
      const result = await axios({
        url,
        method,
        data,
        params,
        baseURL,
        validateStatus,
        withCredentials
      });

      if (result.data.error || !result.status.toString().startsWith('2')) {
        throw {
          response: {
            message: result.data.message,
            status: result.data.statusCode
          }
        };
      }

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message
        }
      };
    }
  };

export const RootApi = createApi({
  reducerPath: 'API',
  baseQuery: axiosBaseQuery(),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE && action.payload) {
      return action.payload[reducerPath];
    }
  },
  endpoints: () => ({})
});
