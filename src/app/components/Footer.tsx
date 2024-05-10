import UnderlineLink from '@/components/links/UnderlineLink';

export default function Footer() {
  return (
    <footer className='text-gray-700'>
      <div className='flex justify-center items-center space-x-2'>
        <div>© {new Date().getFullYear()} By</div>
        <UnderlineLink href='https://twitter.com/ravancodes'>Ram</UnderlineLink>
      </div>
    </footer>
  );
}
