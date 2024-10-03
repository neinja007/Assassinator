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

  // In a real app, you'd update the room status in a database
  // For this example, we'll just trigger Pusher events

  // Notify other users in the room
  await pusher.trigger(`room-${roomId}`, 'user-left', {
    user: 'Anonymous' // In a real app, this would be the actual user ID
  });

  // Update the room list
  await pusher.trigger('rooms', 'room-update', {
    rooms: [] // In a real app, you'd fetch the updated room list from a database
  });

  return NextResponse.json({ success: true });
}
