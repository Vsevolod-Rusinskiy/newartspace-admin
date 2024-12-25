import { AuthProvider } from 'react-admin'
import axiosInstance from './api/axiosInstance/axiosInstance'

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const { data } = await axiosInstance.post('/auth/login', {
        email: username,
        userPassword: password,
      })

      // Проверяем права администратора
      if (!data.isAdmin) {
        throw new Error('Доступ запрещен. Только для администраторов.')
      }

      // Сохраняем данные в localStorage
      localStorage.setItem(
        'auth',
        JSON.stringify({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          userName: data.userName,
          isAdmin: data.isAdmin,
        })
      )

      // Добавляем токен в заголовки axios для последующих запросов
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.accessToken}`

      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error.message)
    }
  },

  logout: async () => {
    try {
      // Удаляем токен из заголовков
      delete axiosInstance.defaults.headers.common['Authorization']

      // Очищаем localStorage
      localStorage.removeItem('auth')

      return Promise.resolve()
    } catch (error) {
      console.error('Ошибка при выходе:', error)
      localStorage.removeItem('auth')
      return Promise.resolve()
    }
  },

  checkError: (error) => {
    const status = error.status
    if (status === 401 || status === 403) {
      return authProvider.logout()
    }
    return Promise.resolve()
  },

  checkAuth: () => {
    const authData = localStorage.getItem('auth')
    if (!authData) {
      return Promise.reject()
    }

    try {
      const { accessToken, isAdmin } = JSON.parse(authData)

      // Проверяем наличие токена и прав админа
      if (!accessToken || !isAdmin) {
        return authProvider.logout()
      }

      // Обновляем токен в заголовках axios
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${accessToken}`

      return Promise.resolve()
    } catch {
      return authProvider.logout()
    }
  },

  getPermissions: () => {
    const authData = localStorage.getItem('auth')
    if (!authData) return Promise.reject()

    try {
      const { isAdmin } = JSON.parse(authData)
      return Promise.resolve(isAdmin ? 'admin' : 'user')
    } catch {
      return Promise.reject()
    }
  },

  getIdentity: () => {
    const authData = localStorage.getItem('auth')
    if (!authData) return Promise.reject()

    const { userName } = JSON.parse(authData)
    return Promise.resolve({
      id: 'admin',
      fullName: userName,
    })
  },
}

export default authProvider
