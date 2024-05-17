import { SunIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <div className='flex justify-between text-center bg-gray-950 text-white py-5 px-20'>
      <h3>CCBIN</h3>
      <div className='flex space-x-5 items-center'>
        <SunIcon className='size-8 text-white' />
        <button className='text-center bg-green-600 outline-none rounded-full px-5 py-2 text-sm'>
          New Paste
        </button>
      </div>
    </div>
  );
}
