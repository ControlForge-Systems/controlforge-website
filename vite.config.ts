import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig(({ mode }) => ({
	plugins: [sveltekit(), devtoolsJson()],
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
					// Node modules get separate vendor chunks based on size
					if (id.includes('node_modules')) {
						// Large packages get their own chunks
						if (id.includes('svelte')) {
							return 'svelte-vendor';
						}
						if (id.includes('@sveltejs/kit')) {
							return 'sveltekit-vendor';
						}
						// Shiki gets its own chunk (much smaller than Monaco)
						if (id.includes('shiki')) {
							return 'shiki';
						}
						// Group smaller vendor packages
						return 'vendor';
					}

					// Don't separate components - let them bundle with routes to avoid circular deps
					// Routes naturally split at page boundaries via SvelteKit
				}
			},
			onwarn(warning, warn) {
				// Suppress sourcemap warnings for specific files
				if (
					warning.code === 'MISSING_SOURCEMAP_SOURCE' &&
					warning.message.includes('node_modules/marked/lib/marked.umd.js')
				) {
					return;
				}
				// Use default warning handler for other warnings
				warn(warning);
			}
		},
		// Use Terser for better compression in production
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: mode === 'production',
				drop_debugger: mode === 'production',
				pure_funcs:
					mode === 'production'
						? ['console.log', 'console.info', 'console.debug', 'console.warn']
						: []
			},
			mangle: {
				safari10: true
			},
			format: {
				comments: false
			}
		}
	}
}));
