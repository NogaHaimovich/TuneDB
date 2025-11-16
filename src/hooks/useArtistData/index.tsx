import { useMemo } from "react";
import useData from "../useData";
import type { UseArtistDataReturn } from "./types";
import type { SimplifiedArtist } from "../../types/music";
import type { ArtistResponse } from "../../types/api";



const useArtistData = (artistId?: string): UseArtistDataReturn => {
    const endpoint = artistId ? `/deezer/artist?id=${encodeURIComponent(artistId)}` : "";
    const { data, loading, error, refetch } = useData<ArtistResponse>(endpoint);

    const artist: SimplifiedArtist | null = useMemo(() =>{
        if (!data) return null;
        return {
            id: data.id,
            name: data.name,
            picture: data.picture || data.image,
            image: data.image,
            albums_number: data.album_number,
            songs: (data.songs ?? []).map((t) => ({
                id: t.id,                           
                title: t.title,
                image: t.album?.cover || t.album_cover || t.image || "",
                artist: t.artist?.name || t.artist_name,
                duration: t.duration,
                album: t.album?.title || t.album_title,
            })),
        };
    }, [data]);

    return {artist, loading, error, refetch};

}

export default useArtistData;