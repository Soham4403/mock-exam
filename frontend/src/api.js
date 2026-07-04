const API_URL = 'http://localhost:4000/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options)
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'API error')
  return data
}

function authHeaders(token) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

export const api = {
  register(user) {
    return request('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
  },

  login(user) {
    return request('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
  },

  async getProducts(token) {
    try {
      return await request('/products', {
        headers: authHeaders(token),
      })
    } catch {
      return []
    }
  },

  async getOrders(token) {
    try {
      return await request('/orders', {
        headers: authHeaders(token),
      })
    } catch {
      return []
    }
  },

  async placeOrder(order, token) {
    try {
      return await request('/orders', {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify(order),
      })
    } catch {
      return null
    }
  },
}
