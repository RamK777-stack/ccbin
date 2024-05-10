import UnderlineLink from '@/components/links/UnderlineLink';

export default function Footer() {
  return (
    <footer className='text-gray-700'>
      <div className='flex justify-center items-center'>
        <span>© {new Date().getFullYear()} By</span>
        <UnderlineLink href='https://theodorusclarence.com?ref=tsnextstarter'>
          Theodorus Clarence
        </UnderlineLink>
      </div>
    </footer>
  );
}
