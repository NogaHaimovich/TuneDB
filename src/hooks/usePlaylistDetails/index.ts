import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllPlaylistsData, type PlaylistWithTracks } from "../../Services/playlistService";
import type { UsePlaylistDetailReturn } from "./types";


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
        } catch (err: any) {
            if (isMounted) setError(err?.message || "Failed to load playlist");
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
        } catch (err: any) {
            setError(err?.message || "Failed to load playlist");
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