import axios from 'axios'
import { refreshJwt } from './refreshJwt'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || 'https://back.newartspace.ru',
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('Interceptor caught error:', error.response?.data)

    if (error.response.data.message === 'jwt expired') {
      console.log('Token expired, attempting refresh...')
      const originalRequest = error.config
      const newToken = await refreshJwt()

      if (newToken) {
        console.log('Token refreshed successfully')
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`
        return axiosInstance(originalRequest)
      } else {
        console.error('Token refresh failed')
      }
    } else {
      console.error('Ошибка сети:', error.message)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
