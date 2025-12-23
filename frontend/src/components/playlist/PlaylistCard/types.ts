import type { PlaylistWithTracks } from "../../../types";

export interface PlaylistCardProps {
  playlist: PlaylistWithTracks;
  onEdit?: (playlistName: string) => void;
  onDelete?: (playlistName: string) => void;
  onViewMore?: (playlistName: string) => void;
  showActions?: boolean;
  variant?: 'default' | 'compact';
}