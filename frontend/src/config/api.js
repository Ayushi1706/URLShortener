export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

export const SHORT_URL_BASE =
  import.meta.env.VITE_SHORT_URL_BASE || 'http://localhost:8080'

export const ENDPOINTS = {
  login: '/auth/login',
  register: '/auth/register',
  createLink: '/links',
  getLinks: '/links',
  linkAnalytics: (shortCode) => `/analytics/${shortCode}`,
}

const TOKEN_KEY = 'linkpulse_token'

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),

  set: (token) => localStorage.setItem(TOKEN_KEY, token),

  clear: () => localStorage.removeItem(TOKEN_KEY),
}

export class ApiError extends Error {
  constructor(message, status, body) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

async function request(
  path,
  { method = 'GET', body, headers = {}, signal } = {}
) {
  const token = tokenStore.get()

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token
        ? { Authorization: `Bearer ${token}` }
        : {}),
      ...headers,
    },
    body:
      body !== undefined
        ? JSON.stringify(body)
        : undefined,
    signal,
  })

  const contentType =
    res.headers.get('content-type') || ''

  const data =
    contentType.includes('application/json')
      ? await res.json().catch(() => null)
      : null

  if (!res.ok) {
    throw new ApiError(
      data?.message || res.statusText,
      res.status,
      data
    )
  }

  return data
}

export const authApi = {
  async login(email, password) {
    const data = await request(
      ENDPOINTS.login,
      {
        method: 'POST',
        body: {
          email,
          password,
        },
      }
    )

    if (data?.token) {
      tokenStore.set(data.token)
    }

    return data
  },

  async register(name, email, password) {
    const data = await request(
      ENDPOINTS.register,
      {
        method: 'POST',
        body: {
          name,
          email,
          password,
        },
      }
    )

    if (data?.token) {
      tokenStore.set(data.token)
    }

    return data
  },

  async logout() {
    tokenStore.clear()
  },
}

export const linksApi = {
  async create(payload) {
    return request(
      ENDPOINTS.createLink,
      {
        method: 'POST',
        body: payload,
      }
    )
  },

  async getAll() {
    return request(ENDPOINTS.getLinks)
  },
}

export const analyticsApi = {
  async forLink(shortCode) {
    return request(
      ENDPOINTS.linkAnalytics(shortCode)
    )
  },
}

export const getShortUrl = (shortCode) => {
  return `${SHORT_URL_BASE}/${shortCode}`
}

export default {
  authApi,
  linksApi,
  analyticsApi,
  tokenStore,
  ApiError,
  BASE_URL,
  SHORT_URL_BASE,
  ENDPOINTS,
  getShortUrl,
}