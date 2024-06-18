/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_APP_PERSIST: 'sessionStorage' | 'localStorage';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
