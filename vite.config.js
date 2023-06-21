import {defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/api' : 'http://localhost:4000',
            '/auth' : 'http://localhost:4000',
            '/user' : 'http://localhost:4000',
            '/place' : 'http://localhost:4000',
            '/ws': {
                target: 'ws://localhost:4000',
                ws: true,
            },
        },
    },
});