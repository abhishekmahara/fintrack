import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

process.env.NAPI_RS_FORCE_WASI = process.env.NAPI_RS_FORCE_WASI || '1'

const { default: tailwindcss } = await import('@tailwindcss/vite')

export default defineConfig({
  build: {
    emptyOutDir: false,
  },
  plugins: [react(), tailwindcss()],
})
