'use client'
import { Bars4Icon } from '@heroicons/react/24/outline'
import { XMarkIcon, Cog8ToothIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useState } from 'react'

export default function NavBar () {
  const [open, setOpen] = useState(false)

  const toggleNav = () => {
    setOpen(prev => !prev)
  }
  return (
    <>
      <Bars4Icon className='h-6 w-6 lg:hidden' onClick={toggleNav} />
      <div
        className={`bg-[#000] absolute top-0 bottom-0 right-0 left-0 p-5 md:hidden ${
          open ? 'block' : 'hidden'
        }`}
      >
        <div className='flex justify-end'>
          <XMarkIcon className='w-10 h-10' onClick={toggleNav} />
        </div>
        <div className='py-10 pl-5'>
          <Image
            src='/profile.png'
            alt='lofi 1'
            width={72}
            height={72}
            className='object-cover object-top w-13 h-18 rounded-full'
          />
          <div className='flex items-center py-4 pt-10 gap-3'>
            <Cog8ToothIcon className='h-7 w-7' />
            <p>Settings</p>
          </div>
          <div className='flex items-center py-4 gap-3'>
            <svg
              width='30'
              height='30'
              viewBox='0 0 30 30'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M4.5 9C4.5 7.80653 4.97411 6.66193 5.81802 5.81802C6.66193 4.97411 7.80653 4.5 9 4.5H24C24.2786 4.5 24.5516 4.57757 24.7886 4.72402C25.0256 4.87048 25.2171 5.08002 25.3416 5.32918C25.4662 5.57834 25.519 5.85727 25.4939 6.13471C25.4689 6.41215 25.3671 6.67715 25.2 6.9L21.375 12L25.2 17.1C25.3671 17.3229 25.4689 17.5878 25.4939 17.8653C25.519 18.1427 25.4662 18.4217 25.3416 18.6708C25.2171 18.92 25.0256 19.1295 24.7886 19.276C24.5516 19.4224 24.2786 19.5 24 19.5H9C8.60217 19.5 8.22064 19.658 7.93934 19.9393C7.65804 20.2206 7.5 20.6022 7.5 21V25.5C7.5 25.8978 7.34196 26.2794 7.06066 26.5607C6.77936 26.842 6.39782 27 6 27C5.60218 27 5.22064 26.842 4.93934 26.5607C4.65804 26.2794 4.5 25.8978 4.5 25.5V9Z'
                fill='white'
              />
            </svg>

            <p>Flag</p>
          </div>
          <div className='flex items-center py-4 gap-3'>
            <svg
              width='30'
              height='30'
              viewBox='0 0 30 30'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M14.9999 3C12.613 3 10.3238 3.94821 8.63596 5.63604C6.94814 7.32387 5.99992 9.61305 5.99992 12V17.379L4.93942 18.4395C4.72971 18.6493 4.5869 18.9165 4.52905 19.2075C4.4712 19.4984 4.5009 19.7999 4.61441 20.074C4.72791 20.348 4.92012 20.5823 5.16674 20.7471C5.41335 20.9119 5.7033 20.9999 5.99992 21H23.9999C24.2966 20.9999 24.5865 20.9119 24.8331 20.7471C25.0797 20.5823 25.2719 20.348 25.3854 20.074C25.4989 19.7999 25.5287 19.4984 25.4708 19.2075C25.4129 18.9165 25.2701 18.6493 25.0604 18.4395L23.9999 17.379V12C23.9999 9.61305 23.0517 7.32387 21.3639 5.63604C19.6761 3.94821 17.3869 3 14.9999 3ZM14.9999 27C13.8064 27 12.6619 26.5259 11.8179 25.682C10.974 24.8381 10.4999 23.6935 10.4999 22.5H19.4999C19.4999 23.6935 19.0258 24.8381 18.1819 25.682C17.338 26.5259 16.1934 27 14.9999 27Z'
                fill='white'
              />
            </svg>
            <p>Notifications</p>
          </div>
        </div>
      </div>
    </>
  )
}
