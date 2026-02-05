# Audio modes (STT / TTS)

Atrium supports **speech-to-text (STT)** and **text-to-speech (TTS)** for hands-free and accessible use.

## STT (Speech-to-text)

- **Purpose** — Compose messages by voice (e.g. in a room or reply flow).
- **Web** — Web Speech API `SpeechRecognition` (and `webkitSpeechRecognition` where needed).
- **iOS / Android** — Same API inside the Capacitor WebView where the browser supports it; alternatively a native plugin can be added for system STT and better permissions.

## TTS (Text-to-speech)

- **Purpose** — Read out new or selected messages (e.g. in a room or notification).
- **Web** — Web Speech API `speechSynthesis` and `SpeechSynthesisUtterance`.
- **iOS / Android** — Same in WebView; a native plugin can be used for background TTS or system voice preferences.

## Audio mode toggle

The app has an “Audio mode” toggle. When on:

- STT can be used for the current input (e.g. mic button or auto-listen).
- TTS can be used for incoming or selected messages (e.g. read unread, or read on tap).

Implementation details (when to start/stop, which messages to read, rate/voice) are defined in the app logic and can be refined per platform.
