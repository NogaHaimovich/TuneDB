import type { SimplifiedTrack } from "../../types/music";

export interface UseSearchResultsReturn {
    tracks: SimplifiedTrack[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}