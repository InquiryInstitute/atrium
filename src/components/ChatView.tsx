import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useMatrixSync, useRoomList } from '../hooks/useMatrixSync'
import { ChatAudioToggle } from './ChatAudioToggle'
import type { Room } from 'matrix-js-sdk'
import { RoomEvent } from 'matrix-js-sdk'
import './ChatView.css'

function MessageList({ room }: { room: Room }) {
  const [events, setEvents] = useState(() => {
    const timeline = room.getLiveTimeline()
    return timeline.getEvents().filter((e) => e.getType() === 'm.room.message')
  })

  useEffect(() => {
    const onTimeline = () => {
      const timeline = room.getLiveTimeline()
      setEvents(timeline.getEvents().filter((e) => e.getType() === 'm.room.message'))
    }
    room.on(RoomEvent.Timeline, onTimeline)
    onTimeline()
    return () => {
      room.removeListener(RoomEvent.Timeline, onTimeline)
    }
  }, [room])

  return (
    <ul className="message-list" aria-label="Messages">
      {events.map((ev) => {
        const body = ev.getContent().body
        if (typeof body !== 'string') return null
        const sender = ev.getSender() ?? ''
        const name = sender.replace(/^@/, '').split(':')[0]
        return (
          <li key={ev.getId()} className="message-list__item">
            <span className="message-list__sender">{name}:</span>{' '}
            <span className="message-list__body">{body}</span>
          </li>
        )
      })}
    </ul>
  )
}

export function ChatView() {
  const { client, userId, logout } = useAuth()
  const { synced, error } = useMatrixSync(client)
  const rooms = useRoomList(client, synced)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  if (!client || !userId) return null

  if (error) {
    return (
      <section className="card">
        <p className="chat-view__error">Sync error: {error}</p>
      </section>
    )
  }

  return (
    <>
      <section className="card card--session">
        <p className="session-line">
          <span>Logged in as <strong>{userId}</strong></span>
          <button type="button" className="session-logout" onClick={() => logout()}>
            Sign out
          </button>
        </p>
      </section>

      <section className="card card--chat-layout">
        <div className="chat-layout">
          <aside className="chat-sidebar">
            <h2 className="chat-sidebar__title">Rooms</h2>
            {!synced && <p className="chat-sidebar__loading">Syncing…</p>}
            <ul className="room-list" aria-label="Room list">
              {rooms.map((room) => (
                <li key={room.roomId}>
                  <button
                    type="button"
                    className={`room-list__item ${selectedRoom?.roomId === room.roomId ? 'room-list__item--active' : ''}`}
                    onClick={() => setSelectedRoom(room)}
                  >
                    {room.name || room.roomId}
                  </button>
                </li>
              ))}
            </ul>
            <div className="chat-audio-inline">
              <ChatAudioToggle />
            </div>
          </aside>
          <div className="chat-main">
            {selectedRoom ? (
              <>
                <h2 className="chat-main__title">{selectedRoom.name || selectedRoom.roomId}</h2>
                <MessageList room={selectedRoom} />
              </>
            ) : (
              <p className="chat-main__empty">Select a room</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
