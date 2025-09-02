import './styles/globals.css';
import { createRoot } from 'react-dom/client';
import { initApp } from 'lib';
import { FileProviderEnum, IFileProvider, IFileProviderOptions } from 'types';
import { App } from './App';
import 'utils/adapter/gatewayAdapter';
import { KeystoreProvider } from './providers/Keystore/KeystoreProvider';
import { PemProvider } from './providers/Pem/PemProvider';
import { store } from './redux/store';

const providers: IFileProvider[] = [
  {
    name: 'PEM File',
    type: FileProviderEnum.PEM,
    iconUrl: `${window.location.origin}/favicon-32x32.png`,
    constructor: async (options?: IFileProviderOptions) =>
      new PemProvider(options)
  },
  {
    name: 'Keystore File',
    type: FileProviderEnum.KEYSTORE,
    iconUrl: `${window.location.origin}/favicon-32x32.png`,
    constructor: async (options?: IFileProviderOptions) =>
      new KeystoreProvider(options)
  }
];

const getInitialNetwork = () => {
  const state = store.getState();
  return state.network.activeNetwork;
};

const activeNetwork = getInitialNetwork();
const config = {
  storage: { getStorageCallback: () => sessionStorage },
  dAppConfig: {
    nativeAuth: true,
    network: {
      ...activeNetwork,
      walletAddress: activeNetwork.walletAddress
    },
    successfulToastLifetime: 5000
  },
  customProviders: providers
};

async function start() {
  if (import.meta.env.VITE_APP_MSW === 'true') {
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
