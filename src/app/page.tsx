'use client';

import { OutputData } from '@editorjs/editorjs';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { toast } from 'sonner';
import '@/lib/env';

interface PasteResponse {
  insertedId: string;
  acknowledged: boolean;
}

const Editor = dynamic(() => import('@/app/components/Editor'), {
  ssr: false,
});

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

const fetchAndParse = async (payload: OutputData) => {
  const response = await fetch('/api/pastes', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to save data');
  }
  return await response.json();
};

const saveData = async (expirationTime: string, editorState: OutputData) => {
  const payload = {
    expiryDate: new Date(Date.now() + parseInt(expirationTime) * 1000),
    ...editorState,
  };
  toast.promise(fetchAndParse(payload), {
    loading: 'Loading...',
    success: (data: PasteResponse) => {
      navigator.clipboard.writeText(
        `${window.location.origin}/${data?.insertedId}`
      );
      return `${window.location.origin}/${data?.insertedId} - Copied to clipboard`;
    },
    error: 'Error',
    duration: 1500,
  });
};

export default function HomePage() {
  return (
    <section className='bg-white'>
      <Editor saveData={saveData} />
    </section>
  );
}
