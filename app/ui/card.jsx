import Image from 'next/image'

export default async function Card () {
  return (
    <div className='shrink-0 md:relative'>
      <div className='bg-gradient-to-r from-cyan-500 to-blue-500'>
        <Image
          src='/playlist1.png' // Path to your image
          alt='Playlist 1'
          width={176}
          height={176}
          className='object-cover object-top w-44 h-44 rounded-3xl md:h-60 md:w-60'
        />
      </div>
      <p className='p-2.5 md:absolute top-0'>39 Tracks</p>
      <div className='flex pl-2.5 pt-1 gap-2 md:absolute top-44'>
        <svg
          width='42'
          height='42'
          viewBox='0 0 42 42'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect
            x='4.42859'
            y='4.02832'
            width='33.1429'
            height='33.1429'
            rx='16.5714'
            stroke='white'
            stroke-width='8'
          />
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M21 37.0569C25.3647 37.0569 29.5506 35.323 32.637 32.2367C35.7233 29.1504 37.4571 24.9644 37.4571 20.5997C37.4571 16.235 35.7233 12.0491 32.637 8.96276C29.5506 5.87645 25.3647 4.14258 21 4.14258C16.6353 4.14258 12.4493 5.87645 9.36303 8.96276C6.27672 12.0491 4.54285 16.235 4.54285 20.5997C4.54285 24.9644 6.27672 29.1504 9.36303 32.2367C12.4493 35.323 16.6353 37.0569 21 37.0569ZM20.0846 14.7739C19.7748 14.5672 19.4146 14.4485 19.0427 14.4304C18.6707 14.4123 18.3007 14.4956 17.9724 14.6713C17.644 14.847 17.3695 15.1085 17.1781 15.428C16.9867 15.7475 16.8857 16.113 16.8857 16.4854V24.714C16.8857 25.0864 16.9867 25.4519 17.1781 25.7714C17.3695 26.0909 17.644 26.3525 17.9724 26.5282C18.3007 26.7039 18.6707 26.7871 19.0427 26.769C19.4146 26.751 19.7748 26.6323 20.0846 26.4256L26.256 22.3113C26.5377 22.1234 26.7687 21.8689 26.9285 21.5703C27.0883 21.2718 27.1719 20.9384 27.1719 20.5997C27.1719 20.2611 27.0883 19.9277 26.9285 19.6291C26.7687 19.3306 26.5377 19.076 26.256 18.8882L20.0846 14.7739Z'
            fill='white'
          />
        </svg>
        <div className='flex flex-col justify-center'>
          <p className='text-sm'>Chill Mix</p>
          <p className='text-xs'>Just relax and listen</p>
        </div>
      </div>
    </div>
  )
}
