import { useCreateRecoverContext } from 'pages/CreateRecover/contexts/createRecover';

export const useCreateRecoverDownload = () => {
  const { keystoreString, createdAddress, createRecoverWalletRoutes } =
    useCreateRecoverContext();

  return {
    createRecoverWalletRoutes,
    keystoreString,
    createdAddress
  };
};
