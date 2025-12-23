import { useMemo } from "react";
import type { Song, Artist, TopSongsResponse, TopArtistsResponse, NewSongsResponse } from "../../types/music";
import type { CardProps } from "../../types/components";
import type { UseHomePageDataReturn } from "./types";
import useData from "../useData";

const useHomePageData = (): UseHomePageDataReturn => {
    const { data: topSongsData, loading: topSongsLoading } = useData<TopSongsResponse>("/deezer/topRatedSongs?limit=5");
    const { data: topArtistsData, loading: topArtistsLoading } = useData<TopArtistsResponse>("/deezer/topRatedArtists?limit=5");
    const { data: newSongsData, loading: newSongsLoading } = useData<NewSongsResponse>("/deezer/newSongs?limit=5");

    const topSongsCards: CardProps[] = useMemo(() => {
        return topSongsData?.tracks?.map((song: Song) => ({
            title: song.songName,
            image: song.image,
            id: song.track_id,
            type: "record" as const
        })) || [];
    }, [topSongsData]);

    const topArtistsCards: CardProps[] = useMemo(() => {
        return topArtistsData?.tracks?.map((artist: Artist) => ({
            title: artist.artistName,
            image: artist.image,
            id: artist.artist_id,
            type: "artist" as const
        })) || [];
    }, [topArtistsData]);

    const newSongsCards: CardProps[] = useMemo(() => {
        return newSongsData?.tracks?.map((song: Song) => ({
            title: song.songName,
            image: song.image,
            id: song.track_id,
            type: "album" as const
        })) || [];
    }, [newSongsData]);

    return { topSongsCards, topArtistsCards, newSongsCards, topSongsLoading, topArtistsLoading, newSongsLoading };
};

export default useHomePageData;