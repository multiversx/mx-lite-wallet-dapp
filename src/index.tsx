import './styles/globals.css';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import 'utils/adapter/gatewayAdapter';

async function start() {
  if (import.meta.env.VITE_APP_MSW === 'true') {
    // Dynamically import the module
    const { worker } = await import('./__mocks__/server');

    await worker.start({
      onUnhandledRequest: 'bypass'
    });
  }

  const container = document.getElementById('root');
  const root = createRoot(container as HTMLElement);
  root.render((<App />) as any);
}

start();
