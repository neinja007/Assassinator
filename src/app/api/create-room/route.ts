import { NextResponse } from 'next/server';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true
});

export async function POST() {
  const roomId = Math.random().toString(36).substr(2, 9);

  // In a real app, you'd store room info in a database
  // For this example, we'll just trigger a Pusher event
  await pusher.trigger('rooms', 'room-update', {
    rooms: [{ id: roomId, users: 1 }]
  });

  return NextResponse.json({ roomId });
}
