import { AuthProvider } from 'react-admin'

const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://back.newartspace.ru'

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          email: username,
          userPassword: password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 401) {
        throw new Error('Неверный email или пароль')
      }

      const data = await response.json()

      // Проверяем права администратора
      if (!data.isAdmin) {
        throw new Error('Доступ запрещен. Только для администратора.')
      }

      // Сохраняем токены и данные пользователя
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('userName', data.userName)

      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error.message)
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userName')
    return Promise.resolve()
  },

  checkError: (error) => {
    const status = error.status
    if (status === 401) {
      localStorage.removeItem('accessToken')
      return Promise.reject()
    }
    return Promise.resolve()
  },

  checkAuth: () => {
    return localStorage.getItem('accessToken')
      ? Promise.resolve()
      : Promise.reject()
  },

  getPermissions: () => Promise.resolve(),

  getIdentity: () => {
    const userName = localStorage.getItem('userName')

    return Promise.resolve({
      id: 'admin',
      fullName: userName,
    })
  },
}

export default authProvider
