import type { PlaylistWithTracks } from "../../Services/playlistService";

export interface UsePlaylistManagerReturn {
  // Playlist data
  playlists: PlaylistWithTracks[];
  loading: boolean;
  error: string | null;
  
  // Edit popup state
  isEditPopupOpen: boolean;
  editingPlaylist: string | null;
  newPlaylistName: string;
  popupError: string;
  
  // Handlers
  handleEdit: (playlistName: string) => void;
  handleDelete: (playlistName: string) => void;
  handleViewMore: (playlistName: string) => void;
  handleNameChange: (value: string) => void;
  handleCloseEditPopup: () => void;
  handleSaveEdit: () => void;
  
  // Utility
  refreshPlaylists: () => Promise<void>;
}
