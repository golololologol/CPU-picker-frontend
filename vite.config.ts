/// <reference types="vite/client" />
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => { // Add mode back
  const env = loadEnv(mode, process.cwd(), '');

  // Use loaded env variable for proxy target, fallback if needed
  const proxyTarget = env.VITE_API_BASE_URL || '/api';

  return {
    plugins: [react()],
    // Remove the define section entirely
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      outDir: 'dist',
    },
  };
});