import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    root: "src/ui",
    base: "./",
    build: {
        outDir: resolve(__dirname, "dist-react"),
        rollupOptions: {
            external: ['/electron', 'electron', 'fs', 'path']
        }
    },
    server: {
        port: 3000,
        strictPort: true,

    }

}) 
