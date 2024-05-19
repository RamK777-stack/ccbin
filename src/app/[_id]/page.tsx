'use client';

import { OutputData } from '@editorjs/editorjs';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import '@/lib/env';

const Editor = dynamic(() => import('@/app/components/Editor'), {
  ssr: false,
});

const getData = async (params: { _id: string }): Promise<OutputData> => {
  const queryString = new URLSearchParams(params).toString();
  const url = `/api/pastes?${queryString}`;
  const response = await fetch(url, { method: 'GET' });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return (await response.json()) as OutputData;
};

export default function HomePage({ params }: { params: { _id: string } }) {
  const [content, setContent] = useState<OutputData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(params);
        setContent(data);
      } catch (error) {
        setContent(null);
      }
    };

    fetchData(); // Fetch data when component mounts or params change
  }, [params]);

  return (
    <section className='bg-white'>
      {!content ? (
        <div className='flex justify-center mt-10 text-xl'>
          <Image
            src='/svg/404.gif'
            className='h-48 rounded'
            height={20}
            width={200}
            alt='404 not found'
          />
        </div>
      ) : (
        <Editor content={content} onlyReadable={true} />
      )}
    </section>
  );
}
