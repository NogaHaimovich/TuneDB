import type { PlaylistWithTracks } from "../../Services/playlistService";

export interface UsePlaylistDetailReturn {
  playlist: PlaylistWithTracks | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}