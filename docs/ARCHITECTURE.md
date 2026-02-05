# Architecture

## Overview

Atrium is a single web application (React + Vite + TypeScript + matrix-js-sdk) that runs on:

- **Web** — Served by Vite dev server or any static host.
- **iOS** — Wrapped by Capacitor; the built `dist/` is loaded in a native WebView.
- **Android** — Same: Capacitor wraps the built app in a WebView.

Spaces and audio (STT/TTS) are implemented in the shared React app. On mobile, the Web Speech API is used where available; native plugins can be added later for better control (e.g. background TTS, system STT).

## Capacitor

- **core** — Runtime that bridges JS and native (iOS/Android).
- **ios** / **android** — Native projects that load the built web app from `webDir` (`dist/`).
- **Sync** — `npx cap sync` builds the app, copies `dist/` into the native projects, and updates native dependencies.

After `npm run build`, run `npx cap sync` (or `npm run cap:sync`) before running the app in Xcode or Android Studio.

## Matrix

- **matrix-js-sdk** — Client SDK; used for login, sync, rooms, and Spaces.
- **Spaces** — MSC1772; spaces are rooms with a specific type; hierarchy and space summary (MSC2946) are supported by the SDK.

## Audio modes

- **STT** — Speech-to-text for composing messages (Web Speech API `SpeechRecognition`).
- **TTS** — Text-to-speech for reading messages (Web Speech API `speechSynthesis`).

On iOS/Android, the in-app WebView can use the same APIs; for watchOS or background use, a native companion or plugins would be needed.

## watchOS (future)

A small native watchOS app can act as a companion: notifications, quick replies, or a simplified room list via WatchConnectivity with the iOS app. That would live in a separate target or repo and is not part of the current Capacitor app.
