'use client'
import { MostListned, getMostListend } from "@/api/getMostListend";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function MostListendList() {
  // fetch most listend tracks
    const { data } = useQuery({
        queryFn: () => getMostListend(),
        queryKey: ["most-listend"],
      });
    return (
<div className="flex space-between border-2 border-r-0 p-5 gap-5 border-customGray rounded-l-3xl overflow-x-auto md:border-r-2 md:rounded-r-3xl">
              <div className="flex items-center w-4 whitespace-nowrap justify-center md:hidden text-[#859DFF]">
                <p className="transform rotate-[270deg] inline-block text-xl">Lo-Fi Music</p>
              </div>
               
              <div className="flex shrink-0 w-30 h-30 md:w-60 md:h-60">
              
                {data && <Image
                  src={data[0].poster_url}
                  alt='lofi 1'
                  width={114}
                  height={114}
                  className='object-cover object-top w-30 h-30 rounded-xl md:w-60 md:h-60'
                />}
                </div>
                <div className="flex shrink-0 gap-5 overflow-x-auto h-30 md:flex-wrap md:shrink md:h-60 md:w-64">
              
              {data?.map(mostlistend => {
                return (
                
                <Image
                key={mostlistend.id}
                  src={mostlistend.poster_url}
                  alt='lofi 1'
                  width={114}
                  height={114}
                  className='object-cover object-top w-30 h-30 rounded-xl'
                />
              
                )
              })}
              </div>

              <div className="hidden md:flex items-center w-4 whitespace-nowrap justify-center text-[#859DFF]">
                <p className="transform rotate-[270deg] inline-block text-xl">Lo-Fi Music</p>
              </div>
            </div>
    )
}