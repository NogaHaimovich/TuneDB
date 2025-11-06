import { useMemo } from "react";
import useData from "../useData";
import type { UseSearchResultsReturn } from "./types";
import type { SimplifiedTrack } from "../../types/music";

const useSearchResults = (query?: string): UseSearchResultsReturn => {
    const endpoint = query ? `/deezer/search?q=${encodeURIComponent(query)}` : "";
    const { data, loading, error } = useData<any>(endpoint);

    const tracks: SimplifiedTrack[] = useMemo(() => {
        if (!data?.data) return [];
        return data.data.map((track: any) => ({
            id: track.id,
            title: track.title_short,
            artist: track.artist?.name ?? "Unknown Artist",
            albumCover: track.album?.cover_medium ?? "",
        }));
    }, [data]);

    return { tracks, loading, error };
};

export default useSearchResults;