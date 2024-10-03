import { NextResponse } from 'next/server';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true
});

export async function POST(request: Request) {
  const { roomId } = await request.json();

  // In a real app, you'd fetch the current counter value from a database
  // For this example, we'll just generate a random increment
  const increment = Math.floor(Math.random() * 10) + 1;

  await pusher.trigger(`room-${roomId}`, 'counter-update', {
    count: increment
  });

  return NextResponse.json({ success: true });
}
