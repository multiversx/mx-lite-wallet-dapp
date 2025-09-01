import './styles/globals.css';
import { createRoot } from 'react-dom/client';
import { networks } from 'config';
import { initApp } from 'lib';
import { FileProviderEnum, IFileProvider, IFileProviderOptions } from 'types';
import { App } from './App';
import 'utils/adapter/gatewayAdapter';
import { KeystoreProvider } from './providers/Keystore/KeystoreProvider';
import { PemProvider } from './providers/Pem/PemProvider';

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

// Get the network from storage (if user previously switched) or fall back to default
const getInitialNetwork = () => {
  try {
    const storedNetworkState = sessionStorage.getItem('persist:network');
    if (storedNetworkState) {
      const parsedState = JSON.parse(storedNetworkState);
      if (parsedState.activeNetwork) {
        const activeNetworkData = JSON.parse(parsedState.activeNetwork);
        const matchingNetwork = networks.find(
          (network) => network.id === activeNetworkData.id
        );
        if (matchingNetwork) {
          return matchingNetwork;
        }
      }
    }
  } catch (error) {
    console.warn('Could not read network from storage:', error);
  }

  // Fall back to default network from config
  return networks.find((network) => network.default) || networks[0];
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
