import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import type { UsePlaylistManagerReturn } from "./types";
import { getErrorMessage } from "../../utils/get_error_message";
import { useFetchAllPlaylistsDataQuery, useRemovePlaylistMutation, useRenamePlaylistMutation } from "../../store";

const usePlaylistManager = (): UsePlaylistManagerReturn => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState<boolean>(false);
  const [editingPlaylist, setEditingPlaylist] = useState<string | null>(null);
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");
  const [popupError, setPopupError] = useState<string>("");

  const navigate = useNavigate();

  const [renamePlaylistMutation] = useRenamePlaylistMutation()
  const [removePlaylistMutation] = useRemovePlaylistMutation()
  const { data, error: rtkError, isLoading, refetch } = useFetchAllPlaylistsDataQuery();
  const playlists = data?.playlists ?? [];

  const error = rtkError ? getErrorMessage(rtkError) : null;

  const handleEdit = useCallback((playlistName: string) => {
    setEditingPlaylist(playlistName);
    setNewPlaylistName(playlistName);
    setIsEditPopupOpen(true);
    setPopupError("");
  }, []);

  const handleDelete = useCallback(
    async (playlistName: string) => {
      if (!confirm(`Are you sure you want to delete "${playlistName}"?`)) return;

      try {
        removePlaylistMutation(playlistName);
        toast.success("Playlist removed successfully");
      } catch (err: unknown) {
        const error_message = getErrorMessage(err);
        toast.error(error_message || "Error removing the playlist");
        console.error(`Error removing ${playlistName}:`, error_message);
      }
    },
    [refetch]
  );

  const handleViewMore = useCallback(
    (playlistName: string) => {
      navigate(`/playlist/${encodeURIComponent(playlistName)}`);
    },
    [navigate]
  );

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

    if (editingPlaylist.trim() === newPlaylistName.trim()) {
      handleCloseEditPopup();
      return;
    }

    try {
      renamePlaylistMutation({oldName:editingPlaylist, newName:newPlaylistName})
      handleCloseEditPopup();
      toast.success("Playlist renamed successfully");
    } catch (err: unknown) {
      const error_message = getErrorMessage(err);
      setPopupError(error_message || "Error renaming playlist");
      console.error("Rename playlist error:", error_message);
    }
  }, [editingPlaylist, newPlaylistName, refetch, handleCloseEditPopup]);

  const refreshPlaylists = useCallback(async () => {
    await refetch();
  }, [refetch]);

  return {
    playlists,
    loading: isLoading,
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
