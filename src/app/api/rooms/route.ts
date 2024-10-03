import { NextResponse } from 'next/server';

export async function GET() {
  // In a real app, you'd fetch this data from a database
  const rooms = [
    { id: 'room1', users: 1 },
    { id: 'room2', users: 2 }
  ];

  return NextResponse.json({ rooms });
}
