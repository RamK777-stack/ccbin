import Logo from '~/svg/Logo.svg';

export default function Header() {
  return (
    <div className='flex py-12 justify-center text-center'>
      <Logo className='w-16' />
      <h1 className='mt-4'>Next.js + Tailwind CSS + TypeScript Starter</h1>
    </div>
  );
}
