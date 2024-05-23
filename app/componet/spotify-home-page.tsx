'use client'
import { CheckBadgeIcon, Cog8ToothIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import MusicList from "./playlist-list";
import MostListendList from "./most-listened-list";
import TrackOfTheWeek from "./track-of-the-week";
import { useState } from "react";
import AudioPlayer, { MusicType } from "./audio-player";
import NavBar from '@/app/ui/nav-bar'

export default function SpotifyHomePage() {
  const [currentPlaying, setCurrentPlaying] = useState<{
    audioSrc: string,
    id: string,
    musicType: MusicType
  } | null>(null)

  console.log("AuDIO SORUCE", currentPlaying)
  return (
    <>
      <div className='flex gap-x-12 mt-4.5 items-center py-3 px-5 md:mt-10 pt-0 md:px-8.75'>
        <div className='lg:pl-10'>
          <svg width="60" height="60" viewBox="0 0 61 60" className="h-12 w-12 md:h-18.75 md:w-18.75" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.4998 0C13.9317 0 0.5 13.4317 0.5 30.0002C0.5 46.5694 13.9317 60 30.4998 60C47.0697 60 60.5 46.5694 60.5 30.0002C60.5 13.4328 47.0697 0.00143297 30.4995 0.00143297L30.4998 0ZM44.2575 43.2689C43.7202 44.1502 42.5667 44.4296 41.6854 43.8886C34.6418 39.5861 25.7747 38.6117 15.3321 40.9976C14.3258 41.2269 13.3227 40.5964 13.0935 39.5897C12.8631 38.583 13.4911 37.5799 14.4999 37.3507C25.9276 34.7387 35.7301 35.8639 43.6378 40.6967C44.5191 41.2376 44.7985 42.3876 44.2575 43.2689ZM47.9295 35.0991C47.2524 36.2007 45.8123 36.5482 44.7125 35.8711C36.6486 30.9133 24.3564 29.4779 14.8184 32.3732C13.5814 32.7468 12.2749 32.0497 11.8995 30.8148C11.5269 29.5778 12.2244 28.2738 13.4592 27.8976C24.3543 24.5917 37.8988 26.1931 47.1593 31.8838C48.259 32.5609 48.6065 34.0011 47.9295 35.0994V35.0991ZM48.2447 26.5929C38.5759 20.8499 22.6236 20.3218 13.3922 23.1237C11.9098 23.5733 10.3422 22.7364 9.89297 21.254C9.44374 19.7708 10.2799 18.2042 11.7633 17.7536C22.3603 14.5365 39.9766 15.1581 51.1085 21.7666C52.4447 22.558 52.8817 24.2801 52.09 25.6117C51.3019 26.9451 49.5752 27.3846 48.2462 26.5929H48.2447Z" fill="#1ED760" />
          </svg>
        </div>
        <div className='border-2 border-customGray rounded-full flex-1 flex justify-between items-center p-5 h-12 md:h-18.75'>
          <div className='flex content-center gap-5'>
            <div className='border-3 border-white h-5 w-5 rounded-xl'></div>
            <p>Search...</p>
          </div>
          <div className='hidden md:flex content-center gap-5'>
            <svg width="25" height="19" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 5.99985C23.4641 5.99985 23.9092 5.81547 24.2374 5.48728C24.5656 5.15909 24.75 4.71398 24.75 4.24985C24.75 3.78572 24.5656 3.3406 24.2374 3.01241C23.9092 2.68422 23.4641 2.49985 23 2.49985L20.781 2.49985C20.4738 1.96782 20.032 1.52603 19.4999 1.21887C18.9679 0.911707 18.3643 0.75 17.75 0.75C17.1357 0.75 16.5321 0.911707 16.0001 1.21887C15.468 1.52603 15.0262 1.96782 14.719 2.49985L2 2.49985C1.53587 2.49985 1.09075 2.68422 0.762562 3.01241C0.434374 3.3406 0.25 3.78572 0.25 4.24985C0.25 4.71397 0.434374 5.15909 0.762562 5.48728C1.09075 5.81547 1.53587 5.99985 2 5.99985L14.719 5.99985C15.0262 6.53187 15.468 6.97366 16.0001 7.28083C16.5321 7.58799 17.1357 7.74969 17.75 7.74969C18.3643 7.74969 18.9679 7.58799 19.4999 7.28083C20.032 6.97366 20.4738 6.53187 20.781 5.99985L23 5.99985ZM24.75 14.7498C24.75 15.214 24.5656 15.6591 24.2374 15.9873C23.9092 16.3155 23.4641 16.4998 23 16.4998L10.281 16.4998C9.9738 17.0319 9.53197 17.4737 8.99992 17.7808C8.46787 18.088 7.86435 18.2497 7.25 18.2497C6.63565 18.2497 6.03212 18.088 5.50008 17.7808C4.96803 17.4737 4.5262 17.0319 4.219 16.4998L2 16.4998C1.53587 16.4998 1.09075 16.3155 0.762561 15.9873C0.434373 15.6591 0.249999 15.214 0.249999 14.7498C0.249999 14.2857 0.434373 13.8406 0.762561 13.5124C1.09075 13.1842 1.53587 12.9998 2 12.9998L4.219 12.9998C4.5262 12.4678 4.96803 12.026 5.50008 11.7189C6.03213 11.4117 6.63565 11.25 7.25 11.25C7.86435 11.25 8.46787 11.4117 8.99992 11.7189C9.53197 12.026 9.9738 12.4678 10.281 12.9998L23 12.9998C23.4641 12.9998 23.9092 13.1842 24.2374 13.5124C24.5656 13.8406 24.75 14.2857 24.75 14.7498Z" fill="white" />
            </svg>
            <p>Filters</p>
          </div>
        </div>
        <div className='hidden lg:flex border-2 items-center border-customGray rounded-full h-18.75, gap-7.5 pt-0.5 pr-0.5 pb-px pl-7.5'>
          <CheckBadgeIcon className='h-7 w-7' />
          <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clip-rule="evenodd" d="M0.5 5C0.5 3.80653 0.974106 2.66193 1.81802 1.81802C2.66193 0.974106 3.80653 0.5 5 0.5H20C20.2786 0.5 20.5516 0.577572 20.7886 0.724024C21.0256 0.870476 21.2171 1.08002 21.3416 1.32918C21.4662 1.57834 21.519 1.85727 21.4939 2.13471C21.4689 2.41215 21.3671 2.67715 21.2 2.9L17.375 8L21.2 13.1C21.3671 13.3229 21.4689 13.5878 21.4939 13.8653C21.519 14.1427 21.4662 14.4217 21.3416 14.6708C21.2171 14.92 21.0256 15.1295 20.7886 15.276C20.5516 15.4224 20.2786 15.5 20 15.5H5C4.60217 15.5 4.22064 15.658 3.93934 15.9393C3.65804 16.2206 3.5 16.6022 3.5 17V21.5C3.5 21.8978 3.34196 22.2794 3.06066 22.5607C2.77936 22.842 2.39782 23 2 23C1.60218 23 1.22064 22.842 0.93934 22.5607C0.658035 22.2794 0.5 21.8978 0.5 21.5V5Z" fill="white" />
          </svg>
          <Cog8ToothIcon className='h-7 w-7' />
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.9999 3C12.613 3 10.3238 3.94821 8.63596 5.63604C6.94814 7.32387 5.99992 9.61305 5.99992 12V17.379L4.93942 18.4395C4.72971 18.6493 4.5869 18.9165 4.52905 19.2075C4.4712 19.4984 4.5009 19.7999 4.61441 20.074C4.72791 20.348 4.92012 20.5823 5.16674 20.7471C5.41335 20.9119 5.7033 20.9999 5.99992 21H23.9999C24.2966 20.9999 24.5865 20.9119 24.8331 20.7471C25.0797 20.5823 25.2719 20.348 25.3854 20.074C25.4989 19.7999 25.5287 19.4984 25.4708 19.2075C25.4129 18.9165 25.2701 18.6493 25.0604 18.4395L23.9999 17.379V12C23.9999 9.61305 23.0517 7.32387 21.3639 5.63604C19.6761 3.94821 17.3869 3 14.9999 3ZM14.9999 27C13.8064 27 12.6619 26.5259 11.8179 25.682C10.974 24.8381 10.4999 23.6935 10.4999 22.5H19.4999C19.4999 23.6935 19.0258 24.8381 18.1819 25.682C17.338 26.5259 16.1934 27 14.9999 27Z" fill="white" />
          </svg>
          <div className="border-2 border-customGray rounded-full">
            <Image
              src='/profile.png'
              alt='lofi 1'
              width={72}
              height={72}
              className='object-cover object-top w-13 h-18 rounded-full'
            />
          </div>
        </div>
        <NavBar />
      </div>
      <div className='ml-6.5'>
        <p className="py-6.5">PlayList For You</p>
        <MusicList
          setCurrentPlaying={setCurrentPlaying}
        />
        <div className="flex flex-col md:flex-row md:gap-20">
          <div>
            <p className="py-6.5">What you listen to the most</p>
            <MostListendList />
          </div>
          <div>
            <p className="py-6.5">Tracks of the week</p>
            <TrackOfTheWeek
              setCurrentPlaying={setCurrentPlaying}
            />
          </div>
        </div>
      </div>
      {currentPlaying && <AudioPlayer
        musicType={currentPlaying?.musicType as MusicType}
        id={currentPlaying?.id as string}
        src={currentPlaying?.audioSrc as string}
      />}
    </>
  )
}