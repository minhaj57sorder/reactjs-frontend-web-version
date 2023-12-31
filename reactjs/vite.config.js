import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../',
    assetsDir: '_static_clip_repo',
    copyPublicDir: true
  }
})
