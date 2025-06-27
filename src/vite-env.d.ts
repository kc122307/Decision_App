// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://decision-app-1ds2.onrender.com/', // Proxy API requests to backend
    },
  },
});