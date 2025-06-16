import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  optimizeDeps: {
    include: ['monaco-editor']
  },
  define: {
    global: 'globalThis'
  },
  server: {
    fs: {
      allow: ['..']
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Monaco Editor gets its own chunk since it's large
          if (id.includes('monaco-editor')) {
            return 'monaco';
          }

          // Node modules get separate vendor chunks based on size
          if (id.includes('node_modules')) {
            // Large packages get their own chunks
            if (id.includes('svelte')) {
              return 'svelte-vendor';
            }
            // Group smaller vendor packages
            return 'vendor';
          }

          // Components get their own chunk to enable better caching
          if (id.includes('/src/lib/components/')) {
            return 'components';
          }

          // Routes get separate chunks for code splitting
          if (id.includes('/src/routes/')) {
            return 'routes';
          }
        }
      }
    },
    // Increase chunk size warning limit to 1MB for Monaco Editor
    chunkSizeWarningLimit: 1000
  }
});
