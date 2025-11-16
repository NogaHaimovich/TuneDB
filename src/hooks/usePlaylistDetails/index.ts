import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllPlaylistsData, type PlaylistWithTracks } from "../../Services/playlistService";
import type { UsePlaylistDetailReturn } from "./types";
import { getErrorMessage } from "../../utils/get_error_message";


const usePlaylistDetails = (): UsePlaylistDetailReturn => {
    const { name } = useParams<{ name: string }>();
    const [playlist, setPlaylist] = useState<PlaylistWithTracks | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        (async () => {
        try {
            const { playlists } = await getAllPlaylistsData();
            if (isMounted) {
            const foundPlaylist = playlists.find(p => 
                p.name === decodeURIComponent(name || '')
            );
            if (foundPlaylist) {
                setPlaylist(foundPlaylist);
            } else {
                setError("Playlist not found");
            }
            }
        } catch (err: unknown) {
            const error_message = getErrorMessage(err)
            if (isMounted) setError(error_message || "Failed to load playlist");
        } finally {
            if (isMounted) setLoading(false);
        }
        })();
        return () => {
        isMounted = false;
        };
    }, [name]);

    const refresh = async () => {
        setLoading(true);
        setError(null);
        try {
            const { playlists } = await getAllPlaylistsData();
            const foundPlaylist = playlists.find(p => 
                p.name === decodeURIComponent(name || '')
            );
            if (foundPlaylist) {
                setPlaylist(foundPlaylist);
            } else {
                setError("Playlist not found");
            }
        } catch (err: unknown) {
            const error_message = getErrorMessage(err)
            setError(error_message|| "Failed to load playlist");
        } finally {
            setLoading(false);
        }
    };

    return {
        playlist,
        loading,
        error,
        refresh,
    };
}

export default usePlaylistDetails