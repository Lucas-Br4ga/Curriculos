import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3333',
  timeout: 10_000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  // Import lazily to avoid circular dependency
  const token = (() => {
    try {
      const raw = sessionStorage.getItem('cf_access_token')
      return raw
    } catch {
      return null
    }
  })()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let isRefreshing = false
let refreshQueue: Array<(token: string) => void> = []

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config

    if (error.response?.status === 401 && !original._retry) {
      if (error.response.data?.error === 'TOKEN_EXPIRED') {
        if (isRefreshing) {
          return new Promise((resolve) => {
            refreshQueue.push((token: string) => {
              original.headers.Authorization = `Bearer ${token}`
              resolve(api(original))
            })
          })
        }

        original._retry = true
        isRefreshing = true

        try {
          const { data } = await api.post<{ accessToken: string }>('/auth/refresh')
          sessionStorage.setItem('cf_access_token', data.accessToken)
          refreshQueue.forEach((cb) => cb(data.accessToken))
          refreshQueue = []
          original.headers.Authorization = `Bearer ${data.accessToken}`
          return api(original)
        } catch {
          sessionStorage.removeItem('cf_access_token')
          window.location.href = '/login'
          return Promise.reject(error)
        } finally {
          isRefreshing = false
        }
      }
    }

    return Promise.reject(error)
  },
)

export default api
