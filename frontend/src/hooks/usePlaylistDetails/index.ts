import { useMemo } from "react";
import { useParams } from "react-router-dom";
import type { UsePlaylistDetailReturn } from "./types";
import { getErrorMessage } from "../../utils/get_error_message";
import { useFetchAllPlaylistsDataQuery } from "../../store";


const usePlaylistDetails = (): UsePlaylistDetailReturn => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error: queryError, refetch } = useFetchAllPlaylistsDataQuery();

    const playlist = useMemo(() => {
        if (!data?.playlists || !id) return null;
        let found = data.playlists.find(p => p.id === id);
        if (!found && id === "Favorites") {
            found = data.playlists.find(p => p.name === "Favorites");
        }
        return found || null;
    }, [data, id]);

    const error = useMemo(() => {
        if (queryError) {
            return getErrorMessage(queryError) || "Failed to load playlist";
        }
        if (!isLoading && data && !playlist) {
            return "Playlist not found";
        }
        return null;
    }, [queryError, isLoading, data, playlist]);

    const refresh = async () => {
        await refetch();
    };

    return {
        playlist,
        loading: isLoading,
        error,
        refresh,
    };
}

export default usePlaylistDetails