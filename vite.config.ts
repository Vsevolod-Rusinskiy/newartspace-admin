import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  define: {
    'process.env': process.env,
    'import.meta.env.VITE_APP_API_URL': JSON.stringify(
      process.env.VITE_APP_API_URL
    ),
  },
  base: './',
})
