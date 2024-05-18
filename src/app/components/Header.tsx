'use client';

import { SunIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function Header() {
  return (
    <div className='flex justify-between text-center bg-gray-950 text-white py-5 px-20'>
      <div className='flex items-center space-x-4'>
        <Image
          src='./images/logo-2.jpg'
          className='rounded-lg h-10'
          alt='logo'
        />
        <h2 className='text-xl'>CCBIN</h2>
      </div>
      <div className='flex space-x-5 items-center'>
        <SunIcon className='size-8 text-white' />
        <button className='text-center bg-green-600 outline-none rounded-lg px-5 py-2 text-sm'>
          New Paste
        </button>
      </div>
    </div>
  );
}
