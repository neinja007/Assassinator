'use client';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {}, []);

  return (
    <main className='flex h-screen items-center justify-center'>
      <div className='text-center'>
        <h1>Count</h1>
        <p style={{ fontSize: '2rem' }}>{count}</p>
        <button onClick={() => setCount(count + 1)} className='rounded-md bg-blue-500 p-2 text-white'>
          Increment
        </button>
      </div>
    </main>
  );
}
