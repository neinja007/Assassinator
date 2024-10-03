'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateRoom() {
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  const handleCreateRoom = async () => {
    setCreating(true);
    try {
      const response = await fetch('/api/create-room', { method: 'POST' });
      const data = await response.json();
      router.push(`/room/${data.roomId}`);
    } catch (error) {
      console.error('Failed to create room:', error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <button onClick={handleCreateRoom} disabled={creating} className='mb-4 rounded bg-green-500 px-4 py-2 text-white'>
      {creating ? 'Creating...' : 'Create Room'}
    </button>
  );
}
