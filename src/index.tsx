import './styles/globals.css';
import { createRoot } from 'react-dom/client';
import { App } from './App';

if (import.meta.env.VITE_APP_MSW === 'true') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = require('./__mocks__/server');

  worker.start({
    onUnhandledRequest: 'bypass'
  });
}

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render((<App />) as any);
