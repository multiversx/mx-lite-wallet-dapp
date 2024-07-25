import { Outlet } from 'react-router-dom';
import { CreateRecoverContextProvider } from 'pages/CreateRecover/contexts/createRecover';
import { CreateRecoverProviderTypeEnum } from 'pages/CreateRecover/contexts/createRecover/reducer';
import { CreateLayoutWrapper } from './wrapper';

export const Create = ({
  Wrapper = CreateLayoutWrapper
}: {
  Wrapper?: typeof CreateLayoutWrapper;
}) => {
  return (
    <Wrapper>
      <CreateRecoverContextProvider
        providerType={CreateRecoverProviderTypeEnum.create}
      >
        <Outlet />
      </CreateRecoverContextProvider>
    </Wrapper>
  );
};
