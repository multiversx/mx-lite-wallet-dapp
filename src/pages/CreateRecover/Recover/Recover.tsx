import { Outlet } from 'react-router-dom';
import { CreateRecoverContextProvider } from 'pages/CreateRecover/contexts/createRecover';
import { CreateRecoverProviderTypeEnum } from 'pages/CreateRecover/contexts/createRecover/reducer';
import { RecoverLayoutWrapper } from './wrapper';

export const Recover = ({
  Wrapper = RecoverLayoutWrapper
}: {
  Wrapper?: typeof RecoverLayoutWrapper;
}) => {
  return (
    <Wrapper>
      <CreateRecoverContextProvider
        providerType={CreateRecoverProviderTypeEnum.recover}
      >
        <Outlet />
      </CreateRecoverContextProvider>
    </Wrapper>
  );
};
