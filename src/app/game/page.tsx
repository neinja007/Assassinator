'use client';

import { pusherClient } from '@/utils/pusher/client';
import { useEffect, useState } from 'react';

export default function Game() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const channel = pusherClient.subscribe('chat').bind('evt::test', (data: any) => {
      console.log('test', data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      pusherClient.unsubscribe('chat');
    };
  }, []);

  const handleTestClick = async () => {
    let data = await fetch('/api/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: 'test' })
    });
    let json = await data.json();
    console.log(json);
  };

  return (
    <div className='flex flex-col'>
      <button className='m-2 w-[240px] rounded bg-slate-600 p-2 hover:bg-slate-500' onClick={() => handleTestClick()}>
        Test
      </button>

      <div>
        {messages.map((message: any) => (
          <div className='m-2 rounded border border-slate-600 p-2' key={message.date}>
            {message.message}
            <br />
            {message.date}
          </div>
        ))}
      </div>
    </div>
  );
}
