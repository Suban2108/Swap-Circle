import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server:{
    port: 3000, // Set custom port number
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // <--- Alias '@' to 'src' folder
    },
  },
})