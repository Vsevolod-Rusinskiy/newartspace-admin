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
  console.log(
    `🔄 [RefreshJwt] Processing queue (${failedQueue.length} items)`,
    error ? 'with error' : 'with token'
  )
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
  console.log('🔑 [RefreshJwt] refreshJwt() called')

  // Если уже обновляем токен, добавляем запрос в очередь
  if (isRefreshing) {
    console.log(
      '⏳ [RefreshJwt] Token refresh already in progress, adding to queue'
    )
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject })
    })
  }

  const authData = getAuthDataFromLS()
  if (!authData?.refreshToken) {
    console.log('❌ [RefreshJwt] No refresh token found in localStorage')
    return null
  }

  console.log('🔄 [RefreshJwt] Starting token refresh process')
  isRefreshing = true

  try {
    console.log('📡 [RefreshJwt] Sending refresh request to server')
    const response = await refreshAxiosInstance.post(`/auth/refresh`, {
      refreshToken: authData.refreshToken,
    })

    console.log('📥 [RefreshJwt] Server response received', response.status)

    if (response.status === 200) {
      console.log('✅ [RefreshJwt] Token refreshed successfully')
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
      console.log('❌ [RefreshJwt] Failed to refresh token, response not 200')
      processQueue(new Error('Failed to refresh token'))
      localStorage.removeItem('auth')
      return null
    }
  } catch (error) {
    console.error('💥 [RefreshJwt] Error refreshing token:', error)
    processQueue(
      error instanceof Error
        ? error
        : new Error('Unknown error during token refresh')
    )
    localStorage.removeItem('auth')
    return null
  } finally {
    console.log('🏁 [RefreshJwt] Token refresh process completed')
    isRefreshing = false
  }
}
