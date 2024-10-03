'use client';

import { useState } from 'react';

export default function HomePage() {
  const [count, setCount] = useState<number>(0);

  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Count</h1>
        <p style={{ fontSize: '2rem' }}>{count}</p>
      </div>
    </main>
  );
}
