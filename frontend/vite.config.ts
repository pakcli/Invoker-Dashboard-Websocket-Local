import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const certPath = path.resolve(__dirname, '../certs/localhost.pem');
const keyPath = path.resolve(__dirname, '../certs/localhost-key.pem');

const hasCerts = fs.existsSync(certPath) && fs.existsSync(keyPath);

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.mpeg'],
  server: {
    port: 5173,
    https: hasCerts ? {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    } : undefined,
    proxy: {
      '/api': {
        target: hasCerts ? 'https://localhost:5000' : 'http://localhost:5000',
        secure: false,
        changeOrigin: true,
      },
      '/ws': {
        target: hasCerts ? 'wss://localhost:5000' : 'ws://localhost:5000',
        ws: true,
        secure: false,
        changeOrigin: true,
      }
    }
  }
});
