import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import type { MatrixClient } from 'matrix-js-sdk'
import {
  createLoginClient,
  createAuthenticatedClient,
  persistSession,
  clearSession,
  getStoredSession,
} from '../lib/matrixAuth'

type AuthState = {
  client: MatrixClient | null
  userId: string | null
  loading: boolean
  error: string | null
}

type AuthContextValue = AuthState & {
  /** Exchange SSO login_token (from redirect) for a session */
  loginWithSsoToken: (loginToken: string) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<MatrixClient | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => setError(null), [])

  const loginWithSsoToken = useCallback(async (loginToken: string) => {
    setError(null)
    setLoading(true)
    try {
      const loginClient = createLoginClient()
      const res = await loginClient.loginWithToken(loginToken)
      persistSession(res.access_token, res.user_id, res.device_id)
      const authed = createAuthenticatedClient({
        accessToken: res.access_token,
        userId: res.user_id,
        deviceId: res.device_id,
      })
      setClient(authed)
      setUserId(res.user_id)
    } catch (e: unknown) {
      const message =
        e && typeof e === 'object' && 'data' in e && e.data && typeof e.data === 'object' && 'error' in e.data
          ? String((e.data as { error: unknown }).error)
          : e instanceof Error
            ? e.message
            : 'SSO login failed'
      setError(message)
      throw e
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    if (client) {
      try {
        await client.logout(true)
      } catch {
        // ignore
      }
      setClient(null)
      setUserId(null)
    }
    clearSession()
  }, [client])

  // Restore session from storage on load
  useEffect(() => {
    const stored = getStoredSession()
    if (!stored) {
      setLoading(false)
      return
    }
    const authed = createAuthenticatedClient(stored)
    setClient(authed)
    setUserId(stored.userId)
    setLoading(false)
  }, [])

  // Handle SSO callback: redirect returns with ?loginToken=... or #loginToken=...
  useEffect(() => {
    const params = new URLSearchParams(
      typeof window !== 'undefined' && window.location.hash
        ? window.location.hash.slice(1)
        : typeof window !== 'undefined'
          ? window.location.search
          : ''
    )
    const loginToken = params.get('loginToken')
    if (!loginToken) return
    // Remove token from URL without reload
    if (typeof window !== 'undefined') {
      const clean = window.location.pathname + (window.location.search || '').replace(/\bloginToken=[^&]*&?/g, '').replace(/\?$/, '')
      const hash = (window.location.hash || '').replace(/loginToken=[^&]*&?/g, '').replace(/^#&?|&$/g, '')
      window.history.replaceState(null, '', clean + (hash ? '#' + hash : ''))
    }
    loginWithSsoToken(loginToken)
  }, [loginWithSsoToken])

  const value: AuthContextValue = {
    client,
    userId,
    loading,
    error,
    loginWithSsoToken,
    logout,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
