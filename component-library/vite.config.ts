import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
export default defineConfig({
  root: path.resolve(import.meta.dirname, 'preview'),
  plugins: [react(), tailwindcss()],
  server: { host: '127.0.0.1', port: 4317, strictPort: true },
  build: { outDir: path.resolve(import.meta.dirname, 'preview-dist'), emptyOutDir: true },
});
