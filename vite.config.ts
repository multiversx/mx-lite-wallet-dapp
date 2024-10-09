import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

const port = Number(process.env.PORT) || 3000;
const proxyHost = `https://localhost:${port}`;

export default defineConfig({
  server: {
    port,
    strictPort: true,
    https: true,
    host: true,
    proxy: {
      proxyHost
    },
    hmr: {
      overlay: false
    },
    watch: {
      usePolling: false,
      useFsEvents: false
    }
  },
  plugins: [
    react(),
    basicSsl(),
    tsconfigPaths(),
    svgrPlugin(),
    nodePolyfills({
      globals: { Buffer: true, global: true, process: true }
    })
  ],
  build: {
    outDir: 'build'
  },
  preview: {
    port: 3002,
    https: true,
    host: 'localhost',
    strictPort: true
  }
});
