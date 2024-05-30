'use client'
import { getTrackOfTheWeek } from "@/api/track-of-the-week";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { PlaylistType } from "./spotify-home-page";

interface TrackOfTheWeekProps {
  setCurrentPlayingPlaylist: Dispatch<SetStateAction<PlaylistType[]>>;

}

export default function TrackOfTheWeek(
  {
    setCurrentPlayingPlaylist
  }: TrackOfTheWeekProps
) {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getTrackOfTheWeek(),
    queryKey: ["track-of-the-week"], //Array according to Documentation
  })

  const handlePlay = (id: string) => {
    setCurrentPlayingPlaylist([])
    if (data && !isLoading) {
      setCurrentPlayingPlaylist(data.map((item => ({
        id: item.id,
        src: item.track_url,
        poster: item.poster_url,
        title: item.title,
        album: item.album,
        liked: item.liked,
        musicType: "TRACK_FOR_YOU",
        currentplaying: id === item.id ? true : false
      }))))
    }
  }
  const formatCmpctNumber = (value: string) => {
    const number = Number(value.replace(/,/g, ""))
    const usformatter = Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    })
    return usformatter.format(number);
  }

  return (
    <>
      <div className="flex flex-col border-2 border-customGray p-3.5 gap-12 rounded-3xl">
        {data?.map(item => {
          return (
            <div
              key={item.id}
              className="flex justify-between items-center">
              <div className="flex gap-5">
                <Image
                  src={item.poster_url}
                  alt={item.title}
                  width={60}
                  height={60}
                  className='object-cover object-top w-15 h-15 rounded-xl'
                />
                <div className="flex flex-col justify-center pb-1.5	">
                  <p className="text-sm">{item.title}.</p>
                  <p className="text-sm text-[#9CA3AF]">{item.album}</p>
                </div>
              </div>
              <div className="flex gap-1.75 gap-2">
                <div className="flex items-center gap-2 font-bold">
                  <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_317_770)">
                      <path d="M5.36995 8.80959H4.96495C4.07015 8.80959 3.34495 9.53606 3.34495 10.4326V12.0466C3.34495 12.9429 4.07015 13.6696 4.96495 13.6696H5.36995C5.81722 13.6696 6.17995 13.3061 6.17995 12.8581V9.62111C6.17995 9.17282 5.81722 8.80959 5.36995 8.80959ZM10.6349 8.80959H10.2299C9.78267 8.80959 9.41995 9.17282 9.41995 9.62111V12.8581C9.41995 13.3061 9.78267 13.6696 10.2299 13.6696H10.6349C11.5297 13.6696 12.2549 12.9429 12.2549 12.0466V10.4326C12.2549 9.53631 11.5297 8.80959 10.6349 8.80959ZM7.79995 2.32959C4.17798 2.32959 1.43562 5.34507 1.31995 8.80959V11.6446C1.31995 11.8684 1.50118 12.0496 1.72495 12.0496H2.12995C2.35371 12.0496 2.53495 11.8684 2.53495 11.6446V8.80959C2.53495 5.90701 4.89736 3.54965 7.79995 3.54915C10.7025 3.54965 13.0649 5.90701 13.0649 8.80959V11.6446C13.0649 11.8684 13.2462 12.0496 13.4699 12.0496H13.8749C14.0987 12.0496 14.2799 11.8684 14.2799 11.6446V8.80959C14.1643 5.34507 11.4219 2.32959 7.79995 2.32959Z" fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_317_770">
                        <rect width="14.4" height="14.4" fill="white" transform="translate(0.599976 0.799805)" />
                      </clipPath>
                    </defs>
                  </svg>
                  <p>{formatCmpctNumber(item.listened)}</p>
                </div>
                <div className="flex items-center border-2 rounded-full gap-4 border-customGray p-2">
                  {item.liked ? <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clip-rule="evenodd" d="M4.46503 6.96492C5.40267 6.02756 6.67421 5.50098 8.00003 5.50098C9.32585 5.50098 10.5974 6.02756 11.535 6.96492L13 8.42867L14.465 6.96492C14.9263 6.48737 15.478 6.10646 16.088 5.84441C16.698 5.58237 17.3541 5.44443 18.018 5.43867C18.6819 5.4329 19.3403 5.5594 19.9548 5.81081C20.5693 6.06221 21.1275 6.43348 21.597 6.90294C22.0665 7.37241 22.4377 7.93067 22.6891 8.54515C22.9405 9.15963 23.0671 9.81803 23.0613 10.4819C23.0555 11.1458 22.9176 11.8019 22.6555 12.4119C22.3935 13.022 22.0126 13.5737 21.535 14.0349L13 22.5712L4.46503 14.0349C3.52768 13.0973 3.0011 11.8257 3.0011 10.4999C3.0011 9.1741 3.52768 7.90256 4.46503 6.96492Z" fill="#2BD268" />
                  </svg> : <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clip-rule="evenodd" d="M4.46503 6.96492C5.40267 6.02756 6.67421 5.50098 8.00003 5.50098C9.32585 5.50098 10.5974 6.02756 11.535 6.96492L13 8.42867L14.465 6.96492C14.9263 6.48737 15.478 6.10646 16.088 5.84441C16.698 5.58237 17.3541 5.44443 18.018 5.43867C18.6819 5.4329 19.3403 5.5594 19.9548 5.81081C20.5693 6.06221 21.1275 6.43348 21.597 6.90294C22.0665 7.37241 22.4377 7.93067 22.6891 8.54515C22.9405 9.15963 23.0671 9.81803 23.0613 10.4819C23.0555 11.1458 22.9176 11.8019 22.6555 12.4119C22.3935 13.022 22.0126 13.5737 21.535 14.0349L13 22.5712L4.46503 14.0349C3.52768 13.0973 3.0011 11.8257 3.0011 10.4999C3.0011 9.1741 3.52768 7.90256 4.46503 6.96492Z" fill="#ffffff" />
                  </svg>}
                  <button
                    onClick={() => handlePlay(item.id)}
                  >
                    <svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.6098 13.0721L25.0038 17.3361C25.2777 17.5188 25.5023 17.7682 25.6576 18.0585C25.8129 18.3488 25.8942 18.6729 25.8942 19.0021C25.8942 19.3314 25.8129 19.6555 25.6576 19.9458C25.5023 20.2361 25.2777 20.4835 25.0038 20.6661L18.6098 24.9301C18.3086 25.1311 17.9585 25.2465 17.5968 25.2641C17.2351 25.2817 16.8755 25.2007 16.5562 25.0299C16.237 24.8591 15.9701 24.6048 15.784 24.2942C15.5979 23.9835 15.4997 23.6282 15.4998 23.2661V14.7401C15.499 14.3777 15.5967 14.0219 15.7825 13.7107C15.9682 13.3995 16.2351 13.1446 16.5545 12.9733C16.8739 12.802 17.2338 12.7207 17.5958 12.7381C17.9578 12.7556 18.3083 12.871 18.6098 13.0721Z" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M36.1298 25.8883C37.0344 23.7044 37.5 21.3638 37.5 19C37.5 14.2261 35.6036 9.64773 32.2279 6.27208C28.8523 2.89642 24.2739 1 19.5 1C14.7261 1 10.1477 2.89642 6.77208 6.27208C3.39642 9.64773 1.5 14.2261 1.5 19C1.5 21.3638 1.96558 23.7044 2.87017 25.8883C3.77475 28.0722 5.10062 30.0565 6.77208 31.7279C8.44353 33.3994 10.4278 34.7253 12.6117 35.6298C14.7956 36.5344 17.1362 37 19.5 37C21.8638 37 24.2044 36.5344 26.3883 35.6298C28.5722 34.7253 30.5565 33.3994 32.2279 31.7279C33.8994 30.0565 35.2253 28.0722 36.1298 25.8883Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}