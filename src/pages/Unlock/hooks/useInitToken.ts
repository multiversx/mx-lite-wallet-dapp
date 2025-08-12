import { useDispatch, useSelector } from 'react-redux';
import { useGetLoginInfo, useGetNetworkConfig, nativeAuth } from 'lib';
import { HooksEnum } from 'localConstants';
import { hookSelector } from 'redux/selectors';
import { setToken } from 'redux/slices';

export const useInitToken = () => {
  const dispatch = useDispatch();
  const { type: hook, loginToken } = useSelector(hookSelector);
  const { isLoggedIn } = useGetLoginInfo();
  const {
    network: { apiAddress }
  } = useGetNetworkConfig();

  const getInitToken = async () => {
    if (hook === HooksEnum.login) {
      dispatch(setToken(loginToken ?? ''));
      return loginToken;
    }

    if (!isLoggedIn) {
      try {
        const nativeAuthClient = nativeAuth({
          apiAddress,
          origin: window.location.origin
        });

        const newToken = await nativeAuthClient.initialize({
          noCache: true
        });

        dispatch(setToken(newToken));
        return newToken;
      } catch (err) {
        console.error('Unable to fetch login token', err);
      }
    }

    dispatch(setToken(''));
    return '';
  };

  return getInitToken;
};
