import { useAudioModeContext } from '../contexts/AudioModeContext'
import './ChatAudioToggle.css'

/**
 * Audio mode toggle for use in the chat view. User can deselect to turn off STT/TTS while chatting.
 */
export function ChatAudioToggle() {
  const { audioMode, setAudioMode, sttSupported, ttsSupported } = useAudioModeContext()

  return (
    <div className="chat-audio-toggle">
      <span className="chat-audio-toggle__status" aria-hidden>
        STT: {sttSupported ? '✓' : '—'} · TTS: {ttsSupported ? '✓' : '—'}
      </span>
      <label className="chat-audio-toggle__label">
        <input
          type="checkbox"
          checked={audioMode}
          onChange={(e) => setAudioMode(e.target.checked)}
          aria-label="Audio mode (speech-to-text and text-to-speech)"
        />
        <span>Audio on</span>
      </label>
    </div>
  )
}
