export type MostListned = {
    id: string;
    title: string;
    collection_moto: string;
    album: string;
    num_of_tracks: string;
    track_url: string;
    poster_url: string;
    format: string;
    listened: string;
    liked: boolean;
  }

    
  
    export async function getMostListend() {
      const res = await fetch('https://interview-ldfz.onrender.com/most-listened');
      const mostListendMusics = (await res.json()) as MostListned[];
      return mostListendMusics;
    }



    export async function  likeMostListend(id: string) {
      const requestOptions = {
        method: 'PUT',
    };
      const res = await fetch(`https://interview-ldfz.onrender.com/like-most-listened/${id}`, requestOptions)
      return res
    }
    