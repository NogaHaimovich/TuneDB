export interface SearchItem {
  id: number;
  title_short: string;
  artist?: { name?: string };
  album?: { cover_medium?: string };
}

export interface SearchResponse {
  data: SearchItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
    nextPage: number | null;
  };
}

export interface AlbumTrackItem {
  id: number;
  title: string;
  duration?: number;
  preview?: string;
  explicit?: boolean;
}

export interface AlbumResponse {
  id: number;
  title: string;
  cover?: string;
  image?: string;
  releaseDate?: string;
  artist: {
    id: number;
    name: string;
    picture?: string;
    image?: string;
  };
  tracks: AlbumTrackItem[];
}

export interface RecordResponse {
  id: number;
  title: string;
  preview?: string;
  duration?: number;
  release_date?: string;
  artist?: {
    id?: string | number;
    name?: string;
    link?: string;
    picture?: string;
  } | null;
  album?: {
    title?: string;
    link?: string;
    cover?: string;
  } | null;
}

export interface ArtistSongItem {
  id: number;
  title: string;
  duration?: number;
  album?: {
    cover?: string;
    title?: string;
  };
  image?: string;
  artist?: { name?: string };
  artist_name?: string;
  album_cover?: string;
  album_title?: string;
}

export interface ArtistResponse {
  id: number;
  name: string;
  picture?: string;
  image?: string;
  album_number?: number;
  songs: ArtistSongItem[];
}

export interface UseDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}
