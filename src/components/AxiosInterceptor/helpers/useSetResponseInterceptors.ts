import { useState } from 'react';
import axios from 'axios';

export const useSetResponseInterceptors = () => {
  const [responseId, setResponseId] = useState(-1);
  const [axiosErrorUrl, setAxiosErrorUrl] = useState('');

  const setResponseInterceptors = () => {
    const newResponseId = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        let url = error.config.url;
        if (error.config.params) {
          const queryString = new URLSearchParams(error.config.params);
          url += `?${queryString.toString()}`;
        }
        try {
          const { pathname } = new URL(url);
          if (pathname === '/websocket/config') {
            // send event to InternalTestnetLoop
            const customEvent = new CustomEvent('wsFailed');
            document.dispatchEvent(customEvent);
          }
        } catch {}

        setAxiosErrorUrl(url);
        return Promise.reject(error);
      }
    );
    setResponseId(newResponseId);
  };

  return { setResponseInterceptors, responseId, axiosErrorUrl };
};
