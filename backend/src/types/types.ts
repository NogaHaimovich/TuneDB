export interface DeezerChartTrack {
    id: number;
    title: string;
    artist?: {
      picture_big?: string;
    };
  }
  
 export interface DeezerChartTracksResponse {
    data: DeezerChartTrack[];
    total?: number;
  }

export interface DeezerSearchItem {
  id: number;
  title?: string;
  name?: string;
  type?: string;
  preview?: string;
}

export interface DeezerSearchResponse {
  data: DeezerSearchItem[];
  total?: number;
  next?: string;
}

export interface DeezerArtistListItem {
  id: number;
  name: string;
  picture_big?: string;
  picture_medium?: string;
}

export interface DeezerArtistResponse {
  data?: DeezerArtistListItem[];
  total?: number;
  id?: number;
  name?: string;
  picture_medium?: string;
  nb_album?: number;
}

export interface DeezerArtistTopTrack {
  id: number;
  title: string;
  duration?: number;
  preview?: string;
  explicit_lyrics?: boolean;
  album?: {
    cover_medium?: string;
  };
}

export interface DeezerArtistTopTracksResponse {
  data: DeezerArtistTopTrack[];
  total?: number;
}

export interface DeezerAlbumTrack {
  id: number;
  title: string;
  duration?: number;
  preview?: string;
  explicit_lyrics?: boolean;
}

export interface DeezerAlbumResponse {
  id: number;
  title: string;
  cover_big?: string;
  release_date?: string;
  artist: {
    id: number;
    name: string;
    picture_medium?: string;
  };
  tracks?: {
    data: DeezerAlbumTrack[];
  };
}

export interface DeezerTrackDetails {
  id: number;
  title_short: string;
  preview?: string;
  duration?: number;
  release_date?: string;
  rank?: number;
  explicit_lyrics?: boolean;
  artist?: {
    id: number;
    name: string;
    link?: string;
    picture_medium?: string;
  };
  album?: {
    title: string;
    link?: string;
    cover_medium?: string;
  };
}

export interface PlaylistTrack {
  trackId: string;
  title?: string;
  artist?: string;
  album?: string;
  image?: string;
}

export interface Playlist {
  name: string;
  tracks: PlaylistTrack[];
}

export interface UserWithPlaylists {
  playlists?: Playlist[];
}