import axiosInstance from './axiosInstance'

// TODO: Требуется доработка механизма обновления токена
// Текущая реализация может вызывать циклические запросы
// Возможные решения:
// 1. Использовать отдельный инстанс axios для обновления токена
// 2. Добавить флаг isRefreshing для предотвращения повторных запросов
// 3. Реализовать очередь запросов во время обновления токена

const getAuthDataFromLS = () => {
  const data = localStorage.getItem('auth')
  return data ? JSON.parse(data) : null
}

export const refreshJwt = async () => {
  const authData = getAuthDataFromLS()
  if (!authData?.refreshToken) {
    console.log('No refresh token found')
    return
  }

  try {
    const response = await axiosInstance.post(`/auth/refresh`, {
      refreshToken: authData.refreshToken,
    })

    if (response.status === 200) {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          ...response.data,
        })
      )
      return response.data.accessToken
    } else {
      localStorage.removeItem('auth')
    }
  } catch (error) {
    console.error('Error refreshing token:', error)
    localStorage.removeItem('auth')
  }
}
