import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import type { UsePlaylistManagerReturn } from "./types";
import { getAllPlaylistsData, removePlaylistClicked, renamePlaylist, type PlaylistWithTracks } from "../../Services/playlistService";
import { getErrorMessage } from "../../utils/get_error_message";

const usePlaylistManager = (): UsePlaylistManagerReturn => {
  const [playlists, setPlaylists] = useState<PlaylistWithTracks[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditPopupOpen, setIsEditPopupOpen] = useState<boolean>(false);
  const [editingPlaylist, setEditingPlaylist] = useState<string | null>(null);
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");
  const [popupError, setPopupError] = useState<string>("");

  const navigate = useNavigate();

  const refreshPlaylists = useCallback(async () => {
    try {
      const { playlists } = await getAllPlaylistsData();
      setPlaylists(playlists);
    } catch (err: unknown) {
      const error_message = getErrorMessage(err)
      setError(error_message|| "Failed to load playlists");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const loadPlaylists = async () => {
      setLoading(true);
      setError(null);
      await refreshPlaylists();
    };

    if (isMounted) {
      loadPlaylists();
    }

    return () => {
      isMounted = false;
    };
  }, [refreshPlaylists]);

  const handleEdit = useCallback((playlistName: string) => {
    setEditingPlaylist(playlistName);
    setNewPlaylistName(playlistName);
    setIsEditPopupOpen(true);
    setPopupError("");
  }, []);

  const handleDelete = useCallback(async (playlistName: string) => {
    if (!confirm(`Are you sure you want to delete "${playlistName}"?`)) {
      return;
    }

    try {
      await removePlaylistClicked(playlistName);
      toast.success('Playlist removed successfully');
      await refreshPlaylists();
    } catch (err: unknown) {
      const error_message = getErrorMessage(err)
      toast.error('Error removing the playlist');
      console.error(`Error removing ${playlistName}: `, error_message);
    }
  }, [refreshPlaylists]);

  const handleViewMore = useCallback((playlistName: string) => {
    navigate(`/playlist/${encodeURIComponent(playlistName)}`);
  }, [navigate]);

  const handleNameChange = useCallback((value: string) => {
    setNewPlaylistName(value);
  }, []);

  const handleCloseEditPopup = useCallback(() => {
    setIsEditPopupOpen(false);
    setEditingPlaylist(null);
    setNewPlaylistName("");
    setPopupError("");
  }, []);

  const handleSaveEdit = useCallback(async () => {
    if (!newPlaylistName.trim()) {
      setPopupError("Playlist name cannot be empty");
      return;
    }

    if (!editingPlaylist) return;

    try {
      await renamePlaylist(editingPlaylist, newPlaylistName);
      await refreshPlaylists();
      handleCloseEditPopup();
      toast.success('Playlist renamed successfully');
    } catch (err: unknown) {
      const error_message = getErrorMessage(err)
      setPopupError(error_message || "Error renaming playlist");
      console.error("Rename playlist error:", error);
    }
  }, [editingPlaylist, newPlaylistName, refreshPlaylists, handleCloseEditPopup]);

  return {
    playlists,
    loading,
    error,
    
    isEditPopupOpen,
    editingPlaylist,
    newPlaylistName,
    popupError,
    
    handleEdit,
    handleDelete,
    handleViewMore,
    handleNameChange,
    handleCloseEditPopup,
    handleSaveEdit,
    
    
    refreshPlaylists,
  };
};

export default usePlaylistManager;
