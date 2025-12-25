import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import type { UsePlaylistManagerReturn } from "./types";
import { getErrorMessage } from "../../utils/get_error_message";
import { useFetchAllPlaylistsDataQuery, useRemovePlaylistMutation, useRenamePlaylistMutation } from "../../store";

const usePlaylistManager = (): UsePlaylistManagerReturn => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState<boolean>(false);
  const [editingPlaylist, setEditingPlaylist] = useState<string | null>(null); 
  const [editingPlaylistName, setEditingPlaylistName] = useState<string>("");
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");
  const [popupError, setPopupError] = useState<string>("");

  const navigate = useNavigate();

  const [renamePlaylistMutation] = useRenamePlaylistMutation()
  const [removePlaylistMutation] = useRemovePlaylistMutation()
  const { data, error: rtkError, isLoading, refetch } = useFetchAllPlaylistsDataQuery();
  const playlists = data?.playlists ?? [];

  const error = rtkError ? getErrorMessage(rtkError) : null;

  const handleEdit = useCallback((playlistId: string, playlistName: string) => {
    setEditingPlaylist(playlistId);
    setEditingPlaylistName(playlistName);
    setNewPlaylistName(playlistName);
    setIsEditPopupOpen(true);
    setPopupError("");
  }, []);

  const handleDelete = useCallback(
    async (playlistId: string, playlistName: string) => {
      if (!confirm(`Are you sure you want to delete "${playlistName}"?`)) return;

      try {
        removePlaylistMutation(playlistId);
        toast.success("Playlist removed successfully");
      } catch (err: unknown) {
        const error_message = getErrorMessage(err);
        toast.error(error_message || "Error removing the playlist");
        console.error(`Error removing ${playlistName}:`, error_message);
      }
    },
    [removePlaylistMutation]
  );

  const handleViewMore = useCallback(
    (playlistId: string) => {
      navigate(`/playlist/${playlistId}`);
    },
    [navigate]
  );

  const handleNameChange = useCallback((value: string) => {
    setNewPlaylistName(value);
  }, []);

  const handleCloseEditPopup = useCallback(() => {
    setIsEditPopupOpen(false);
    setEditingPlaylist(null);
    setEditingPlaylistName("");
    setNewPlaylistName("");
    setPopupError("");
  }, []);

  const handleSaveEdit = useCallback(async () => {
    if (!newPlaylistName.trim()) {
      setPopupError("Playlist name cannot be empty");
      return;
    }

    if (!editingPlaylist) return;

    if (editingPlaylistName.trim() === newPlaylistName.trim()) {
      handleCloseEditPopup();
      return;
    }

    try {
      renamePlaylistMutation({playlistId: editingPlaylist, newName: newPlaylistName})
      handleCloseEditPopup();
      toast.success("Playlist renamed successfully");
    } catch (err: unknown) {
      const error_message = getErrorMessage(err);
      setPopupError(error_message || "Error renaming playlist");
      console.error("Rename playlist error:", error_message);
    }
  }, [editingPlaylist, editingPlaylistName, newPlaylistName, renamePlaylistMutation, handleCloseEditPopup]);

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
