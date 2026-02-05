import { AudioModeProvider } from './contexts/AudioModeContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ChatView } from './components/ChatView'
import { LoginForm } from './components/LoginForm'
import './App.css'

function AppContent() {
  const { userId, loading } = useAuth()

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
        <ChatView />
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
