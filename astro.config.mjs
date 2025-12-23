import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  // Performance optimizations
  build: {
    inlineStylesheets: 'auto', // Inline small stylesheets for faster loading
  },
  vite: {
    build: {
      cssCodeSplit: true, // Split CSS for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate vendor chunks for better caching
            'react-vendor': ['react', 'react-dom'],
          },
        },
      },
    },
  },
  // Compress output
  compressHTML: true,
});

