import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      '/2025': {
        target: 'https://bits-oasis.org',
        changeOrigin: true,
        secure: false,
        headers: {
          'Origin': 'https://bits-oasis.org',
          'Referer': 'https://bits-oasis.org/'
        }
      }
    }
  }
})