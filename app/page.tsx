import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getPlaylistForYou } from "@/api/playlist-for-you";
import { getMostListend } from "@/api/getMostListend";
import { getTrackOfTheWeek } from "@/api/track-of-the-week";
import SpotifyHomePage from "../componet/spotify-home-page";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["playlist-for-you"],
    queryFn: getPlaylistForYou,
  });

  await queryClient.prefetchQuery({
    queryKey: ["most-listend"],
    queryFn: getMostListend,
  });

  await queryClient.prefetchQuery({
    queryKey: ["track-of-the-week"],
    queryFn: getTrackOfTheWeek,
  });


  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SpotifyHomePage />
      </HydrationBoundary>
    </main>
  );
}
