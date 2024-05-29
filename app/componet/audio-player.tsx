'use client'
import { likeMostListend } from '@/api/getMostListend';
import { likePlaylistForYou } from '@/api/playlist-for-you';
import { likeTrackOfTheWeek } from '@/api/track-of-the-week';
import { PauseCircleIcon, PlayCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';

export type MusicType = "TRACK_FOR_YOU" | "MOSTLISTEND" | "PLAYLISTFORYOU"

interface AudioPlayerProps {
  id: string
  src: string
  poster: string
  title: string
  album: string
  musicType: MusicType
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, id, poster, title, album, musicType }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [duration, setDuration] = useState(0);


  useEffect(() => {
    if (audioRef.current) {
      const handleLoadedMetadata = () => {
        setDuration(audioRef.current!.duration);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current!.currentTime);
      };
      setVolume(audioRef.current.volume)

      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        audioRef.current!.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current!.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [src]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const  handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value) / 100;
      setVolume(value)
  }

  const likeButton = () => {
    switch (musicType) {
      case 'MOSTLISTEND':
        return <button
          onClick={() => likeMostListend(id)}
        >like</button>
      case 'PLAYLISTFORYOU':
        return <button
          onClick={() => likePlaylistForYou(id)}
        >like</button>
      case 'TRACK_FOR_YOU':
        return <button
          onClick={() => likeTrackOfTheWeek(id)}
        >like</button>
      default:
        break;
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = src;
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
      setCurrentTime(0);
    }
  }, [src, id]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="bg-[#333333]  flex flex-col gap-2 fixed bottom-0 left-0 w-full text-whit px-4 pt-3 rounded-lg pb-2 md:pt-8 md:flex-row md:items-center">
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 shrink-0 items-center lg:pr-24'>
          <Image
            src={poster}
            alt={''}
            width={38}
            height={38}
            className='object-cover object-top w-10 h-10 rounded-md md:h-20 md:w-20'
          />
          <div className='md:hidden lg:block'>
            <p className='text-xs'>{title}</p>
            <p className='text-xs text-[#9CA3AF]'>{album}</p>
          </div>

        </div>
        <div className='flex'>
          <button onClick={togglePlayPause} className="p-2 bg-white">
            <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.25 20.2917V5.70837" stroke="#F3F4F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M23.75 21.3333L11.25 13L23.75 4.66663V21.3333Z" fill="#F3F4F6" stroke="#F3F4F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button onClick={togglePlayPause} className="p-2 bg-white">
            {isPlaying ? <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="52" height="52" rx="26" stroke="white" stroke-width="8" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M54 30C54 36.3652 51.4714 42.4697 46.9706 46.9706C42.4697 51.4714 36.3652 54 30 54C23.6348 54 17.5303 51.4714 13.0294 46.9706C8.52856 42.4697 6 36.3652 6 30C6 23.6348 8.52856 17.5303 13.0294 13.0294C17.5303 8.52856 23.6348 6 30 6C36.3652 6 42.4697 8.52856 46.9706 13.0294C51.4714 17.5303 54 23.6348 54 30ZM21 24C21 23.2044 21.3161 22.4413 21.8787 21.8787C22.4413 21.3161 23.2044 21 24 21C24.7956 21 25.5587 21.3161 26.1213 21.8787C26.6839 22.4413 27 23.2044 27 24V36C27 36.7956 26.6839 37.5587 26.1213 38.1213C25.5587 38.6839 24.7956 39 24 39C23.2044 39 22.4413 38.6839 21.8787 38.1213C21.3161 37.5587 21 36.7956 21 36V24ZM36 21C35.2044 21 34.4413 21.3161 33.8787 21.8787C33.3161 22.4413 33 23.2044 33 24V36C33 36.7956 33.3161 37.5587 33.8787 38.1213C34.4413 38.6839 35.2044 39 36 39C36.7956 39 37.5587 38.6839 38.1213 38.1213C38.6839 37.5587 39 36.7956 39 36V24C39 23.2044 38.6839 22.4413 38.1213 21.8787C37.5587 21.3161 36.7956 21 36 21Z" fill="white" />
            </svg>
              : <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="52" height="52" rx="26" stroke="white" stroke-width="8" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M30 54C36.3652 54 42.4697 51.4714 46.9706 46.9706C51.4714 42.4697 54 36.3652 54 30C54 23.6348 51.4714 17.5303 46.9706 13.0294C42.4697 8.52856 36.3652 6 30 6C23.6348 6 17.5303 8.52856 13.0294 13.0294C8.52856 17.5303 6 23.6348 6 30C6 36.3652 8.52856 42.4697 13.0294 46.9706C17.5303 51.4714 23.6348 54 30 54ZM28.665 21.504C28.2132 21.2026 27.688 21.0294 27.1455 21.0031C26.6031 20.9767 26.0636 21.0981 25.5847 21.3544C25.1058 21.6106 24.7055 21.992 24.4264 22.458C24.1473 22.9239 23.9999 23.4569 24 24V36C23.9999 36.5431 24.1473 37.0761 24.4264 37.542C24.7055 38.008 25.1058 38.3894 25.5847 38.6456C26.0636 38.9019 26.6031 39.0233 27.1455 38.9969C27.688 38.9706 28.2132 38.7974 28.665 38.496L37.665 32.496C38.0759 32.222 38.4128 31.8509 38.6458 31.4155C38.8788 30.98 39.0007 30.4938 39.0007 30C39.0007 29.5062 38.8788 29.02 38.6458 28.5845C38.4128 28.1491 38.0759 27.778 37.665 27.504L28.665 21.504Z" fill="white" />
              </svg>
            }
            {/* {likeButton()} */}
          </button>
          <button onClick={togglePlayPause} className="p-2 bg-white">
            <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.75 5.70829L23.75 20.2916" stroke="#F3F4F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M6.25 4.66671L18.75 13L6.25 21.3334L6.25 4.66671Z" fill="#F3F4F6" stroke="#F3F4F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

          </button>
        </div>
      </div>
      <span className="hidden text-sm md:block">{formatTime(currentTime)}</span>
      <div className='relative overflow-hidden h-[6px] rounded-full md:flex-1'>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleTimeChange}
          className="range-input absolute top-[-1px] left-[-2px] right-[-10px]"
        />
        <div className='absolute h-2 w-2 right-0 bg-[#333333]'>
        </div>
      </div>
      <span className="hidden text-sm md:block">{formatTime(duration)}</span>
      <audio ref={audioRef} src={src} className="hidden" autoPlay>
        Your browser does not support the audio element.
      </audio>
      <div className='hidden lg:flex gap-2 items-center'>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.383 3.07602C9.56569 3.15176 9.72181 3.27997 9.83163 3.44444C9.94146 3.60891 10 3.80225 10 4.00002V16C9.99996 16.1978 9.94129 16.3911 9.8314 16.5555C9.72152 16.7199 9.56535 16.848 9.38265 16.9237C9.19995 16.9994 8.99892 17.0192 8.80497 16.9806C8.61102 16.942 8.43285 16.8468 8.293 16.707L4.586 13H2C1.73478 13 1.48043 12.8947 1.29289 12.7071C1.10536 12.5196 1 12.2652 1 12V8.00002C1 7.7348 1.10536 7.48045 1.29289 7.29291C1.48043 7.10537 1.73478 7.00002 2 7.00002H4.586L8.293 3.29302C8.43285 3.15308 8.61105 3.05778 8.80508 3.01915C8.9991 2.98052 9.20023 3.00031 9.383 3.07602ZM14.657 2.92902C14.8445 2.74155 15.0988 2.63623 15.364 2.63623C15.6292 2.63623 15.8835 2.74155 16.071 2.92902C17.0008 3.85667 17.7382 4.95887 18.2409 6.17233C18.7435 7.38578 19.0015 8.68658 19 10C19.0015 11.3135 18.7435 12.6143 18.2409 13.8277C17.7382 15.0412 17.0008 16.1434 16.071 17.071C15.8824 17.2532 15.6298 17.354 15.3676 17.3517C15.1054 17.3494 14.8546 17.2442 14.6692 17.0588C14.4838 16.8734 14.3786 16.6226 14.3763 16.3604C14.374 16.0982 14.4748 15.8456 14.657 15.657C15.4011 14.9151 15.9912 14.0333 16.3933 13.0625C16.7955 12.0916 17.0016 11.0508 17 10C17 7.79002 16.106 5.79202 14.657 4.34302C14.4695 4.15549 14.3642 3.90118 14.3642 3.63602C14.3642 3.37085 14.4695 3.11654 14.657 2.92902ZM11.828 5.75702C11.9209 5.66404 12.0312 5.59028 12.1526 5.53996C12.274 5.48963 12.4041 5.46373 12.5355 5.46373C12.6669 5.46373 12.797 5.48963 12.9184 5.53996C13.0398 5.59028 13.1501 5.66404 13.243 5.75702C13.8009 6.31368 14.2433 6.97508 14.5448 7.70323C14.8463 8.43137 15.001 9.21191 15 10C15.001 10.7881 14.8463 11.5686 14.5447 12.2968C14.2432 13.0249 13.8008 13.6863 13.243 14.243C13.0554 14.4307 12.8009 14.5361 12.5355 14.5361C12.2701 14.5361 12.0156 14.4307 11.828 14.243C11.6404 14.0554 11.5349 13.8009 11.5349 13.5355C11.5349 13.2702 11.6404 13.0157 11.828 12.828C12.2002 12.4572 12.4953 12.0164 12.6965 11.5311C12.8976 11.0457 13.0008 10.5254 13 10C13.0008 9.47463 12.8977 8.95428 12.6965 8.46893C12.4954 7.98357 12.2002 7.54281 11.828 7.17202C11.735 7.07914 11.6613 6.96885 11.6109 6.84746C11.5606 6.72606 11.5347 6.59593 11.5347 6.46452C11.5347 6.3331 11.5606 6.20297 11.6109 6.08158C11.6613 5.96018 11.735 5.84989 11.828 5.75702Z" fill="#F3F4F6" />
        </svg>
        <div className='relative overflow-hidden h-[6px] w-44 rounded-full md:flex-1'>
          <input
            type="range"
            min="0"
            max={100}
            value={volume * 100}
            onChange={handleVolumeChange}
            className="range-input absolute top-[-1px] left-[-2px] right-[-10px]"
          />
          <div className='absolute h-2 w-2 right-0 bg-[#333333]'>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default AudioPlayer;
