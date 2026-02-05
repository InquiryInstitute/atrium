import { AudioModeProvider } from './contexts/AudioModeContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ChatAudioToggle } from './components/ChatAudioToggle'
import { LoginForm } from './components/LoginForm'
import './App.css'

function AppContent() {
  const { userId, loading, logout } = useAuth()

  if (loading) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Atrium</h1>
          <p className="tagline">Matrix chat · Spaces · Web, iOS, Android</p>
        </header>
        <main className="app-main">
          <p className="app-loading">Loading…</p>
        </main>
      </div>
    )
  }

  if (!userId) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Atrium</h1>
          <p className="tagline">Matrix chat · Spaces · Web, iOS, Android</p>
        </header>
        <main className="app-main">
          <LoginForm />
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Atrium</h1>
        <p className="tagline">Matrix chat · Spaces · Web, iOS, Android</p>
      </header>
      <main className="app-main">
        <section className="card card--session">
          <p className="session-line">
            <span>Logged in as <strong>{userId}</strong></span>
            <button type="button" className="session-logout" onClick={() => logout()}>
              Sign out
            </button>
          </p>
        </section>
        <section className="card card--chat">
          <h2>Chat</h2>
          <p>Room list and messages will appear here. Audio mode is on by default; you can turn it off below.</p>
          <ChatAudioToggle />
        </section>
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AudioModeProvider>
        <AppContent />
      </AudioModeProvider>
    </AuthProvider>
  )
}

export default App
