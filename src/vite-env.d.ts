/// <reference types="vite/client" />

declare global {
  interface Window {
    SpeechRecognition?: new () => unknown
    webkitSpeechRecognition?: new () => unknown
  }
}

export {}
