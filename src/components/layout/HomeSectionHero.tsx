// const links = [
//   { name: 'Open roles', href: '#search-ingredients' },
// ];
// const stats = [
//   { name: 'Offices worldwide', value: '12' },
//   { name: 'Full-time colleagues', value: '300+' },
//   { name: 'Hours per week', value: '40' },
//   { name: 'Paid time off', value: 'Unlimited' },
// ];

import {cn as clsxm} from '@/lib/utils'
import useIsMounted from '@/hooks/useIsMounted';

import ArrowLink from '@/components/links/ArrowLink';

type HeroSectionProps = {
  links: { name: string; href: string }[];
  stats: { name: string; value: string | number }[];
};

export default function HomeSectionHero({ links, stats }: HeroSectionProps) {
  const isMounted = useIsMounted(100);
  return (
    <div
      className={clsxm(
        'min:h-screen relative isolate flex h-full flex-col items-start justify-start overflow-hidden bg-gray-900 py-16 sm:h-screen sm:justify-center',
        isMounted && 'fade-in-start'
      )}
    >
      <div
        className='min:h-screen absolute top-0 -z-10 h-full w-full bg-cover bg-center sm:h-screen'
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&dl=dan-gold-4_jhDO54BYg-unsplash.jpg&w=2400&q=80&fm=jpg&crop=entropy&cs=tinysrgb')",
        }}
      >
        <span
          id='blackOverlay'
          className='absolute h-full w-full bg-black opacity-80'
        ></span>
      </div>
      <svg
        viewBox='0 0 1097 845'
        aria-hidden='true'
        className='hidden transform-gpu blur-3xl sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:w-[68.5625rem]'
      >
        <path
          fill='url(#10724532-9d81-43d2-bb94-866e98dd6e42)'
          fillOpacity='.2'
          d='M301.174 646.641 193.541 844.786 0 546.172l301.174 100.469 193.845-356.855c1.241 164.891 42.802 431.935 199.124 180.978 195.402-313.696 143.295-588.18 284.729-419.266 113.148 135.13 124.068 367.989 115.378 467.527L811.753 372.553l20.102 451.119-530.681-177.031Z'
        />
        <defs>
          <linearGradient
            id='10724532-9d81-43d2-bb94-866e98dd6e42'
            x1='1097.04'
            x2='-141.165'
            y1='.22'
            y2='363.075'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#776FFF' />
            <stop offset={1} stopColor='#FF4694' />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox='0 0 1097 845'
        aria-hidden='true'
        className='absolute left-1/2 -top-52 -z-10 w-[68.5625rem] -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0'
      >
        <path
          fill='url(#8ddc7edb-8983-4cd7-bccb-79ad21097d70)'
          fillOpacity='.2'
          d='M301.174 646.641 193.541 844.786 0 546.172l301.174 100.469 193.845-356.855c1.241 164.891 42.802 431.935 199.124 180.978 195.402-313.696 143.295-588.18 284.729-419.266 113.148 135.13 124.068 367.989 115.378 467.527L811.753 372.553l20.102 451.119-530.681-177.031Z'
        />
        <defs>
          <linearGradient
            id='8ddc7edb-8983-4cd7-bccb-79ad21097d70'
            x1='1097.04'
            x2='-141.165'
            y1='.22'
            y2='363.075'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#776FFF' />
            <stop offset={1} stopColor='#FF4694' />
          </linearGradient>
        </defs>
      </svg>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2
            className='text-4xl font-bold tracking-tight text-white sm:text-6xl'
            data-fade='1'
          >
            Explore The Taste
          </h2>
          <p className='mt-6 text-lg leading-8 text-gray-300' data-fade='2'>
            Welcome to our recipe database website! Our platform is designed to
            provide you with a wide range of recipes to suit your taste and
            preferences. We have an extensive database of recipes that include
            everything from traditional favorites to modern twists on classic
            dishes.
          </p>
        </div>
        <div className='mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none'>
          <div
            className='grid grid-cols-1 gap-y-6 gap-x-8 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10'
            data-fade='3'
          >
            {links.map((link) => (
              <ArrowLink key={link.name} href={link.href}>
                {link.name}
              </ArrowLink>
            ))}
          </div>
          <dl className='mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4'>
            {stats.map((stat) => (
              <div
                key={stat.name}
                className='flex flex-col-reverse'
                data-fade='4'
              >
                <dt className='text-base leading-7 text-gray-300'>
                  {stat.name}
                </dt>
                <dd className='text-2xl font-bold leading-9 tracking-tight text-white'>
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
