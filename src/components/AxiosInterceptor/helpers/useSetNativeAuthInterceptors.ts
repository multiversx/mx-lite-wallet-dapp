import axios from 'axios';
import { useSelector } from 'react-redux';
import { retry } from 'helpers';
import { useAxiosInterceptorContext } from 'lib';
import { IS_TEST } from 'localConstants';
import { accountSelector } from 'redux/selectors';

let nativeAuthToken: string | undefined;
let requestInterceptorId = -1;

export const useSetNativeAuthInterceptors = () => {
  const {
    loginInfo: { tokenLogin }
  } = useAxiosInterceptorContext();
  const { externalNativeAuthToken } = useSelector(accountSelector);
  nativeAuthToken = externalNativeAuthToken || tokenLogin?.nativeAuthToken;

  /**
   * `isLoggedIn` gets set before token arrives, so this polling makes
   * `axios` wait until token arrives
   */
  const getToken = async (): Promise<string> => {
    const pollForToken = () =>
      new Promise(function (resolve, reject) {
        if (nativeAuthToken) {
          resolve(nativeAuthToken);
        }

        return IS_TEST
          ? resolve('Auth token not found')
          : reject('Auth token not found');
      });

    return retry({
      fn: pollForToken,
      retries: 3,
      error: 'Auth token not found'
    });
  };

  const setNativeAuthTokenInterceptors = (
    newToken?: string,
    onRequest?: () => void
  ) => {
    axios.interceptors.request.eject(requestInterceptorId);
    requestInterceptorId = axios.interceptors.request.use(
      async (config) => {
        onRequest?.();

        let bearerToken = newToken;
        const hasAllowedURLs =
          config.baseURL?.includes('extras-api.multiversx.com') ||
          config.baseURL?.includes('api.xportal.com') ||
          config.baseURL?.includes('tools.multiversx.com');

        if (hasAllowedURLs) {
          try {
            bearerToken = await getToken();
          } catch (error) {
            console.log(error);
          }
        }

        if (!bearerToken) {
          return config;
        }

        config.headers.set('Authorization', `Bearer ${bearerToken}`);

        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
  };

  return { nativeAuthToken, setNativeAuthTokenInterceptors };
};
