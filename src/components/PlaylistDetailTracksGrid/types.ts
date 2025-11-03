import type {PlaylistWithTracks } from "../../Services/playlistService";

export interface PlaylistDetailTracksGridProp  {
    playlist: PlaylistWithTracks;
    loading?: boolean;
    error?: string; 
}
