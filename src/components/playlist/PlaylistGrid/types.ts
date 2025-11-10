import type { PlaylistWithTracks } from "../../../Services/playlistService";

export interface PlaylistGridProps {
  playlists: PlaylistWithTracks[];
  onEdit?: (playlistName: string) => void;
  onDelete?: (playlistName: string) => void;
  onViewMore?: (playlistName: string) => void;
  emptyMessage?: string;
  showActions?: boolean;
}
