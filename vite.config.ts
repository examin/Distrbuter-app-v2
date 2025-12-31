import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // Support both VITE_GEMINI_API_KEY and GEMINI_API_KEY for flexibility
    const apiKey = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || '';
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      // Expose env vars to client (VITE_ prefix is required for client-side access)
      envPrefix: 'VITE_',
      // For Cloudflare Pages: Set VITE_GEMINI_API_KEY in environment variables
      // Vite will automatically expose it to import.meta.env.VITE_GEMINI_API_KEY
      define: {
        // Build-time fallback if env var is set during build
        // Note: This will bundle the key into the client code (security consideration)
        'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(apiKey),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
