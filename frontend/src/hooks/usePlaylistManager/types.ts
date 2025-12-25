import type { PlaylistWithTracks } from "../../types";

export interface UsePlaylistManagerReturn {
  playlists: PlaylistWithTracks[];
  loading: boolean;
  error: string | null;
  
  isEditPopupOpen: boolean;
  editingPlaylist: string | null;
  newPlaylistName: string;
  popupError: string;
  
  handleEdit: (playlistId: string, playlistName: string) => void;
  handleDelete: (playlistId: string, playlistName: string) => void;
  handleViewMore: (playlistId: string) => void;
  handleNameChange: (value: string) => void;
  handleCloseEditPopup: () => void;
  handleSaveEdit: () => void;
  
  refreshPlaylists: () => Promise<void>;
}
