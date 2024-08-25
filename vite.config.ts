import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Загружаем переменные окружения на основе текущего режима
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    server: {
      host: true,
    },
    define: {
      // Передаем переменные окружения в код
      'process.env': process.env,
      'import.meta.env.VITE_APP_API_URL': JSON.stringify(env.VITE_APP_API_URL),
    },
    base: './',
  }
})
