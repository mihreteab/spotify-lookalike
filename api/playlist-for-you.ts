
export type MusicPlaylist = {
  collection_moto: string;
  format: string;
  id: string;
  liked: boolean;
  listened: string;
  num_of_tracks: string;
  poster_url: string;
  title: string;
  track_url: string;
}


export async function getPlaylistForYou() {
  const res = await fetch('https://interview-ldfz.onrender.com/playlist-for-you');
  const users = (await res.json()) as MusicPlaylist[];
  return users;
}

export async function likePlaylistForYou(id: string) {
  const requestOptions = {
    method: 'PUT',
  };
  const res = await fetch(`https://interview-ldfz.onrender.com/like-playlist-for-you/${id}`, requestOptions)
  console.log(res)
  return res
}