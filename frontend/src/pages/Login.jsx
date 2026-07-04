import { useState } from 'react'
import { api } from '../api'
import { setRoute } from '../utils'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!email || !password) return setError('Email and password are required')
    if (password.length < 6) return setError('Password must be at least 6 characters')

    try {
      const user = await api.login({ email, password })
      onLogin(user)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="auth">
      <div className="auth-left">
        <h1>ShopAdmin</h1>
        <p>Manage products, cart and orders in one simple dashboard.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>Login</button>
        <p>
          New user? <span onClick={() => setRoute('register')}>Register</span>
        </p>
      </form>
    </div>
  )
}

export default Login
