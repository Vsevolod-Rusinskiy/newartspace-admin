import axiosInstance from './axiosInstance'

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
    console.log('Attempting to refresh token...')
    const response = await axiosInstance.post(`/auth/refresh`, {
      refreshToken: authData.refreshToken,
    })

    if (response.status === 200) {
      console.log('Token refresh successful')
      localStorage.setItem(
        'auth',
        JSON.stringify({
          ...response.data,
        })
      )
      return response.data.accessToken
    } else {
      console.error('Token refresh failed with status:', response.status)
      localStorage.removeItem('auth')
    }
  } catch (error) {
    console.error('Error refreshing token:', error)
  }
}
