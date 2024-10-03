'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Pusher from 'pusher-js';

export default function Room() {
  const [counter, setCounter] = useState(0);
  const [users, setUsers] = useState<string[]>([]);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
    });

    const channel = pusher.subscribe(`room-${id}`);

    channel.bind('counter-update', (data: { count: number }) => {
      setCounter(data.count);
    });

    channel.bind('user-joined', (data: { user: string }) => {
      setUsers((prevUsers) => [...prevUsers, data.user]);
    });

    channel.bind('user-left', (data: { user: string }) => {
      setUsers((prevUsers) => prevUsers.filter((user) => user !== data.user));
    });

    return () => {
      pusher.unsubscribe(`room-${id}`);
    };
  }, [id]);

  const incrementCounter = async () => {
    await fetch('/api/increment-counter', {
      method: 'POST',
      body: JSON.stringify({ roomId: id })
    });
  };

  const leaveRoom = async () => {
    await fetch('/api/leave-room', {
      method: 'POST',
      body: JSON.stringify({ roomId: id })
    });
    router.push('/');
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-4 text-2xl font-bold'>Room {id}</h1>
      <p>Users in room: {users.join(', ')}</p>
      <p>Counter: {counter}</p>
      <button onClick={incrementCounter} className='mt-4 rounded bg-blue-500 px-4 py-2 text-white'>
        Increment Counter
      </button>
      <button onClick={leaveRoom} className='ml-4 mt-4 rounded bg-red-500 px-4 py-2 text-white'>
        Leave Room
      </button>
    </div>
  );
}
