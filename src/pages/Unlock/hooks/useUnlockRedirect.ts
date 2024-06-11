import { useSelector } from 'react-redux';
import { useNavigate } from 'hooks';
import { hookSelector } from 'redux/selectors';
import { HooksEnum } from 'routes';
import { useOnLoginHookRedirect } from './useOnLoginHookRedirect';
import { useRedirectPathname } from '../Keystore/helpers/useRedirectPathname';

export const useUnlockRedirect = () => {
  const onLoginHookRedirect = useOnLoginHookRedirect();
  const navigate = useNavigate({ from: 'useUnlockRedirect' });
  const { type: hook } = useSelector(hookSelector);
  const pathname = useRedirectPathname();

  return () => {
    const shouldReplyToDapp = hook === HooksEnum.login;

    if (shouldReplyToDapp) {
      onLoginHookRedirect();
    }

    navigate(pathname, { replace: true });
  };
};
