import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    fs: {
      allow: ['.'],
    },
    // Tell Vite to fallback to index.html for SPA routes like /add-doctor
    historyApiFallback: true,
  },
})
