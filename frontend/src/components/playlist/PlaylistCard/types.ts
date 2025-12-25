import type { PlaylistWithTracks } from "../../../types";

export interface PlaylistCardProps {
  playlist: PlaylistWithTracks;
  onEdit?: (playlistId: string, playlistName: string) => void;
  onDelete?: (playlistId: string, playlistName: string) => void;
  onViewMore?: (playlistId: string) => void;
  showActions?: boolean;
  variant?: 'default' | 'compact';
}