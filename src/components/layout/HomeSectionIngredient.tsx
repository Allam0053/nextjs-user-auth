export default function HomeSectionIngredient({
  children,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className='mx-auto max-w-2xl py-4 sm:py-6 lg:max-w-7xl'>
      <div className='mt-6 grid gap-2 sm:grid-cols-3 lg:gap-4 xl:grid-cols-5'>
        {children}
      </div>
    </div>
  );
}
