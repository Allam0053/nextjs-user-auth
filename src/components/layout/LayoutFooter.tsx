import UnderlineLink from '@/components/links/UnderlineLink';

export default function LayoutFooter() {
  return (
    <footer className='pt-12 pb-2 text-gray-700'>
      © {new Date().getFullYear()} By{' '}
      <UnderlineLink href='https://allam-taju.vercel.app'>
        Allam Taju Sarof
      </UnderlineLink>
    </footer>
  );
}
