/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_APP_PERSIST: 'sessionStorage' | 'localStorage';
  readonly VITE_APP_MSW: 'true' | 'false';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
