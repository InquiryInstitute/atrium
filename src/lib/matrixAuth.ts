import { createClient, type MatrixClient } from 'matrix-js-sdk'
import { HOMESERVER_URL } from '../config'

const STORAGE_KEYS = {
  accessToken: 'atrium_access_token',
  userId: 'atrium_user_id',
  deviceId: 'atrium_device_id',
} as const

function getServerName(): string {
  try {
    return new URL(HOMESERVER_URL).hostname
  } catch {
    return 'matrix.inquiry.institute'
  }
}

/**
 * Normalize username to Matrix ID: if it doesn't look like @local:server, treat as localpart.
 */
export function toUserId(input: string): string {
  const trimmed = input.trim()
  if (trimmed.startsWith('@') && trimmed.includes(':')) return trimmed
  const local = trimmed.replace(/^@/, '')
  return `@${local}:${getServerName()}`
}

export function persistSession(accessToken: string, userId: string, deviceId: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.accessToken, accessToken)
    localStorage.setItem(STORAGE_KEYS.userId, userId)
    localStorage.setItem(STORAGE_KEYS.deviceId, deviceId)
  } catch (e) {
    console.warn('atrium: could not persist session', e)
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.accessToken)
    localStorage.removeItem(STORAGE_KEYS.userId)
    localStorage.removeItem(STORAGE_KEYS.deviceId)
  } catch {
    // ignore
  }
}

export function getStoredSession(): { accessToken: string; userId: string; deviceId: string } | null {
  try {
    const accessToken = localStorage.getItem(STORAGE_KEYS.accessToken)
    const userId = localStorage.getItem(STORAGE_KEYS.userId)
    const deviceId = localStorage.getItem(STORAGE_KEYS.deviceId)
    if (accessToken && userId && deviceId) return { accessToken, userId, deviceId }
  } catch {
    // ignore
  }
  return null
}

/**
 * Create an unauthenticated client (for login).
 */
export function createLoginClient(): MatrixClient {
  return createClient({ baseUrl: HOMESERVER_URL })
}

/**
 * Create an authenticated client from stored or fresh credentials.
 */
export function createAuthenticatedClient(opts: {
  accessToken: string
  userId: string
  deviceId: string
}): MatrixClient {
  return createClient({
    baseUrl: HOMESERVER_URL,
    accessToken: opts.accessToken,
    userId: opts.userId,
    deviceId: opts.deviceId,
  })
}
