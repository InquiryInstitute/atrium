import { useState, useCallback, useEffect } from 'react'

/**
 * Audio mode: STT (speech-to-text) and TTS (text-to-speech).
 * Web: Web Speech API. iOS/Android: native via Capacitor (future).
 */
export function useAudioMode() {
  const [audioMode, setAudioModeState] = useState(false)
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

  return { sttSupported, ttsSupported, audioMode, setAudioMode }
}
