import type { SimplifiedArtist } from "../../types/music";

export interface UseArtistDataReturn  {
    artist: SimplifiedArtist  | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}