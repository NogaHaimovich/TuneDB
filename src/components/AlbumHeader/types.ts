import type { SimplifiedAlbum } from "../../types/music";

export interface AlbumHeaderProps {
    album: SimplifiedAlbum | null;
    loading?: boolean;
    error?: string;
}