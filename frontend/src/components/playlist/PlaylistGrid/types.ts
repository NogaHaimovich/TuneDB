import type { PlaylistWithTracks } from "../../../types";

export interface PlaylistGridProps {
  playlists: PlaylistWithTracks[];
  onEdit?: (playlistId: string, playlistName: string) => void;
  onDelete?: (playlistId: string, playlistName: string) => void;
  onViewMore?: (playlistId: string) => void;
  emptyMessage?: string;
  showActions?: boolean;
}
