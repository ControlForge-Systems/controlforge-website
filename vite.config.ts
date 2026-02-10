import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
  plugins: [
    sveltekit(),
    // Removed Monaco Editor plugin to reduce main bundle size
    // Monaco will be loaded dynamically only when needed
    devtoolsJson()
  ],
  optimizeDeps: {
    // Don't pre-bundle Monaco - we want it to load lazily
    exclude: ['monaco-editor']
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
          // Monaco Editor gets its own chunk and should be loaded lazily
          if (id.includes('monaco-editor')) {
            return 'monaco-editor';
          }

          // Node modules get separate vendor chunks based on size
          if (id.includes('node_modules')) {
            // Large packages get their own chunks
            if (id.includes('svelte')) {
              return 'svelte-vendor';
            }
            if (id.includes('@sveltejs/kit')) {
              return 'sveltekit-vendor';
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
            // Separate docs routes from main routes
            if (id.includes('/src/routes/docs/')) {
              return 'routes-docs';
            }
            return 'routes';
          }
        }
      },
      onwarn(warning, warn) {
        // Suppress sourcemap warnings for specific files
        if (warning.code === 'MISSING_SOURCEMAP_SOURCE' && warning.message.includes('node_modules/marked/lib/marked.umd.js')) {
          return;
        }
        // Use default warning handler for other warnings
        warn(warning);
      }
    },
    // Increase chunk size warning limit to 1MB for Monaco Editor
    chunkSizeWarningLimit: 1000,
    // Use Terser for better compression in production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: process.env.NODE_ENV === 'production',
        pure_funcs: process.env.NODE_ENV === 'production' 
          ? ['console.log', 'console.info', 'console.debug', 'console.warn']
          : [],
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
  }
});
