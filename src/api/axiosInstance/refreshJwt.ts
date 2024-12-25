import axiosInstance from './axiosInstance'

const getAuthDataFromLS = () => {
  const data = localStorage.getItem('auth')
  return data ? JSON.parse(data) : null
}

export const refreshJwt = async () => {
  const authData = getAuthDataFromLS()
  if (!authData?.refreshToken) {
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
    console.error('Ошибка при обновлении токена:', error)
  }
}
