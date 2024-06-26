"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getPlaylistForYou } from "@/api/playlist-for-you";
import { MusicPlaylist } from "@/api/playlist-for-you";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ColorThief from 'colorthief'
import { PlaylistType } from "./spotify-home-page";

function MusicCard({
  music,
  setCurrentPlayingPlaylist,
  data,
}: {
  setCurrentPlayingPlaylist: Dispatch<SetStateAction<PlaylistType[]>>;
  music: MusicPlaylist;
  data: MusicPlaylist[]
}) {

  const imgRef = useRef<HTMLImageElement>(null);
  const [color, setColor] = useState<string | null>(null);

  const rgbToHex = (r: number, g: number, b: number) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')

  const handlePlay = (id: string) => {
    setCurrentPlayingPlaylist([])
    setCurrentPlayingPlaylist(data.map((item => ({
      id: item.id,
      src: item.track_url,
      poster: item.poster_url,
      title: item.title,
      album: item.collection_moto,
      liked :item.liked,
      musicType: "PLAYLISTFORYOU",
      currentplaying: id === item.id ? true : false
    }))));
  }


  useEffect(() => {
    const imgElement = imgRef.current;
    const colorThief = new ColorThief();

    const extractColor = () => {
      if (imgElement && imgElement.complete) {
        const dominantColor = colorThief.getColor(imgElement);
        setColor(rgbToHex(dominantColor[0], dominantColor[1], dominantColor[2]));
      } else {
        imgElement?.addEventListener('load', () => {
          if (imgElement) {
            const dominantColor = colorThief.getColor(imgElement);
            setColor(rgbToHex(dominantColor[0], dominantColor[1], dominantColor[2]));
          }
        });
      }
    };

    extractColor();
  }, [music.poster_url]);

  return (
    <div className="relative shrink-0 w-44 md:w-[440px]">
      <div className="relative">
        <Image
          ref={imgRef}
          src={music.poster_url} // Path to your image
          alt={music.title}
          width={176}
          height={176}
          className="object-cover object-top w-44 h-44 rounded-[50px] md:h-[440px] md:w-[440px]"
        />
        {color && <div
          className={`absolute bottom-0 right-0 left-0 h-[200px] bg-gradient-to-t rounded-[50px]`}
          style={{ backgroundImage: `linear-gradient(to top, ${color}, transparent)` }}
        >
        </div>}
      </div>
      <p className="p-2.5 md:absolute top-5 left-5">{music.num_of_tracks} Tracks</p>
      <div className="flex pl-2.5 pt-1 gap-2 md:absolute md:bottom-5 md:left-5 md:gap-5">
        <audio src={music.track_url} />
        <button
          className="h-[60px] w-[60px]"
          onClick={() => handlePlay(music.id)}
        >
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="md:h-[60px] md:w-[60px]"
          >
            <rect
              x="4.42859"
              y="4.02832"
              width="33.1429"
              height="33.1429"
              rx="16.5714"
              stroke="white"
              stroke-width="8"
            />
            <path
              fillRule="evenodd"
              clip-rule="evenodd"
              d="M21 37.0569C25.3647 37.0569 29.5506 35.323 32.637 32.2367C35.7233 29.1504 37.4571 24.9644 37.4571 20.5997C37.4571 16.235 35.7233 12.0491 32.637 8.96276C29.5506 5.87645 25.3647 4.14258 21 4.14258C16.6353 4.14258 12.4493 5.87645 9.36303 8.96276C6.27672 12.0491 4.54285 16.235 4.54285 20.5997C4.54285 24.9644 6.27672 29.1504 9.36303 32.2367C12.4493 35.323 16.6353 37.0569 21 37.0569ZM20.0846 14.7739C19.7748 14.5672 19.4146 14.4485 19.0427 14.4304C18.6707 14.4123 18.3007 14.4956 17.9724 14.6713C17.644 14.847 17.3695 15.1085 17.1781 15.428C16.9867 15.7475 16.8857 16.113 16.8857 16.4854V24.714C16.8857 25.0864 16.9867 25.4519 17.1781 25.7714C17.3695 26.0909 17.644 26.3525 17.9724 26.5282C18.3007 26.7039 18.6707 26.7871 19.0427 26.769C19.4146 26.751 19.7748 26.6323 20.0846 26.4256L26.256 22.3113C26.5377 22.1234 26.7687 21.8689 26.9285 21.5703C27.0883 21.2718 27.1719 20.9384 27.1719 20.5997C27.1719 20.2611 27.0883 19.9277 26.9285 19.6291C26.7687 19.3306 26.5377 19.076 26.256 18.8882L20.0846 14.7739Z"
              fill="white"
            />
          </svg>
        </button>
        <div className="flex flex-col justify-center">
          <p className="text-sm truncate w-28 md:w-64">{music.title}</p>
          <p className="text-xs truncate  w-28 md:w-64">{music.collection_moto}</p>
        </div>
      </div>
    </div>
  );
}

interface MusicPlaylistProps {
  setCurrentPlayingPlaylist: Dispatch<SetStateAction<PlaylistType[]>>;
}

export default function MusicList({ setCurrentPlayingPlaylist }: MusicPlaylistProps) {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getPlaylistForYou(),
    queryKey: ["playlist-for-you"], //Array according to Documentation
  });

  return (
    <>
      <div className="flex gap-4 overflow-x-auto">
        {data?.map((music) => {
          return (
            <MusicCard
              key={music.id}
              setCurrentPlayingPlaylist={setCurrentPlayingPlaylist} music={music}
              // setCurrentPlayingItem ={setCurrentPlayingItem}
              data={data}
            />
          );
        })}
      </div>
    </>
  );
}
