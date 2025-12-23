import type { PlaylistWithTracks } from "../../types";

export interface UsePlaylistDetailReturn {
  playlist: PlaylistWithTracks | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}