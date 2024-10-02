'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export default function HomePage() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Connect to the socket server
    socket = io('http://localhost:4000');

    // Listen for 'count' event from the server
    socket.on('count', (newCount: number) => {
      setCount(newCount);
    });

    // Clean up the socket connection when component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Live User Count</h1>
        <p style={{ fontSize: '2rem' }}>{count}</p>
      </div>
    </main>
  );
}
