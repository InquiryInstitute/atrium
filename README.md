# Atrium

A Matrix chat client for **web**, **iOS**, and **Android** (via **Capacitor**) with native **Spaces** support and built-in **audio modes** (STT/TTS). Optional **watchOS** companion later.

## Platforms

| Platform | Stack | Spaces | STT / TTS |
|----------|--------|--------|-----------|
| **Web** | React, Vite, matrix-js-sdk | ✅ | Web Speech API |
| **iOS** | Capacitor (same app) | ✅ | Web Speech / native bridge |
| **Android** | Capacitor (same app) | ✅ | Web Speech / native bridge |
| **watchOS** | Companion (future) | — | Siri / system |

One codebase: the web app is wrapped by Capacitor for iOS and Android. Spaces and audio modes are implemented in the shared React app.

## Features

- **Spaces** — First-class support for Matrix Spaces (MSC1772): hierarchy, space summary, navigation.
- **Audio modes** — Speech-to-text (STT) for input and text-to-speech (TTS) for reading messages.
- **Unified** — Same account and Spaces on web, iOS, and Android.

## Repo structure

```
atrium/
├── src/                 # React app (Vite + TypeScript, matrix-js-sdk)
├── ios/                 # Capacitor iOS project
├── android/             # Capacitor Android project
├── capacitor.config.ts
├── package.json
├── docs/
└── README.md
```

## Quick start

### Web

```bash
npm install
npm run dev
```

Open http://localhost:5173.

### iOS

```bash
npm run cap:sync
npm run cap:ios
```

Opens Xcode. Build and run the **App** scheme on a simulator or device.

### Android

```bash
npm run cap:sync
npm run cap:android
```

Opens Android Studio. Build and run on an emulator or device.

### Sync after changes

After changing the web app, copy it into the native projects:

```bash
npm run cap:sync
```

## GitHub Pages

The web app is deployed to **GitHub Pages** on every push to `main` via [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

- **Enable Pages:** Repo **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions**.
- **Live URL:** https://inquiryinstitute.github.io/atrium/ (after the first successful deploy).

## Docs

- [Architecture & platforms](docs/ARCHITECTURE.md)
- [Spaces (Matrix)](docs/SPACES.md)
- [Audio modes (STT/TTS)](docs/AUDIO_MODES.md)

## License

Apache-2.0
