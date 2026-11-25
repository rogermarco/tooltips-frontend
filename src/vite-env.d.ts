/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL for the data JSON files. Defaults to the live Cloudflare data. */
  readonly VITE_DATA_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** The parts of the Twitch Extension helper (twitch-ext.min.js) this app uses. */
interface TwitchContext {
  game?: string;
  playerChannel?: string;
}

interface Window {
  Twitch?: {
    ext: {
      onContext(callback: (context: TwitchContext, changed: string[]) => void): void;
    };
  };
}
