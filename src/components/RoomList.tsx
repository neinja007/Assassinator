'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Pusher from 'pusher-js';

export default function RoomList() {
  const [rooms, setRooms] = useState<{ id: string; users: number }[]>([]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
    });

    const channel = pusher.subscribe('rooms');

    channel.bind('room-update', (data: { rooms: { id: string; users: number }[] }) => {
      setRooms(data.rooms);
    });

    // Initial fetch of rooms
    fetch('/api/rooms')
      .then((res) => res.json())
      .then((data) => setRooms(data.rooms));

    return () => {
      pusher.unsubscribe('rooms');
    };
  }, []);

  return (
    <div>
      <h2 className='mb-2 text-xl font-semibold'>Available Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id} className='mb-2'>
            <Link href={`/room/${room.id}`} className='text-blue-500 hover:underline'>
              Room {room.id} ({room.users}/2 users)
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
