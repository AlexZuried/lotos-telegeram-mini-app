/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        // 1. Disable sourcemaps to save memory and speed up 'transforming'
        sourcemap: false,
        // 2. Reduce the chunk size warning limit
        chunkSizeWarningLimit: 1600,
        rollupOptions: {
            output: {
                // 3. Manual chunking to prevent one giant file from hanging the build
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                },
            },
        },
    },
});
