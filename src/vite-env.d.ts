/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL for the data JSON files. Defaults to the live Cloudflare data. */
  readonly VITE_DATA_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
