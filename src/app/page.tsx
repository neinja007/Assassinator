import { metadata } from '@/data/metadata';
import '@/app/globals.css';

export default function Home() {
  return <h1 className='text-center text-4xl font-bold'>{metadata.title}</h1>;
}
