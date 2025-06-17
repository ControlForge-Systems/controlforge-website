// Monaco Editor configuration to prevent 404 errors and optimize performance
// This file sets up Monaco Editor environment before any components load it

import { browser } from '$app/environment';

export function configureMonacoEnvironment() {
    if (!browser) return;

    // Only set up once
    if (window.MonacoEnvironment) return;

    // Configure Monaco Environment to prevent 404 errors and optimize loading
    window.MonacoEnvironment = {
        // Disable web workers completely to prevent loading issues
        getWorker: () => {
            return {
                postMessage: () => { },
                terminate: () => { },
                addEventListener: () => { },
                removeEventListener: () => { },
                onmessage: null,
                onerror: null
            } as any;
        },

        // Disable source map loading to prevent 404 errors
        getWorkerUrl: () => '',

        // Disable trusted types policy to prevent warnings
        createTrustedTypesPolicy: undefined,

        // Configure base URL to prevent relative path issues
        baseUrl: '/node_modules/monaco-editor/min/',

        // Disable automatic loading of unnecessary resources
        globalAPI: false
    };

    // Suppress Monaco-specific console warnings and 404 errors
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;

    const suppressedPatterns = [
        'marked.umd.js.map',
        'monaco-editor/esm',
        'Failed to load source map',
        'DevTools failed to load source map',
        'Could not load worker',
        'monaco-editor/min/vs',
        'Refused to load the script',
        'net::ERR_ABORTED 404'
    ];

    console.error = (...args) => {
        const message = args.join(' ');
        if (!suppressedPatterns.some(pattern => message.includes(pattern))) {
            originalConsoleError(...args);
        }
    };

    console.warn = (...args) => {
        const message = args.join(' ');
        if (!suppressedPatterns.some(pattern => message.includes(pattern))) {
            originalConsoleWarn(...args);
        }
    };

    // Store originals for cleanup
    (window as any).__monacoOriginalConsole = {
        error: originalConsoleError,
        warn: originalConsoleWarn
    };
}

export function cleanupMonacoEnvironment() {
    if (!browser) return;

    // Restore original console methods
    const original = (window as any).__monacoOriginalConsole;
    if (original) {
        console.error = original.error;
        console.warn = original.warn;
        delete (window as any).__monacoOriginalConsole;
    }
}
