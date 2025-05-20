import './styles/globals.css';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import 'utils/adapter/gatewayAdapter';
import { initApp } from 'lib/sdkDapp';
import { EnvironmentsEnum } from 'lib/sdkDapp/sdkDapp.types';

const config = {
  storage: { getStorageCallback: () => sessionStorage },
  dAppConfig: {
    nativeAuth: true,
    environment: EnvironmentsEnum.devnet,
    network: {
      walletAddress: window.location.origin
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
