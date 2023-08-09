import {cn as clsxm} from '@/lib/utils'

import Layout from '@/components/layout/Layout';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <section className='mdx prose mx-auto mt-4 flex h-full w-full flex-col items-center gap-4 overflow-auto rounded-lg py-16 transition-colors dark:prose-invert'>
        <article
          className={clsxm(
            'flex h-full w-full flex-col',
            'mdx prose',
            'prose-headings:underline',
            'prose:h1:mb-4',
            'prose:h2:mb-4',
            'prose:h3:mb-4',
            'prose-a:text-blue-600 hover:prose-a:text-blue-500'
          )}
        >
          {children}
        </article>
      </section>
    </Layout>
  );
}
