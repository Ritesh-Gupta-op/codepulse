import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000', // localhost এর জায়গায় 127.0.0.1
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom') || id.includes('react-router')) {
              return 'router';
            }

            if (id.includes('recharts')) {
              return 'charts';
            }

            if (id.includes('framer-motion')) {
              return 'motion';
            }

            if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/')) {
              return 'react-core';
            }
          }
        },
      },
    },
  },
});