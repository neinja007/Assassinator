import CreateRoom from '@/components/CreateRoom';
import RoomList from '@/components/RoomList';

export default function Home() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-4 text-2xl font-bold'>Room Control Dashboard</h1>
      <CreateRoom />
      <RoomList />
    </div>
  );
}
