
export type TrackOfTheWeek = {
    id: string;
    title: string;
    album: string;
    num_of_tracks: string;
    track_url: string;
    poster_url: string;
    format: string;
    listened: string;
    liked: boolean;
  }

  
    export async function getTrackOfTheWeek() {
      const res = await fetch('https://interview-ldfz.onrender.com/track-of-the-week');
      const tracks = (await res.json()) as TrackOfTheWeek[];
      return tracks;
    }
    

    export async function  likeTrackOfTheWeek(id: string) {
      const requestOptions = {
        method: 'PUT',
    };
      const res = await fetch(`https://interview-ldfz.onrender.com/like-track-of-the-week/${id}`, requestOptions)
      return res
    }