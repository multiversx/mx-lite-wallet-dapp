import './styles/globals.css';
import { createRoot } from 'react-dom/client';
import { initApp } from 'lib';
import { App } from './App';
import 'utils/adapter/gatewayAdapter';
import { KeystoreProvider } from './providers/KeystoreProvider';
import { PemProvider } from './providers/PemProvider';
import { getCurrentNetwork } from 'utils/api/getCurrentNetwork';

interface ICustomProvider {
  name: string;
  type: string;
  iconUrl: string;
  constructor: (options?: any) => Promise<any>;
}

const providers: ICustomProvider[] = [
  {
    name: 'PEM File',
    type: 'pemProvider',
    iconUrl: `${window.location.origin}/pem-icon.svg`,
    constructor: async (options?: any) => new PemProvider(options)
  },
  {
    name: 'Keystore File',
    type: 'keystoreProvider',
    iconUrl: `${window.location.origin}/keystore-icon.svg`,
    constructor: async (options?: any) => new KeystoreProvider(options)
  }
];

(window as any).multiversx = {};
(window as any).multiversx.providers = providers;

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
  }
};

async function start() {
  if (import.meta.env.VITE_APP_MSW === 'true') {
    // Dynamically import the module
    const { worker } = await import('./__mocks__/server');

    await worker.start({
      onUnhandledRequest: 'bypass'
    });
  }

  await initApp(config);

  const container = document.getElementById('root');
  const root = createRoot(container as HTMLElement);
  root.render((<App />) as any);
}

start();
