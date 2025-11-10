import { useMemo } from "react";
import useData from "../useData";
import type { UseAlbumDataReturn } from "./types";            
import type { SimplifiedAlbum } from "../../types/music";

const useAlbumData = (albumId?: string): UseAlbumDataReturn => {
  const endpoint = albumId ? `/deezer/album?id=${encodeURIComponent(albumId)}` : "";
  const { data, loading, error, refetch } = useData<any>(endpoint);

  const album: SimplifiedAlbum | null = useMemo(() => {
    if (!data) return null;
    return {
      id: data.id,
      title: data.title,
      cover: data.cover ?? data.image,      
      releaseDate: data.releaseDate,
      artist: {
        id: data.artist?.id,
        name: data.artist?.name,
        picture: data.artist?.picture ?? data.artist?.image,
        image: data.artist?.image,          
      },
      tracks: (data.tracks ?? []).map((t: any) => ({
        id: t.id,                           
        title: t.title,
        duration: t.duration,
        preview: t.preview,
        explicit: t.explicit,
      })),
    };
  }, [data]);

  return { album, loading, error, refetch };
};

export default useAlbumData;