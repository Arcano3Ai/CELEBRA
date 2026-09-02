import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app-v4.js',
        chunkFileNames: 'assets/[name]-v4.js',
        assetFileNames: 'assets/[name]-v4.[ext]'
      }
    }
  },
  plugins: [
    tailwindcss(),
    react()
  ],
})
