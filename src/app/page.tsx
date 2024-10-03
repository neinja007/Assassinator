import { metadata } from '@/data/metadata';
import '@/app/globals.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className='text-center text-4xl font-bold'>{metadata.title}</h1>

      <Link href='/game'>Game</Link>
    </div>
  );
}
