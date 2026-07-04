import { useState } from 'react'
import { api } from '../api'
import { setRoute } from '../utils'

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('')

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return setError('All fields are required')
    }

    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters')
    }

    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match')
    }

    try {
      const userData = {
        name: form.name,
        email: form.email,
        password: form.password,
      }

      await api.register(userData)
      setRoute('login')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="auth">
      <div className="auth-left">
        <h1>ShopAdmin</h1>
        <p>Create your account and start managing products.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        {error && <p className="error">{error}</p>}

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={updateField}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={updateField}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={updateField}
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={updateField}
        />

        <button type="submit">Create Account</button>

        <p>
          Already registered?{' '}
          <span onClick={() => setRoute('login')} style={{ cursor: 'pointer' }}>
            Login
          </span>
        </p>
      </form>
    </div>
  )
}

export default Register
