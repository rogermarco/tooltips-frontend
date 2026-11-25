import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

// Local copy of the worker's data, used by `npm run dev:local` and `npm run test:local`.
// Set LOCAL_DATA_DIR per machine in a gitignored .env.local (see .env.example);
// a real environment variable takes precedence over the file.
const env = loadEnv('', import.meta.dirname, '');
export const LOCAL_DATA_DIR =
  env.LOCAL_DATA_DIR ??
  path.join(
    os.homedir(),
    'Desktop/repos/aoe2tooltips/tooltips-worker/polished-wood-7fcb/data',
  );

// Dev-server only: serves LOCAL_DATA_DIR at /local-data/ so the app can
// render unreleased data (set VITE_DATA_URL=/local-data/ to use it).
const localData = {
  name: 'local-data',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/local-data', (req, res) => {
      const file = path.join(
        LOCAL_DATA_DIR,
        path.basename(req.url.split('?')[0]),
      );
      if (!file.endsWith('.json') || !fs.existsSync(file)) {
        res.statusCode = 404;
        return res.end(`Not found in ${LOCAL_DATA_DIR}`);
      }
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-store');
      fs.createReadStream(file).pipe(res);
    });
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), basicSsl(), localData],
  test: {
    include: ['src/**/*.test.{js,jsx,ts}'],
  },
});
