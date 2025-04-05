import axios from 'axios'
import { refreshJwt } from './refreshJwt'

// TODO: Есть проблема с циклическим обновлением токена
// При получении ошибки jwt expired происходит бесконечный цикл запросов
// Временное решение - разлогинивать пользователя
// Требуется реализовать корректное обновление токена
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || 'https://back.newartspace.ru',
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Проверяем наличие объекта response и data
    if (error.response?.data?.message === 'jwt expired') {
      const originalRequest = error.config
      const newToken = await refreshJwt()

      if (newToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`
        return axiosInstance(originalRequest)
      } else {
        // Если не удалось обновить токен, выполняем выход
        localStorage.removeItem('auth')
        delete axiosInstance.defaults.headers.common['Authorization']
        window.location.href = '/#/login'
      }
    }
    // Добавим дополнительно обработку 401 статуса
    else if (error.response?.status === 401) {
      // Выход из системы при 401 ошибке
      localStorage.removeItem('auth')
      delete axiosInstance.defaults.headers.common['Authorization']
      window.location.href = '/#/login'
    } else {
      console.error('Ошибка сети:', error.message)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
