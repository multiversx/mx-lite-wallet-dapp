import './styles/globals.css';
import { createRoot } from 'react-dom/client';
import { initApp } from 'lib';
import { IFileProvider, IFileProviderOptions } from 'types';
import { getCurrentNetwork } from 'utils/api/getCurrentNetwork';
import { App } from './App';
import 'utils/adapter/gatewayAdapter';
import { KeystoreProvider } from './providers/Keystore/KeystoreProvider';
import { PemProvider } from './providers/Pem/PemProvider';

const providers: IFileProvider[] = [
  {
    name: 'PEM File',
    type: 'pemProvider',
    iconUrl: `${window.location.origin}/pem-icon.svg`,
    constructor: async (options?: IFileProviderOptions) =>
      new PemProvider(options)
  },
  {
    name: 'Keystore File',
    type: 'keystoreProvider',
    iconUrl: `${window.location.origin}/keystore-icon.svg`,
    constructor: async (options?: IFileProviderOptions) =>
      new KeystoreProvider(options)
  }
];

const activeNetwork = getCurrentNetwork();
const config = {
  storage: { getStorageCallback: () => sessionStorage },
  dAppConfig: {
    nativeAuth: true,
    network: {
      ...activeNetwork,
      walletAddress: activeNetwork.walletAddress || window.location.origin
    },
    successfulToastLifetime: 5000
  },
  customProviders: providers
};

async function start() {
  if (import.meta.env.VITE_APP_MSW === 'true') {
    // Dynamically import the module
    const { worker } = await import('./__mocks__/server');

    await worker.start({
      onUnhandledRequest: 'bypass'
    });
  }

  initApp(config).then(() => {
    const container = document.getElementById('root');
    const root = createRoot(container as HTMLElement);
    root.render(<App />);
  });
}

start();
