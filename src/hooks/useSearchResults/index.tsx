import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import useData from "../useData";
import type { UseSearchResultsReturn } from "./types";
import type { SimplifiedTrack } from "../../types/music";
import type { SearchResponse, SearchItem } from "../../types/api";

const DEFAULT_LIMIT = 24;

const mapTracks = (rawTracks: SearchItem[]): SimplifiedTrack[] =>
  rawTracks.map((track: SearchItem) => ({
    id: track.id,
    title: track.title_short,
    artist: track.artist?.name ?? "Unknown Artist",
    albumCover: track.album?.cover_medium ?? "",
  }));

const useSearchResults = (
  query?: string,
  options?: { limit?: number }
): UseSearchResultsReturn => {
  const limit = options?.limit ?? DEFAULT_LIMIT;
  const [page, setPage] = useState(1);
  const [lastLoadedPage, setLastLoadedPage] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [tracks, setTracks] = useState<SimplifiedTrack[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState<number | null>(null);
  const prevQueryRef = useRef<string | undefined>(undefined);
  const prevLimitRef = useRef<number>(limit);

  const endpoint = useMemo(() => {
    if (!query) return "";
    const params = new URLSearchParams({
      q: query,
      page: String(page),
      limit: String(limit),
      refresh: String(refreshKey),
    });
    return `/deezer/search?${params.toString()}`;
  }, [query, page, limit, refreshKey]);

  const { data, loading, error } = useData<SearchResponse>(endpoint);

  useEffect(() => {
    const prevQuery = prevQueryRef.current;
    const limitChanged = prevLimitRef.current !== limit;

    if (prevQuery !== query || limitChanged) {
      setPage(1);
      setTracks([]);
      setHasMore(false);
      setTotal(null);
      setLastLoadedPage(0);

      if (prevQuery !== undefined || limitChanged) {
        setRefreshKey((prev) => prev + 1);
      }
    }

    prevQueryRef.current = query;
    prevLimitRef.current = limit;
  }, [query, limit]);

  useEffect(() => {
    if (!data?.data) return;

    const nextTracks = mapTracks(data.data);
    const metaPage: number = data.meta?.page ?? page;
    setTracks((prev) => (metaPage === 1 ? nextTracks : [...prev, ...nextTracks]));
    setLastLoadedPage(metaPage);

    const meta = data.meta ?? {};
    setHasMore(Boolean(meta.hasMore));
    setTotal(typeof meta.total === "number" ? meta.total : null);
  }, [data, page]);

  const loadMore = useCallback(() => {
    if (!hasMore || loading) return;

    const nextPage = lastLoadedPage + 1 || 1;

    if (page === nextPage) {
      setRefreshKey((prev) => prev + 1);
    } else {
      setPage(nextPage);
    }
  }, [hasMore, loading, lastLoadedPage, page]);

  const refetch = useCallback(() => {
    setPage(1);
    setTracks([]);
    setHasMore(false);
    setTotal(null);
    setRefreshKey((prev) => prev + 1);
    setLastLoadedPage(0);
  }, []);

  const initialLoading = loading && lastLoadedPage === 0;
  const loadingMore = loading && page > 1;

  return {
    tracks,
    loading: initialLoading,
    loadingMore,
    error,
    hasMore,
    total,
    page: lastLoadedPage === 0 ? 1 : lastLoadedPage,
    limit,
    loadMore,
    refetch,
  };
};

export default useSearchResults;