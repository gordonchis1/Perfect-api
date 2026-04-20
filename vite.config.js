import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "./",
    root: "src/ui",
    build: {
        outDir: "dist-react",
        rollupOptions: {
            external: ['/electron', 'electron', 'fs', 'path']
        }
    },
    server: {
        port: 3000,
        strictPort: true,

    }

}) 
