// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Trata imágenes y PDF como ficheros del proyecto (no base64 incrustado).
    assetsInlineLimit: 0,
  },
})