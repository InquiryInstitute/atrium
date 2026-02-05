import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

type AudioModeContextValue = {
  audioMode: boolean
  setAudioMode: (on: boolean) => void
  sttSupported: boolean
  ttsSupported: boolean
}

const AudioModeContext = createContext<AudioModeContextValue | null>(null)

export function AudioModeProvider({ children }: { children: ReactNode }) {
  const [audioMode, setAudioModeState] = useState(true)
  const [sttSupported, setSttSupported] = useState(false)
  const [ttsSupported, setTtsSupported] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    setSttSupported(!!SpeechRecognition)
    setTtsSupported('speechSynthesis' in window)
  }, [])

  const setAudioMode = useCallback((on: boolean) => {
    setAudioModeState(on)
    // TODO: start/stop STT listener and TTS when messages arrive
  }, [])

  return (
    <AudioModeContext.Provider value={{ audioMode, setAudioMode, sttSupported, ttsSupported }}>
      {children}
    </AudioModeContext.Provider>
  )
}

export function useAudioModeContext(): AudioModeContextValue {
  const ctx = useContext(AudioModeContext)
  if (!ctx) throw new Error('useAudioModeContext must be used within AudioModeProvider')
  return ctx
}
