import type { PlaylistWithTracks } from "../../Services/playlistService";

export interface UsePlaylistManagerReturn {
  playlists: PlaylistWithTracks[];
  loading: boolean;
  error: string | null;
  
  isEditPopupOpen: boolean;
  editingPlaylist: string | null;
  newPlaylistName: string;
  popupError: string;
  
  handleEdit: (playlistName: string) => void;
  handleDelete: (playlistName: string) => void;
  handleViewMore: (playlistName: string) => void;
  handleNameChange: (value: string) => void;
  handleCloseEditPopup: () => void;
  handleSaveEdit: () => void;
  
  refreshPlaylists: () => Promise<void>;
}
