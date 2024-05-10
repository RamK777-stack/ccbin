import { SunIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <div className='flex justify-between text-center bg-gray-950 text-white py-6 px-20'>
      <h2>CCBIN</h2>
      <div className='flex space-x-5 items-center'>
        <SunIcon className='size-8 text-white' />
        <button className='bg-green-600 outline-none rounded-full px-5 py-2'>
          New Snippet
        </button>
      </div>
    </div>
  );
}
