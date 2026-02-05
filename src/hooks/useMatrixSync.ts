import { useState, useEffect, useCallback } from 'react'
import type { MatrixClient } from 'matrix-js-sdk'
import { RoomEvent } from 'matrix-js-sdk'

export function useMatrixSync(client: MatrixClient | null) {
  const [synced, setSynced] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!client) return
    let mounted = true
    setError(null)
    client
      .startClient({ initialSyncLimit: 20 })
      .then(() => {
        if (mounted) setSynced(true)
      })
      .catch((e) => {
        if (mounted) setError(e?.message ?? 'Sync failed')
      })
    return () => {
      mounted = false
      client.stopClient()
    }
  }, [client])

  return { synced, error }
}

export function useRoomList(client: MatrixClient | null, synced: boolean) {
  const [rooms, setRooms] = useState<ReturnType<MatrixClient['getVisibleRooms']>>([])

  const updateRooms = useCallback(() => {
    if (!client) return
    setRooms(client.getVisibleRooms())
  }, [client])

  useEffect(() => {
    if (!client || !synced) return
    updateRooms()
    const onRoom = () => updateRooms()
    client.on(RoomEvent.MyMembership, onRoom)
    client.on(RoomEvent.Timeline, onRoom)
    return () => {
      client.removeListener(RoomEvent.MyMembership, onRoom)
      client.removeListener(RoomEvent.Timeline, onRoom)
    }
  }, [client, synced, updateRooms])

  return rooms
}
