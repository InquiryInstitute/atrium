import { useState } from 'react'
import { useAudioMode } from './hooks/useAudioMode'
import './App.css'

function App() {
  const [homeserver, setHomeserver] = useState('https://matrix.org')
  const { sttSupported, ttsSupported, audioMode, setAudioMode } = useAudioMode()

  return (
    <div className="app">
      <header className="app-header">
        <h1>Atrium</h1>
        <p className="tagline">Matrix chat · Spaces · Web, iOS, Android</p>
      </header>

      <main className="app-main">
        <section className="card">
          <h2>Sign in</h2>
          <p>Homeserver and login UI coming next.</p>
          <label>
            Homeserver
            <input
              type="url"
              value={homeserver}
              onChange={(e) => setHomeserver(e.target.value)}
              placeholder="https://matrix.org"
            />
          </label>
        </section>

        <section className="card">
          <h2>Audio mode</h2>
          <p>STT (speech-to-text) and TTS (text-to-speech) for hands-free use.</p>
          <div className="audio-status">
            <span>STT: {sttSupported ? '✓' : '—'}</span>
            <span>TTS: {ttsSupported ? '✓' : '—'}</span>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={audioMode}
              onChange={(e) => setAudioMode(e.target.checked)}
            />
            <span>Audio mode on</span>
          </label>
        </section>
      </main>
    </div>
  )
}

export default App
