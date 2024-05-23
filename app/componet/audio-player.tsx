'use client'
import { likeMostListend } from '@/api/getMostListend';
import { likePlaylistForYou } from '@/api/playlist-for-you';
import { likeTrackOfTheWeek } from '@/api/track-of-the-week';
import { PauseCircleIcon, PlayCircleIcon } from '@heroicons/react/24/solid';
import React, { useRef, useState, useEffect } from 'react';

export type MusicType = "TRACK_FOR_YOU" | "MOSTLISTEND" | "PLAYLISTFORYOU"

interface AudioPlayerProps {
  id: string
  src: string;
  musicType: MusicType
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, id, musicType }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);


  useEffect(() => {
    if (audioRef.current) {
      const handleLoadedMetadata = () => {
        setDuration(audioRef.current!.duration);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current!.currentTime);
      };

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

  return (
    <div className="!bg-white  fixed bottom-0 left-0 w-full bg-gray-900 text-white flex items-center px-4 py-2 shadow-lg">
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
        {likeButton()}
      </button>
      <div className="flex-1 mx-4">
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleTimeChange}
          className="w-full"
        />
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm">{formatTime(currentTime)}</span>
        <span className="text-sm">/</span>
        <span className="text-sm">{formatTime(duration)}</span>
      </div>
      <audio ref={audioRef} src={src} className="hidden" autoPlay>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default AudioPlayer;
