import type { SimplifiedTrack } from "../../types/music";

export interface UseSearchResultsReturn {
    tracks: SimplifiedTrack[];
    loading: boolean;
    loadingMore: boolean;
    error: string | null;
    hasMore: boolean;
    total: number | null;
    page: number;
    limit: number;
    loadMore: () => void;
    refetch: () => void;
}