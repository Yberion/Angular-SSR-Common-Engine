/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/assets',
  build: {
    target: ['es2020']
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [analog({
    vite: {
      // tsconfig: 'tsconfig..json'
    },
    ssr: true,
    nitro: {
      entry: __dirname + '/server/fastify/server.ts'
    }
  })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test.ts'],
    include: ['**/*.spec.ts'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
