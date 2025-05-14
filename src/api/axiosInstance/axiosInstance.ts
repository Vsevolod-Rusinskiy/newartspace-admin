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
    // Если запрос был отменен, просто проксируем ошибку
    if (axios.isCancel(error)) return Promise.reject(error)

    // Проверяем наличие объекта response и data
    if (error.response?.data?.message === 'jwt expired') {
      console.log('🔄 [Interceptor] JWT expired, attempting to refresh token')

      const originalRequest = error.config

      // Предотвращаем повторные попытки обновления токена для того же запроса
      if (originalRequest._retry) {
        console.log('🛑 [Interceptor] Retry attempt failed, logging out user')
        // Если это повторная попытка, выполняем выход
        localStorage.removeItem('auth')
        delete axiosInstance.defaults.headers.common['Authorization']
        window.location.href = '/#/login'
        return Promise.reject(error)
      }

      originalRequest._retry = true

      try {
        console.log('🔑 [Interceptor] Calling refreshJwt()')
        const newToken = await refreshJwt()

        if (newToken) {
          console.log(
            '✅ [Interceptor] Token refreshed successfully, retrying original request'
          )
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`
          return axiosInstance(originalRequest)
        } else {
          console.log(
            '❌ [Interceptor] Failed to get new token, logging out user'
          )
          // Если не удалось обновить токен, выполняем выход
          localStorage.removeItem('auth')
          delete axiosInstance.defaults.headers.common['Authorization']
          window.location.href = '/#/login'
          return Promise.reject(error)
        }
      } catch (refreshError) {
        console.log(
          '💥 [Interceptor] Error during token refresh, logging out user'
        )
        // Если произошла ошибка при обновлении токена
        localStorage.removeItem('auth')
        delete axiosInstance.defaults.headers.common['Authorization']
        window.location.href = '/#/login'
        return Promise.reject(refreshError)
      }
    }
    // Добавим дополнительно обработку 401 статуса
    else if (error.response?.status === 401) {
      console.log(
        '🚫 [Interceptor] 401 Unauthorized response, logging out user'
      )
      // Выход из системы при 401 ошибке
      localStorage.removeItem('auth')
      delete axiosInstance.defaults.headers.common['Authorization']
      window.location.href = '/#/login'
    } else {
      console.error('❌ [Interceptor] Network error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
