// Music-related interfaces and types

export interface Song {
  track_id: string;
  songName: string;
  image?: string;
}

export interface Artist {
  artist_id: string;
  artistName: string;
  image?: string;
}


// API Response types
export interface TopSongsResponse {
  total: number;
  tracks: Song[];
}

export interface NewSongsResponse {
  total: number;
  tracks: Song[];
}

export interface TopArtistsResponse {
  total: number;
  tracks: Artist[];
}

// Simplified types for different pages
export interface SimplifiedTrack {
  id: number;
  title: string;
  duration?: number;
  preview?: string;
  explicit?: boolean;
  artist?: string;
  albumCover?: string;
}

export interface SimplifiedArtist {
  id: number;
  name: string;
  picture?: string;
  image?: string;
  albums_number?: number;
  songs?: SimplifiedSong[];
}

export interface SimplifiedAlbum {
  id: number;
  title: string;
  cover?: string;
  image?: string;
  releaseDate?: string;
  artist: SimplifiedArtist;
  tracks: SimplifiedTrack[];
}

export interface SimplifiedRecord {
  id: number;
  title: string;
  preview?: string;
  duration?: number;
  releaseDate?: string;
  artistName?: string;
  artistLink?: string;
  artistPicture?: string;
  albumTitle?: string;
  albumLink?: string;
  albumCover?: string;
  artistId?: string;
}

export interface SimplifiedSong {
  id: number;
  title: string;
  image?: string;
  artist?: string;
  duration?: number;
  album?: string;
}
