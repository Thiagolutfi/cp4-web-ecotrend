import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/cp4-web-ecotrend/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})

