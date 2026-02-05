import { useState, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { HOMESERVER_URL } from '../config'
import './LoginForm.css'

export function LoginForm() {
  const { login, error, loading, clearError } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!username.trim() || !password) return
      try {
        await login(username.trim(), password)
      } catch {
        // error is set in context
      }
    },
    [login, username, password]
  )

  return (
    <section className="card login-form">
      <h2>Sign in</h2>
      <p>Homeserver: {HOMESERVER_URL}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Matrix ID
          <input
            type="text"
            autoComplete="username"
            placeholder="e.g. alice or @alice:matrix.inquiry.institute"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              if (error) clearError()
            }}
            disabled={loading}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (error) clearError()
            }}
            disabled={loading}
          />
        </label>
        {error && (
          <p className="login-form__error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="login-form__submit" disabled={loading || !username.trim() || !password}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </section>
  )
}
