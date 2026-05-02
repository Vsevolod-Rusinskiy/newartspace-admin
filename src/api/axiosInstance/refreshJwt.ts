import axios from 'axios'

// Создаем отдельный инстанс axios без интерцепторов для обновления токена
const refreshAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || 'https://back.newartspace.ru',
})

// Определение типа для элементов очереди
interface QueueItem {
  resolve: (value: string | null) => void
  reject: (reason?: any) => void
}

// Флаг для отслеживания процесса обновления токена
let isRefreshing = false
// Очередь запросов, ожидающих обновления токена
let failedQueue: QueueItem[] = []

const processQueue = (
  error: Error | null,
  token: string | null = null
): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

const getAuthDataFromLS = () => {
  const data = localStorage.getItem('auth')
  return data ? JSON.parse(data) : null
}

export const refreshJwt = async () => {
  // Если уже обновляем токен, добавляем запрос в очередь
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject })
    })
  }

  const authData = getAuthDataFromLS()
  if (!authData?.refreshToken) {
    return null
  }

  isRefreshing = true

  try {
    const response = await refreshAxiosInstance.post(`/auth/refresh`, {
      refreshToken: authData.refreshToken,
    })

    if (response.status === 200) {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          ...response.data,
        })
      )

      const newToken = response.data.accessToken
      processQueue(null, newToken)
      return newToken
    } else {
      processQueue(new Error('Failed to refresh token'))
      localStorage.removeItem('auth')
      return null
    }
  } catch (error) {
    processQueue(
      error instanceof Error
        ? error
        : new Error('Unknown error during token refresh')
    )
    localStorage.removeItem('auth')
    return null
  } finally {
    isRefreshing = false
  }
}
