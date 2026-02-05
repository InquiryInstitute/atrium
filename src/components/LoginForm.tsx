import { useAuth } from '../contexts/AuthContext'
import { HOMESERVER_URL, SSO_IDP_ID } from '../config'
import './LoginForm.css'

/**
 * Redirect URL for SSO: where Synapse sends the user back with loginToken.
 * Must match the origin + path where Atrium is served (e.g. GitHub Pages /atrium/).
 */
function getSsoRedirectUrl(): string {
  if (typeof window === 'undefined') return ''
  return window.location.origin + window.location.pathname
}

export function LoginForm() {
  const { error, loading, clearError } = useAuth()

  const handleSsoSignIn = () => {
    clearError()
    const redirectUrl = getSsoRedirectUrl()
    const ssoUrl = `${HOMESERVER_URL}/_matrix/client/v3/login/sso/redirect/${SSO_IDP_ID}?redirectUrl=${encodeURIComponent(redirectUrl)}`
    window.location.href = ssoUrl
  }

  return (
    <section className="card login-form">
      <h2>Sign in</h2>
      <p>Use your Inquiry Institute account. You’ll be redirected to sign in, then back here.</p>
      {error && (
        <p className="login-form__error" role="alert">
          {error}
        </p>
      )}
      <button
        type="button"
        className="login-form__submit login-form__sso"
        onClick={handleSsoSignIn}
        disabled={loading}
      >
        {loading ? 'Signing in…' : 'Sign in with Inquiry Institute'}
      </button>
    </section>
  )
}
