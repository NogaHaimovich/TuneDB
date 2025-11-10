import type { SimplifiedAlbum } from "../../types/music";

export interface UseAlbumDataReturn {
  album: SimplifiedAlbum | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}